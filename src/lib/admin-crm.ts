import "server-only";

import { sql } from "@/lib/db";
import type {
  CrmCategory,
  CrmChartPoint,
  CrmFlag,
  CrmLink,
  CrmRecord,
  CrmStage,
  CrmStat,
  CrmTier,
} from "@/lib/admin-crm-types";
import { classifyIndustryText } from "@/lib/industry-taxonomy";
import type { IntakeKind } from "@/lib/intake-types";

const SHEETS = [
  {
    id: "1UBzji17RVwtSL5HVdSRxCK-Xqh2L1DvQ",
    tabs: ["Startup Outreach List"],
  },
  {
    id: "1azbqwhFvk0K9M345dlEk8JIfdN6xm0czYrIrLh48bJ0",
    tabs: ["Form Responses 1", "Accepted PP2", "Accepted Lightning Pitch Immigr"],
  },
];

const CRM_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS crm_intake_records (
    id SERIAL PRIMARY KEY,
    kind VARCHAR(32) NOT NULL,
    email VARCHAR(320) NOT NULL,
    name TEXT,
    company TEXT,
    phone TEXT,
    website TEXT,
    source TEXT NOT NULL DEFAULT 'Intake form',
    stage TEXT NOT NULL DEFAULT 'New',
    payload JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

const CRM_OVERRIDES_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS crm_record_overrides (
    record_key TEXT PRIMARY KEY,
    payload JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes(".") && !trimmed.includes(" ")) return `https://${trimmed}`;
  return "";
}

function firstPresent(row: Record<string, string>, keys: string[]): string {
  for (const key of keys) {
    const value = row[key]?.trim();
    if (value) return value;
  }
  return "";
}

function inferTier(row: Record<string, string>): CrmTier {
  const value = firstPresent(row, ["Tier", "VC Tier", "Startup Tier", "Priority Tier"]).toLowerCase();
  if (/\b3\b|tier\s*3|highest|top/.test(value)) return "Tier 3";
  if (/\b2\b|tier\s*2/.test(value)) return "Tier 2";
  if (/\b1\b|tier\s*1/.test(value)) return "Tier 1";
  return "";
}

function inferFlag(row: Record<string, string>, notes: string): CrmFlag {
  const value = [
    firstPresent(row, ["Flag", "Status Flag", "Outreach Flag", "Color", "Highlight"]),
    firstPresent(row, ["Outreach Status", "Status", "Next Step"]),
    notes,
  ]
    .join(" ")
    .toLowerCase();
  if (/red|do not reach|don'?t reach|do not contact|no outreach|blacklist/.test(value)) {
    return "Do not contact";
  }
  if (/green|coming|attending|confirmed|rsvp|event ready|accepted/.test(value)) return "Coming to event";
  if (/yellow|meeting|call scheduled|scheduled|intro call|intro booked/.test(value)) return "Meeting";
  if (/white|waiting|not contacted|not yet contacted|to contact|new/.test(value)) {
    return "Waiting to be contacted";
  }
  return "";
}

function uniqueTags(values: unknown[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => (typeof value === "string" ? value.trim() : ""))
        .filter(Boolean),
    ),
  ).slice(0, 6);
}

function recordKeyFor(record: Pick<CrmRecord, "category" | "email" | "company" | "source" | "id">): string {
  const identity = (record.email || record.company || `${record.source}:${record.id}`)
    .trim()
    .toLowerCase();
  return `${record.category}:${identity}`;
}

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);
  return rows.filter((cells) => cells.some((value) => value.trim()));
}

async function fetchSheetRows(id: string, tab: string): Promise<Record<string, string>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    tab,
  )}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) return [];

  const rows = parseCsv(await response.text());
  const headers = rows[0]?.map((header) => header.trim()) ?? [];
  return rows.slice(1).map((cells) => {
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = cells[index]?.trim() ?? "";
    });
    return record;
  });
}

