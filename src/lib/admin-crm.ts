import "server-only";

import { sql } from "@/lib/db";
import type {
  CrmCategory,
  CrmChartPoint,
  CrmLink,
  CrmRecord,
  CrmStage,
  CrmStat,
} from "@/lib/admin-crm-types";
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
  const description = firstPresent(row, [
    "1-Sentence Company Description\n(What do you build & for who?)",
    "Physical AI Product",
    "Tagline",
  ]);
  const notes = firstPresent(row, ["Anything else we should know?", "Outreach Notes"]);
  const status = firstPresent(row, ["Outreach Status"]);

  const links = [
    { label: "Website", url: normalizeUrl(website) },
    { label: "Pitch deck", url: normalizeUrl(pitchDeck) },
    { label: "LinkedIn", url: normalizeUrl(linkedin) },
    { label: "Instagram", url: normalizeUrl(instagram) },
    { label: "Logo", url: normalizeUrl(logo) },
  ].filter((link) => link.url);

  return {
    id,
    name: founder || "Unknown contact",
    company,
    category: "Startup",
    email,
    phone: firstPresent(row, ["Phone Number", "Phone"]),
    website: normalizeUrl(website),
    stage: status === "Contacted" ? "Follow-up" : source.includes("Accepted") ? "Intro ready" : "Review",
    priority: source.includes("Accepted") ? "High" : "Medium",
    owner: "Staff",
    value: stage || firstPresent(row, ["How much have you raised?"]) || "Startup",
    source,
    updated: firstPresent(row, ["Timestamp"]) || "Sheet import",
    nextStep: source.includes("Accepted")
      ? "Prepare event logistics and investor matching"
      : status === "Not Contacted"
        ? "Send founder outreach"
        : "Review for next founder room",
    notes: [description, notes].filter(Boolean).join(" "),
    tags: [industry, stage, firstPresent(row, ["Source"])].filter(Boolean).slice(0, 4),
    links,
  };
}

