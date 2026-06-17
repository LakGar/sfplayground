import { NextResponse } from "next/server";

import { recordAuditEvent } from "@/lib/admin-audit";
import { getSession } from "@/lib/admin-auth";
import { insertAdminCrmRecord } from "@/lib/admin-crm";
import type { CrmCategory, CrmPriority, CrmStage } from "@/lib/admin-crm-types";

const categories = new Set<CrmCategory>(["Startup", "Investor", "Sponsor", "Operator", "Subscriber"]);
const stages = new Set<CrmStage>(["New", "Review", "Qualified", "Intro ready", "Follow-up", "Closed"]);
const priorities = new Set<CrmPriority>(["High", "Medium", "Low"]);

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const category = categories.has(body.category) && body.category !== "Subscriber"
      ? (body.category as CrmCategory)
      : "Startup";
    const stage = stages.has(body.stage) ? (body.stage as CrmStage) : "New";
    const priority = priorities.has(body.priority) ? (body.priority as CrmPriority) : "Medium";
    const company = clean(body.company);
    const email = clean(body.email);

    if (!company) {
      return NextResponse.json({ error: "Company is required" }, { status: 400 });
    }

    const tags = clean(body.tags)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 6);

    const record = await insertAdminCrmRecord({
      category,
      name: clean(body.name) || "Unknown contact",
      company,
      email,
      phone: clean(body.phone),
      website: clean(body.website),
      stage,
      priority,
      owner: clean(body.owner) || session.name,
      value: clean(body.value) || category,
      nextStep: clean(body.nextStep) || "Follow up from SFPlayground",
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