function rowToStartupRecord(row: Record<string, string>, source: string, id: number): CrmRecord | null {
  const company = firstPresent(row, ["Startup Name", "Company"]);
  if (!company) return null;

  const founder = firstPresent(row, ["Founder(s) Name", "Contact / Rep"]);
  const email = firstPresent(row, ["Email", "Email Address"]);
  const website = firstPresent(row, ["Company Linkedin &/or Website", "Website"]);
  const pitchDeck = firstPresent(row, ["Pitch Deck (Link)", "Or Upload Pitch Deck"]);
  const linkedin = firstPresent(row, ["LinkedIn"]);
  const instagram = firstPresent(row, ["Instagram"]);
  const logo = firstPresent(row, ["Upload Logo"]);
  const stage = firstPresent(row, ["Funding Stage", "Development Stage?"]);
  const industry = firstPresent(row, ["Industry"]);
  const sector = firstPresent(row, ["Sector", "Sector Focus", "Stage Focus"]);
  const description = firstPresent(row, [
    "1-Sentence Company Description\n(What do you build & for who?)",
    "Physical AI Product",
    "Tagline",
  ]);
  const notes = firstPresent(row, ["Anything else we should know?", "Outreach Notes"]);
  const canonical = classifyIndustryText([
    industry,
    sector,
    stage,
    description,
    notes,
    company,
  ]);
  const tier = inferTier(row);
  const flag = inferFlag(row, notes) || "Waiting to be contacted";
  const status = firstPresent(row, ["Outreach Status"]);
  const nextStep = source.includes("Accepted")
    ? "Prepare event logistics and investor matching"
    : status === "Not Contacted"
      ? "Send founder outreach"
      : "Review for next founder room";

  const links = [
    { label: "Website", url: normalizeUrl(website) },
    { label: "Pitch deck", url: normalizeUrl(pitchDeck) },
    { label: "LinkedIn", url: normalizeUrl(linkedin) },
    { label: "Instagram", url: normalizeUrl(instagram) },
    { label: "Logo", url: normalizeUrl(logo) },
  ].filter((link) => link.url);

  return {
    id,
    recordKey: "",
    name: founder || "Unknown contact",
    company,
    category: "Startup",
    email,
    phone: firstPresent(row, ["Phone Number", "Phone"]),
    website: normalizeUrl(website),
    stage: status === "Contacted" ? "Follow-up" : source.includes("Accepted") ? "Intro ready" : "Review",
    priority: flag === "Coming to event" || tier === "Tier 3" || source.includes("Accepted") ? "High" : "Medium",
    tier,
    flag,
    owner: "Staff",
    industry: industry || canonical[0] || sector,
    value: stage || firstPresent(row, ["How much have you raised?"]) || "Startup",
    source,
    updated: firstPresent(row, ["Timestamp"]) || "Sheet import",
    nextStep,
    nextSteps: [nextStep],
    priorityNotes: source.includes("Accepted")
      ? "Accepted founder record; prioritize event logistics and investor matching."
      : status
        ? `Outreach status: ${status}.`
        : "",
    notes: [description, notes].filter(Boolean).join(" "),
    tags: uniqueTags([industry, sector, ...canonical, stage, tier, flag, firstPresent(row, ["Source"])]),
    links,
  };
}

function intakeKindToCategory(kind: string): CrmCategory {
  if (kind === "vcs") return "Investor";
  if (kind === "sponsors") return "Sponsor";
  if (kind === "speakers") return "Operator";
  return "Startup";
}

function intakeKindToSource(kind: IntakeKind): string {
  if (kind === "popup-market") return "Pop-up market intake";
  return "Intake form";
}

function categoryToIntakeKind(category: CrmCategory): IntakeKind {
  if (category === "Investor") return "vcs";
  if (category === "Sponsor") return "sponsors";
  if (category === "Operator") return "speakers";
  return "startups";
}