function intakeKindToCategory(kind: string): CrmCategory {
  if (kind === "vcs") return "Investor";
  if (kind === "sponsors") return "Sponsor";
  if (kind === "speakers") return "Operator";
  return "Startup";
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
  const links = [
    { label: "Website", url: website },
    { label: "Pitch deck", url: normalizeUrl(payload.pitchDeckUrl ?? "") },
    { label: "Additional file", url: normalizeUrl(payload.additionalInfoFileUrl ?? "") },
    { label: "Logo", url: normalizeUrl(payload.logoUrl ?? "") },
  ].filter((link) => link.url);

  return {
    id: 100000 + row.id,
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
    owner: payload.owner || "Staff",
    value:
      payload.value ||
      payload.roundAndTarget ||
      payload.checkSize ||
      payload.sponsorshipBudgetRange ||
      payload.preferredEventType ||
      category,
    source: row.source,
    updated: row.updated_at.toISOString().slice(0, 10),
    nextStep: payload.nextStep || "Review new intake and assign owner",
    notes:
      payload.notes ||
      payload.description ||
      payload.goals ||
      payload.startupsToMeet ||
      payload.whySpeak ||
      payload.anythingElse ||
      "",
    tags: [
      payload.stage,
      payload.industry,
      payload.stageFocus,
      payload.sectorFocus,
      payload.companyType,
      payload.topicExpertise,
    ]
      .filter(Boolean)
      .slice(0, 4),
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

function subscriberRecordToCrm(row: {
  id: number;
  email: string;
  name: string | null;
  subscribed_at: Date | string | null;
}): CrmRecord {
  const updated =
    row.subscribed_at instanceof Date
      ? row.subscribed_at.toISOString().slice(0, 10)
      : row.subscribed_at?.slice(0, 10) || "Subscriber";

  return {
    id: 200000 + row.id,
    name: row.name || row.email,
    company: row.email,
    category: "Subscriber",
    email: row.email,
    phone: "",
    website: "",
    stage: "New",
    priority: "Low",
    owner: "Staff",
    value: "Newsletter subscriber",
    source: "Postgres subscribers",
    updated,
    nextStep: "Segment for founder, investor, sponsor, or community outreach",
    notes: "Imported from the live subscribers table.",
    tags: ["Newsletter"],
    links: [],
  };
}

async function ensureCrmTable(): Promise<void> {
  await sql.query(CRM_TABLE_SQL);
  await sql.query(
    "CREATE INDEX IF NOT EXISTS idx_crm_intake_records_kind_updated ON crm_intake_records (kind, updated_at DESC)",
  );
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

  await sql`
    INSERT INTO crm_intake_records (kind, email, name, company, phone, website, source, payload, updated_at)
    VALUES (${kind}, ${email}, ${name}, ${company}, ${phone}, ${website}, 'Intake form', ${JSON.stringify(
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
  value: string;
  nextStep: string;
  notes: string;
  tags?: string[];
}): Promise<CrmRecord> {
  await ensureCrmTable();
  const kind = categoryToIntakeKind(input.category);
  const payload = {
    priority: input.priority,
    owner: input.owner,
    value: input.value,
    nextStep: input.nextStep,
    notes: input.notes,
    tags: input.tags ?? [],
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

async function getSubscriberRecords(): Promise<CrmRecord[]> {
  try {
    const { rows } = await sql`
      SELECT id, email, name, subscribed_at
      FROM subscribers
      ORDER BY subscribed_at DESC
      LIMIT 500
    `;
    return rows.map((row) =>
      subscriberRecordToCrm(
        row as {
          id: number;
          email: string;
          name: string | null;
          subscribed_at: Date | string | null;
        },
      ),
    );
  } catch {
    return [];
  }
}

async function countTable(table: string): Promise<number> {
  try {
    const result = await sql.query(`SELECT COUNT(*)::int AS count FROM ${table}`);
    return Number(result.rows[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

export async function getAdminCrmData(): Promise<{
  stats: CrmStat[];
  chart: CrmChartPoint[];
  records: CrmRecord[];
}> {
  const [
    subscriberCount,
    newsletterSends,
    nextEventCount,
    eventsCount,
    successStoriesCount,
    newsletterDrafts,
    crmIntakeRecords,
    subscriberRecords,
    sheetGroups,
  ] = await Promise.all([
    countTable("subscribers"),
    countTable("newsletter_sends"),
    countTable("next_event"),
    countTable("events"),
    countTable("success_stories"),
    countTable("newsletter_drafts"),
    getCrmIntakeRecords(),
    getSubscriberRecords(),
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
  for (const record of [...crmIntakeRecords, ...sheetRecords, ...subscriberRecords]) {
    const key = `${record.email || record.company}`.toLowerCase();
    if (!key || deduped.has(key)) continue;
    deduped.set(key, record);
  }

  const records = Array.from(deduped.values());
  const startups = records.filter((record) => record.category === "Startup").length;
  const investors = records.filter((record) => record.category === "Investor").length;
  const sponsors = records.filter((record) => record.category === "Sponsor").length;

  return {
    records,
    stats: [
      {
        label: "Subscribers",
        value: subscriberCount.toLocaleString(),
        delta: `${newsletterSends} sends`,
        trend: "up",
        title: "Real newsletter audience from Postgres.",
        note: `${newsletterDrafts} drafts, ${newsletterSends} sent newsletters. Latest ${subscriberRecords.length} in CRM.`,
      },
      {
        label: "Startup records",
        value: startups.toLocaleString(),
        delta: `${sheetRecords.length} sheet rows`,
        trend: "up",
        title: "Imported from shared startup spreadsheets.",
        note: "Includes outreach, form responses, and accepted pitch cohorts.",
      },
      {
        label: "Events",
        value: eventsCount.toLocaleString(),
        delta: `${nextEventCount} next`,
        trend: "up",
        title: "Editable event records in Postgres.",
        note: "Includes the live next-event card and past event library.",
      },
      {
        label: "Success stories",
        value: successStoriesCount.toLocaleString(),
        delta: `${investors + sponsors} CRM`,
        trend: "up",
        title: "Postgres stories plus CRM relationships.",
        note: "Investor and sponsor records appear as forms are persisted.",
      },
    ],
    chart: [
      { month: "Subscribers", startups: subscriberCount, investors: 0, sponsors: 0 },
      { month: "Startups", startups, investors: 0, sponsors: 0 },
      { month: "Events", startups: eventsCount, investors: nextEventCount, sponsors: 0 },
      {
        month: "Stories",
        startups: successStoriesCount,
        investors: newsletterSends,
        sponsors: newsletterDrafts,
      },
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
