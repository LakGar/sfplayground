import { getSession } from "@/lib/admin-auth";
import { recordAuditEvent } from "@/lib/admin-audit";
import {
  deleteNewsletterDraft,
  getNewsletterDraftById,
  updateNewsletterDraft,
} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const draftId = Number(id);
  if (!Number.isInteger(draftId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  try {
    const body = await request.json();
    const { subject, body_html } = body;
    const existing = await getNewsletterDraftById(draftId);
    if (!existing) {
      return NextResponse.json(
        { error: "Draft not found" },
        { status: 404 }
      );
    }
    const updated = await updateNewsletterDraft(draftId, {
      subject: subject ?? existing.subject,
      body_html: body_html ?? existing.body_html,
    });
    await recordAuditEvent({
      adminId: session.id,
      adminName: session.name,
      action: "newsletter_draft_updated",
      targetType: "newsletter_draft",
      targetId: draftId,
      details: { subject: subject ?? existing.subject },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Newsletter draft update error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update draft" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const draftId = Number(id);
  if (!Number.isInteger(draftId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const deleted = await deleteNewsletterDraft(draftId);
  if (!deleted) {
    return NextResponse.json(
      { error: "Draft not found" },
      { status: 404 }
    );
  }
  await recordAuditEvent({
    adminId: session.id,
    adminName: session.name,
    action: "newsletter_draft_deleted",
    targetType: "newsletter_draft",
    targetId: draftId,
  });
  return new NextResponse(null, { status: 204 });
}