function intakeRecordToCrm(row: {
  id: number;
  kind: string;
  email: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  website: string | null;
  source: string;
  stage: string;
  payload: Record<string, string>;
  updated_at: Date;
}): CrmRecord {
  const category = intakeKindToCategory(row.kind);
  const payload = row.payload ?? {};
  const website = normalizeUrl(row.website ?? "");
  const nextSteps = Array.isArray(payload.nextSteps)
    ? payload.nextSteps.filter((step): step is string => typeof step === "string" && step.trim().length > 0)
    : payload.nextStep
      ? [payload.nextStep]
      : ["Review new intake and assign owner"];
  const links = [
    { label: "Website", url: website },
    { label: "Pitch deck", url: normalizeUrl(payload.pitchDeckUrl ?? "") },
    { label: "Additional file", url: normalizeUrl(payload.additionalInfoFileUrl ?? "") },
    { label: "Logo", url: normalizeUrl(payload.logoUrl ?? "") },
    { label: "Product link", url: normalizeUrl(payload.productLink ?? "") },
  ].filter((link) => link.url);
  const canonical = classifyIndustryText([
    payload.industry,
    payload.stageFocus,
    payload.sectorFocus,
    payload.companyType,
    payload.topicExpertise,
    payload.eventInterest,
    payload.productCategory,
    payload.productName,
    payload.productDescription,
    payload.description,
    payload.goals,
    payload.startupsToMeet,
    payload.whySpeak,
    payload.anythingElse,
    row.company,
  ]);

  return {
    id: 100000 + row.id,
    recordKey: "",
    name: row.name ?? "Unknown contact",
    company: row.company ?? row.email,
    category,
    email: row.email,
    phone: row.phone ?? "",
    website,
    stage: normalizeStage(row.stage),
    priority: payload.priority === "Low" || payload.priority === "Medium" || payload.priority === "High"
      ? payload.priority
      : "High",
    tier: normalizeTier(payload.tier),
    flag:
      normalizeFlag(payload.flag) ||
      (category === "Startup" || category === "Investor" ? "Waiting to be contacted" : ""),
    owner: payload.owner || "Staff",
    industry:
      payload.industry ||
      canonical[0] ||
      payload.sectorFocus ||
      payload.stageFocus ||
      payload.companyType ||
      payload.eventInterest ||
      payload.productCategory ||
      payload.topicExpertise ||
      "",
    value:
      payload.value ||
      payload.roundAndTarget ||
      payload.checkSize ||
      payload.sponsorshipBudgetRange ||
      payload.preferredEventType ||
      (row.kind === "popup-market" ? "Booth: $500/day" : "") ||
      category,
    source: row.source,
    updated: row.updated_at.toISOString().slice(0, 10),
    nextStep: payload.nextStep || nextSteps[0] || "Review new intake and assign owner",
    nextSteps,
    priorityNotes: payload.priorityNotes || "",
    notes:
      payload.notes ||
      payload.description ||
      payload.goals ||
      payload.startupsToMeet ||
      payload.productDescription ||
      payload.whySpeak ||
      payload.anythingElse ||
      "",
    tags: uniqueTags([
      payload.stage,
      payload.industry,
      payload.stageFocus,
      payload.sectorFocus,
      payload.companyType,
      payload.eventInterest,
      payload.productCategory,
      payload.boothFeeAcknowledged ? "$500 booth" : "",
      payload.topicExpertise,
      ...canonical,
      payload.tier,
      payload.flag,
    ]),
    links,
  };
}

const stagesSet = new Set<CrmStage>([
  "New",
  "Review",
  "Qualified",
  "Intro ready",
  "Follow-up",
  "Closed",
]);

function normalizeStage(stage: string): CrmStage {
  return stagesSet.has(stage as CrmStage) ? (stage as CrmStage) : "New";
}

function normalizeTier(tier: unknown): CrmTier {
  if (tier === "Tier 1" || tier === "Tier 2" || tier === "Tier 3") return tier;
  return "";
}

function normalizeFlag(flag: unknown): CrmFlag {
  if (
    flag === "Do not contact" ||
    flag === "Waiting to be contacted" ||
    flag === "Meeting" ||
    flag === "Coming to event"
  ) {
    return flag;
  }
  if (flag === "Do not reach out") return "Do not contact";
  if (flag === "Standout") return "Coming to event";
  return "";
}

async function ensureCrmTable(): Promise<void> {
  await sql.query(CRM_TABLE_SQL);
  await sql.query(CRM_OVERRIDES_TABLE_SQL);
  await sql.query(
    "CREATE INDEX IF NOT EXISTS idx_crm_intake_records_kind_updated ON crm_intake_records (kind, updated_at DESC)",
  );
}

function applyRecordOverride(record: CrmRecord, payload: Record<string, unknown> | undefined): CrmRecord {
  const recordKey = record.recordKey || recordKeyFor(record);
  if (!payload) return { ...record, recordKey };

  const tags = Array.isArray(payload.tags)
    ? payload.tags.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0)
    : record.tags;
  const nextSteps = Array.isArray(payload.nextSteps)
    ? payload.nextSteps.filter((step): step is string => typeof step === "string" && step.trim().length > 0)
    : record.nextSteps;

  return {
    ...record,
    recordKey,
    name: typeof payload.name === "string" ? payload.name : record.name,
    company: typeof payload.company === "string" ? payload.company : record.company,
    email: typeof payload.email === "string" ? payload.email : record.email,
    phone: typeof payload.phone === "string" ? payload.phone : record.phone,
    website: typeof payload.website === "string" ? normalizeUrl(payload.website) : record.website,
    stage: normalizeStage(typeof payload.stage === "string" ? payload.stage : record.stage),
    priority:
      payload.priority === "High" || payload.priority === "Medium" || payload.priority === "Low"
        ? payload.priority
        : record.priority,
    tier: normalizeTier(payload.tier),
    flag: normalizeFlag(payload.flag),
    owner: typeof payload.owner === "string" ? payload.owner : record.owner,
    industry: typeof payload.industry === "string" ? payload.industry : record.industry,
    value: typeof payload.value === "string" ? payload.value : record.value,
    nextStep: typeof payload.nextStep === "string" ? payload.nextStep : record.nextStep,
    nextSteps,
    priorityNotes:
      typeof payload.priorityNotes === "string" ? payload.priorityNotes : record.priorityNotes,
    notes: typeof payload.notes === "string" ? payload.notes : record.notes,
    tags,
    updated: "Admin edit",
  };
}

