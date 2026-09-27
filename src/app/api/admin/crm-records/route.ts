import { NextResponse } from "next/server";

import { recordAuditEvent } from "@/lib/admin-audit";
import {
  canEditCrmRecord,
  filterCrmRecordsForSession,
  isFounderAdmin,
  normalizeCrmOwner,
} from "@/lib/admin-access";
import { getSession } from "@/lib/admin-auth";
import { getAdminCrmData, insertAdminCrmRecord, updateAdminCrmRecord } from "@/lib/admin-crm";
import type {
  CrmCategory,
  CrmFlag,
  CrmPriority,
  CrmReviewStatus,
  CrmStage,
  CrmTier,
} from "@/lib/admin-crm-types";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

const categories = new Set<CrmCategory>(["Startup", "Investor", "Sponsor", "Operator"]);
const stages = new Set<CrmStage>(["New", "Review", "Qualified", "Intro ready", "Follow-up", "Closed"]);
const priorities = new Set<CrmPriority>(["High", "Medium", "Low"]);
const tiers = new Set<CrmTier>(["Tier 1", "Tier 2", "Tier 3", ""]);
const reviewStatuses = new Set<CrmReviewStatus>(["None", "Needs admin review"]);
const flags = new Set<CrmFlag>([
  "Do not contact",
  "Waiting to be contacted",
  "Meeting",
  "Coming to event",
  "",
]);

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function cleanList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(clean).filter(Boolean).slice(0, 8);
  }

  return clean(value)
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function cleanDate(value: unknown): string {
  const cleaned = clean(value);
  if (!cleaned) return "";
  return /^\d{4}-\d{2}-\d{2}$/.test(cleaned) ? cleaned : "";
}

