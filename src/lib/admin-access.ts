import { ADMIN_PROFILES } from "@/data/admin-profiles";
import type { AdminSession } from "@/lib/admin-auth";
import type { CrmChartPoint, CrmRecord, CrmStat } from "@/lib/admin-crm-types";

export const UNASSIGNED_CRM_OWNER = "Unassigned";
export const CRM_OWNER_NAMES = [
  UNASSIGNED_CRM_OWNER,
  ...ADMIN_PROFILES.map((profile) => profile.name),
];

export function isFounderAdmin(session: AdminSession): boolean {
  return session.role === "admin";
}

export function normalizeCrmOwner(value: string, fallback: string): string {
  const match = CRM_OWNER_NAMES.find(
    (owner) => owner.toLowerCase() === value.trim().toLowerCase(),
  );
  return match ?? fallback;
}

export function filterCrmRecordsForSession(
  records: CrmRecord[],
  session: AdminSession,
): CrmRecord[] {
  if (isFounderAdmin(session)) return records;
  return records.filter((record) => record.owner === session.name);
}

export function canEditCrmRecord(session: AdminSession, record: CrmRecord): boolean {
  return isFounderAdmin(session) || record.owner === session.name;
}

export function buildCrmStats(records: CrmRecord[], options?: { employeeName?: string }): {
  stats: CrmStat[];
  chart: CrmChartPoint[];
} {
  const startups = records.filter((record) => record.category === "Startup").length;
  const investors = records.filter((record) => record.category === "Investor").length;
  const sponsors = records.filter((record) => record.category === "Sponsor").length;
  const operators = records.filter((record) => record.category === "Operator").length;

  if (!options?.employeeName) {
    return {
      stats: [
        {
          label: "Startup records",
          value: startups.toLocaleString(),
          delta: "relationship records",
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

  const today = new Date().toISOString().slice(0, 10);
  const created = records.filter((record) => record.createdBy === options.employeeName).length;
  const highPriority = records.filter((record) => record.priority === "High").length;
  const dueFollowUps = records.filter(
    (record) => record.nextFollowUpAt && record.nextFollowUpAt <= today,
  ).length;

  const monthly = new Map<string, { startups: number; investors: number; sponsors: number }>();
  for (const record of records) {
    const month = /^\d{4}-\d{2}-\d{2}$/.test(record.updated)
      ? record.updated.slice(0, 7)
      : "Current";
    const bucket = monthly.get(month) ?? { startups: 0, investors: 0, sponsors: 0 };
    if (record.category === "Startup" || record.category === "Operator") bucket.startups += 1;
    if (record.category === "Investor") bucket.investors += 1;
    if (record.category === "Sponsor") bucket.sponsors += 1;
    monthly.set(month, bucket);
  }

  return {
    stats: [
      {
        label: "Owned relationships",
        value: records.length.toLocaleString(),
        delta: `${created.toLocaleString()} created`,
        trend: "up",
        title: `${options.employeeName}'s active CRM book.`,
        note: "Only records currently assigned to this employee are counted.",
      },
      {
        label: "High priority",
        value: highPriority.toLocaleString(),
        delta: "priority records",
        trend: "up",
        title: "Contacts marked high priority.",
        note: "Priority can be updated by the employee.",
      },
      {
        label: "Due follow-ups",
        value: dueFollowUps.toLocaleString(),
        delta: "needs action",
        trend: dueFollowUps > 0 ? "up" : "down",
        title: "Follow-ups due today or earlier.",
        note: "Uses the next follow-up date on owned records.",
      },
      {
        label: "Mix",
        value: `${startups}/${investors}/${sponsors}`,
        delta: "S/I/P",
        trend: "up",
        title: "Startup, investor, sponsor split.",
        note: `${operators.toLocaleString()} operator records included with startups in the growth chart.`,
      },
    ],
    chart:
      monthly.size > 0
        ? Array.from(monthly.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, values]) => ({ month, ...values }))
        : [{ month: "Current", startups: 0, investors: 0, sponsors: 0 }],
  };
}