export async function updateAdminCrmRecord(input: {
  recordKey: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  website?: string;
  stage: CrmStage;
  priority: "High" | "Medium" | "Low";
  owner: string;
  tier?: CrmTier;
  flag?: CrmFlag;
  industry?: string;
  value: string;
  nextStep: string;
  nextSteps?: string[];
  priorityNotes: string;
  notes: string;
  tags?: string[];
}): Promise<void> {
  await ensureCrmTable();
  const recordKey = input.recordKey.trim();
  if (!recordKey) throw new Error("Record key is required");

  const payload = {
    name: input.name,
    company: input.company,
    email: input.email,
    phone: input.phone ?? "",
    website: input.website ?? "",
    stage: input.stage,
    priority: input.priority,
    owner: input.owner,
    tier: input.tier ?? "",
    flag: input.flag ?? "",
    industry: input.industry ?? "",
    value: input.value,
    nextStep: input.nextStep,
    nextSteps: input.nextSteps ?? [input.nextStep].filter(Boolean),
    priorityNotes: input.priorityNotes,
    notes: input.notes,
    tags: uniqueTags(input.tags ?? []),
  };

  await sql`
    INSERT INTO crm_record_overrides (record_key, payload, updated_at)
    VALUES (${recordKey}, ${JSON.stringify(payload)}::jsonb, NOW())
    ON CONFLICT (record_key) DO UPDATE
    SET payload = EXCLUDED.payload,
        updated_at = NOW()
  `;
}

export async function insertCrmIntakeRecord(
  kind: IntakeKind,
  data: Record<string, string>,
): Promise<void> {
  await ensureCrmTable();
  const email = data.email;
  const company =
    data.startupName || data.firmName || data.companyName || data.company || "";
  const name =
    data.founderName || data.investorName || data.contactName || data.fullName || "";
  const website = data.website || data.webOrLinkedin || "";
  const phone = data.phone || "";

  const source = intakeKindToSource(kind);

  await sql`
    INSERT INTO crm_intake_records (kind, email, name, company, phone, website, source, payload, updated_at)
    VALUES (${kind}, ${email}, ${name}, ${company}, ${phone}, ${website}, ${source}, ${JSON.stringify(
      data,
    )}::jsonb, NOW())
  `;
}

export async function insertAdminCrmRecord(input: {
  category: CrmCategory;
  name: string;
  company: string;
  email: string;
  phone?: string;
  website?: string;
  stage: CrmStage;
  priority: "High" | "Medium" | "Low";
  owner: string;
  tier?: CrmTier;
  flag?: CrmFlag;
  industry?: string;
  value: string;
  nextStep: string;
  nextSteps?: string[];
  priorityNotes: string;
  notes: string;
  tags?: string[];
}): Promise<CrmRecord> {
  await ensureCrmTable();
  const kind = categoryToIntakeKind(input.category);
  const canonical = classifyIndustryText([
    input.industry,
    input.value,
    input.priorityNotes,
    input.notes,
    input.company,
    ...(input.tags ?? []),
  ]);
  const payload = {
    priority: input.priority,
    owner: input.owner,
    tier: input.tier ?? "",
    flag: input.flag ?? "",
    industry: input.industry || canonical[0] || "",
    value: input.value,
    nextStep: input.nextStep,
    nextSteps: input.nextSteps ?? [input.nextStep].filter(Boolean),
    priorityNotes: input.priorityNotes,
    notes: input.notes,
    tags: uniqueTags([...(input.tags ?? []), ...canonical]),
  };

  const { rows } = await sql`
    INSERT INTO crm_intake_records (
      kind, email, name, company, phone, website, source, stage, payload, updated_at
    )
    VALUES (
      ${kind},
      ${input.email},
      ${input.name},
      ${input.company},
      ${input.phone ?? ""},
      ${input.website ?? ""},
      'Manual admin entry',
      ${input.stage},
      ${JSON.stringify(payload)}::jsonb,
      NOW()
    )
    RETURNING id, kind, email, name, company, phone, website, source, stage, payload, updated_at
  `;

  return intakeRecordToCrm(rows[0] as Parameters<typeof intakeRecordToCrm>[0]);
}