function hasOwn(value: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function clampPageSize(value: string | null): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return 50;
  return Math.min(100, Math.max(10, parsed));
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.passwordChangeRequired) {
    return NextResponse.json({ error: "Password change required" }, { status: 403 });
  }

  const limiter = checkRateLimit(`crm:list:${session.id}:${getClientIp(request)}`, {
    limit: 120,
    windowMs: 10 * 60 * 1000,
  });
  if (!limiter.ok) {
    return rateLimitResponse(limiter.retryAfterSec);
  }

  const url = new URL(request.url);
  const pageSize = clampPageSize(url.searchParams.get("pageSize"));
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const category = clean(url.searchParams.get("category"));
  const source = clean(url.searchParams.get("source"));
  const crm = await getAdminCrmData();
  const records = filterCrmRecordsForSession(crm.records, session).filter((record) => {
    if (categories.has(category as CrmCategory) && record.category !== category) return false;
    if (source && record.source !== source) return false;
    return true;
  });
  const total = records.length;
  const start = (page - 1) * pageSize;

  return NextResponse.json({
    records: records.slice(start, start + pageSize),
    page,
    pageSize,
    total,
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.passwordChangeRequired) {
    return NextResponse.json({ error: "Password change required" }, { status: 403 });
  }
  const limiter = checkRateLimit(`crm:create:${session.id}:${getClientIp(request)}`, {
    limit: 30,
    windowMs: 10 * 60 * 1000,
  });
  if (!limiter.ok) {
    return rateLimitResponse(limiter.retryAfterSec);
  }

  try {
    const body = await request.json();
    const category = categories.has(body.category) ? (body.category as CrmCategory) : "Startup";
    const stage = stages.has(body.stage) ? (body.stage as CrmStage) : "New";
    const priority = priorities.has(body.priority) ? (body.priority as CrmPriority) : "Medium";
    const tier = tiers.has(body.tier) ? (body.tier as CrmTier) : "";
    const flag = flags.has(body.flag) ? (body.flag as CrmFlag) : "";
    const reviewStatus = reviewStatuses.has(body.reviewStatus)
      ? (body.reviewStatus as CrmReviewStatus)
      : "None";
    const company = clean(body.company);
    const email = clean(body.email);
    const nextSteps = cleanList(body.nextSteps);
    const nextStep = clean(body.nextStep) || nextSteps[0] || "Follow up from SFPlayground";

    if (!company) {
      return NextResponse.json({ error: "Company is required" }, { status: 400 });
    }

    const tags = clean(body.tags)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 6);

    const owner = isFounderAdmin(session)
      ? normalizeCrmOwner(clean(body.owner), session.name)
      : session.name;

    const record = await insertAdminCrmRecord({
      category,
      name: clean(body.name) || "Unknown contact",
      company,
      email,
      phone: clean(body.phone),
      website: clean(body.website),
      stage,
      priority,
      tier,
      flag,
      owner,
      createdBy: session.name,
      lastEditedBy: session.name,
      reviewStatus,
      lastContactedAt: cleanDate(body.lastContactedAt),
      nextFollowUpAt: cleanDate(body.nextFollowUpAt),
      industry: clean(body.industry),
      value: clean(body.value) || category,
      nextStep,
      nextSteps: nextSteps.length > 0 ? nextSteps : [nextStep],
      priorityNotes: clean(body.priorityNotes),
      notes: clean(body.notes),
      tags,
    });

    await recordAuditEvent({
      adminId: session.id,
      adminName: session.name,
      action: "crm_record_created",
      targetType: "crm_record",
      targetId: record.id,
      details: {
        company: record.company,
        category: record.category,
        email: record.email,
        owner: record.owner,
        createdBy: record.createdBy,
        reviewStatus: record.reviewStatus,
        source: record.source,
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error("CRM record create error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create CRM record" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.passwordChangeRequired) {
    return NextResponse.json({ error: "Password change required" }, { status: 403 });
  }
  const limiter = checkRateLimit(`crm:update:${session.id}:${getClientIp(request)}`, {
    limit: 60,
    windowMs: 10 * 60 * 1000,
  });
  if (!limiter.ok) {
    return rateLimitResponse(limiter.retryAfterSec);
  }

  try {
    const body = await request.json();
    if (Array.isArray(body.recordKeys)) {
      if (!isFounderAdmin(session)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const updates: Partial<{
        owner: string;
        stage: CrmStage;
        priority: CrmPriority;
        tier: CrmTier;
        flag: CrmFlag;
        reviewStatus: CrmReviewStatus;
        lastContactedAt: string;
        nextFollowUpAt: string;
      }> = {};

      if (hasOwn(body, "owner")) {
        const owner = normalizeCrmOwner(clean(body.owner), "");
        if (!owner) {
          return NextResponse.json({ error: "Choose a valid owner" }, { status: 400 });
        }
        updates.owner = owner;
      }
      if (hasOwn(body, "stage")) {
        if (!stages.has(body.stage)) {
          return NextResponse.json({ error: "Choose a valid status" }, { status: 400 });
        }
        updates.stage = body.stage as CrmStage;
      }
      if (hasOwn(body, "priority")) {
        if (!priorities.has(body.priority)) {
          return NextResponse.json({ error: "Choose a valid priority" }, { status: 400 });
        }
        updates.priority = body.priority as CrmPriority;
      }
      if (hasOwn(body, "tier")) {
        if (!tiers.has(body.tier)) {
          return NextResponse.json({ error: "Choose a valid tier" }, { status: 400 });
        }
        updates.tier = body.tier as CrmTier;
      }
      if (hasOwn(body, "flag")) {
        if (!flags.has(body.flag)) {
          return NextResponse.json({ error: "Choose a valid flag" }, { status: 400 });
        }
        updates.flag = body.flag as CrmFlag;
      }
      if (hasOwn(body, "reviewStatus")) {
        if (!reviewStatuses.has(body.reviewStatus)) {
          return NextResponse.json({ error: "Choose a valid review status" }, { status: 400 });
        }
        updates.reviewStatus = body.reviewStatus as CrmReviewStatus;
      }
      if (hasOwn(body, "lastContactedAt")) {
        const date = cleanDate(body.lastContactedAt);
        if (clean(body.lastContactedAt) && !date) {
          return NextResponse.json({ error: "Use a valid last contacted date" }, { status: 400 });
        }
        updates.lastContactedAt = date;
      }
      if (hasOwn(body, "nextFollowUpAt")) {
        const date = cleanDate(body.nextFollowUpAt);
        if (clean(body.nextFollowUpAt) && !date) {
          return NextResponse.json({ error: "Use a valid next follow-up date" }, { status: 400 });
        }
        updates.nextFollowUpAt = date;
      }

      const fields = Object.keys(updates);
      if (fields.length === 0) {
        return NextResponse.json({ error: "Choose a field to update" }, { status: 400 });
      }
      const crm = await getAdminCrmData();
      const requestedKeys = new Set(
        body.recordKeys.map(clean).filter(Boolean).slice(0, 100),
      );
      const records = crm.records.filter((record) => requestedKeys.has(record.recordKey));

      await Promise.all(
        records.map((record) =>
          updateAdminCrmRecord({
            recordKey: record.recordKey,
            name: record.name,
            company: record.company,
            email: record.email,
            phone: record.phone,
            website: record.website,
            stage: updates.stage ?? record.stage,
            priority: updates.priority ?? record.priority,
            tier: updates.tier ?? record.tier,
            flag: updates.flag ?? record.flag,
            owner: updates.owner ?? record.owner,
            createdBy: record.createdBy,
            lastEditedBy: session.name,
            reviewStatus: updates.reviewStatus ?? record.reviewStatus,
            lastContactedAt: updates.lastContactedAt ?? record.lastContactedAt,
            nextFollowUpAt: updates.nextFollowUpAt ?? record.nextFollowUpAt,
            industry: record.industry,
            value: record.value,
            nextStep: record.nextStep,
            nextSteps: record.nextSteps,
            priorityNotes: record.priorityNotes,
            notes: record.notes,
            tags: record.tags,
          }),
        ),
      );

      await recordAuditEvent({
        adminId: session.id,
        adminName: session.name,
        action: "crm_records_bulk_updated",
        targetType: "crm_record",
        details: { fields, count: records.length },
      });

      return NextResponse.json({ ok: true, fields, updated: records.length });
    }

    const recordKey = clean(body.recordKey);
    const stage = stages.has(body.stage) ? (body.stage as CrmStage) : "New";
    const priority = priorities.has(body.priority) ? (body.priority as CrmPriority) : "Medium";
    const tier = tiers.has(body.tier) ? (body.tier as CrmTier) : "";
    const flag = flags.has(body.flag) ? (body.flag as CrmFlag) : "";
    const company = clean(body.company);
    const email = clean(body.email);
    const nextSteps = cleanList(body.nextSteps);
    const nextStep = clean(body.nextStep) || nextSteps[0] || "Follow up from SFPlayground";

    if (!recordKey) {
      return NextResponse.json({ error: "Record key is required" }, { status: 400 });
    }
    if (!company) {
      return NextResponse.json({ error: "Company is required" }, { status: 400 });
    }

    const existingRecord = (await getAdminCrmData()).records.find(
      (record) => record.recordKey === recordKey,
    );
    if (!existingRecord) {
      return NextResponse.json({ error: "Record was not found" }, { status: 404 });
    }
    if (!canEditCrmRecord(session, existingRecord)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const reviewStatus = reviewStatuses.has(body.reviewStatus)
      ? (body.reviewStatus as CrmReviewStatus)
      : existingRecord.reviewStatus;

    const tags = clean(body.tags)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 6);
    const owner = isFounderAdmin(session)
      ? normalizeCrmOwner(clean(body.owner), existingRecord.owner)
      : session.name;

    await updateAdminCrmRecord({
      recordKey,
      name: clean(body.name) || "Unknown contact",
      company,
      email,
      phone: clean(body.phone),
      website: clean(body.website),
      stage,
      priority,
      tier,
      flag,
      owner,
      createdBy: existingRecord.createdBy,
      lastEditedBy: session.name,
      reviewStatus,
      lastContactedAt: cleanDate(body.lastContactedAt) || existingRecord.lastContactedAt,
      nextFollowUpAt: cleanDate(body.nextFollowUpAt) || existingRecord.nextFollowUpAt,
      industry: clean(body.industry),
      value: clean(body.value) || "Relationship",
      nextStep,
      nextSteps: nextSteps.length > 0 ? nextSteps : [nextStep],
      priorityNotes: clean(body.priorityNotes),
      notes: clean(body.notes),
      tags,
    });

    await recordAuditEvent({
      adminId: session.id,
      adminName: session.name,
      action: "crm_record_updated",
      targetType: "crm_record",
      targetId: recordKey,
      details: {
        company,
        email,
        owner,
        reviewStatus,
        recordKey,
      },
    });

    return NextResponse.json({
      recordKey,
      name: clean(body.name) || "Unknown contact",
      company,
      email,
      phone: clean(body.phone),
      website: clean(body.website),
      stage,
      priority,
      tier,
      flag,
      owner,
      createdBy: existingRecord.createdBy,
      lastEditedBy: session.name,
      reviewStatus,
      lastContactedAt: cleanDate(body.lastContactedAt) || existingRecord.lastContactedAt,
      nextFollowUpAt: cleanDate(body.nextFollowUpAt) || existingRecord.nextFollowUpAt,
      industry: clean(body.industry),
      value: clean(body.value) || "Relationship",
      nextStep,
      nextSteps: nextSteps.length > 0 ? nextSteps : [nextStep],
      priorityNotes: clean(body.priorityNotes),
      notes: clean(body.notes),
      tags,
    });
  } catch (error) {
    console.error("CRM record update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update CRM record" },
      { status: 500 },
    );
  }
}