async function getCrmIntakeRecords(): Promise<CrmRecord[]> {
  await ensureCrmTable();
  const { rows } = await sql`
    SELECT id, kind, email, name, company, phone, website, source, stage, payload, updated_at
    FROM crm_intake_records
    ORDER BY updated_at DESC
    LIMIT 500
  `;
  return rows.map((row) =>
    intakeRecordToCrm(row as Parameters<typeof intakeRecordToCrm>[0]),
  );
}

export async function getAdminCrmData(): Promise<{
  stats: CrmStat[];
  chart: CrmChartPoint[];
  records: CrmRecord[];
}> {
  const [
    crmIntakeRecords,
    sheetGroups,
  ] = await Promise.all([
    getCrmIntakeRecords(),
    Promise.all(
      SHEETS.flatMap((sheet) =>
        sheet.tabs.map(async (tab) => ({
          tab,
          rows: await fetchSheetRows(sheet.id, tab),
        })),
      ),
    ),
  ]);

  let id = 1;
  const sheetRecords = sheetGroups
    .flatMap((group) =>
      group.rows.map((row) => rowToStartupRecord(row, group.tab, id++)),
    )
    .filter((record): record is CrmRecord => Boolean(record));

  const deduped = new Map<string, CrmRecord>();
  for (const record of [...crmIntakeRecords, ...sheetRecords]) {
    const key = `${record.email || record.company}`.toLowerCase();
    if (!key || deduped.has(key)) continue;
    deduped.set(key, record);
  }

  const records = Array.from(deduped.values());
  const keys = records.map((record) => record.recordKey || recordKeyFor(record));
  records.forEach((record, index) => {
    record.recordKey = keys[index] ?? recordKeyFor(record);
  });
  const { rows: overrideRows } = keys.length
    ? await sql.query(
        "SELECT record_key, payload FROM crm_record_overrides WHERE record_key = ANY($1::text[])",
        [keys],
      )
    : { rows: [] };
  const overrides = new Map(
    overrideRows.map((row) => [
      String(row.record_key),
      row.payload as Record<string, unknown>,
    ]),
  );
  const overriddenRecords = records.map((record) =>
    applyRecordOverride(record, overrides.get(record.recordKey)),
  );
  const startups = overriddenRecords.filter((record) => record.category === "Startup").length;
  const investors = overriddenRecords.filter((record) => record.category === "Investor").length;
  const sponsors = overriddenRecords.filter((record) => record.category === "Sponsor").length;
  const operators = overriddenRecords.filter((record) => record.category === "Operator").length;

  return {
    records: overriddenRecords,
    stats: [
      {
        label: "Startup records",
        value: startups.toLocaleString(),
        delta: `${sheetRecords.length} sheet rows`,
        trend: "up",
        title: "Imported from shared startup spreadsheets.",
        note: "Includes outreach, form responses, and accepted pitch cohorts.",
        href: "/admin/startups",
      },
      {
        label: "Investors / VCs",
        value: investors.toLocaleString(),
        delta: "relationship records",
        trend: "up",
        title: "Real investor relationships from intake and admin records.",
        note: "Only investor and VC contacts are included here.",
        href: "/admin/investors",
      },
      {
        label: "Sponsors",
        value: sponsors.toLocaleString(),
        delta: "relationship records",
        trend: "up",
        title: "Real sponsor relationships from intake and admin records.",
        note: "Newsletter-only subscribers are excluded from this board.",
        href: "/admin/sponsors",
      },
      {
        label: "Expert / operators",
        value: operators.toLocaleString(),
        delta: "relationship records",
        trend: "up",
        title: "Real operator and expert relationships.",
        note: "Speaker and operator intakes appear here after review.",
        href: "/admin/relationships?category=Operator",
      },
    ],
    chart: [
      { month: "Startups", startups, investors: 0, sponsors: 0 },
      { month: "Investors", startups: 0, investors, sponsors: 0 },
      { month: "Sponsors", startups: 0, investors: 0, sponsors },
      { month: "Operators", startups: operators, investors: 0, sponsors: 0 },
    ],
  };
}

export function getSourceSheetLinks(): CrmLink[] {
  return [
    {
      label: "Startup outreach workbook",
      url: "https://docs.google.com/spreadsheets/d/1UBzji17RVwtSL5HVdSRxCK-Xqh2L1DvQ/edit",
    },
    {
      label: "Startup form responses workbook",
      url: "https://docs.google.com/spreadsheets/d/1azbqwhFvk0K9M345dlEk8JIfdN6xm0czYrIrLh48bJ0/edit",
    },
  ];
}
