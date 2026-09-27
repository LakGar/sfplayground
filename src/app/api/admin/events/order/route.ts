import { getSession } from "@/lib/admin-auth";
import { isFounderAdmin } from "@/lib/admin-access";
import { recordAuditEvent } from "@/lib/admin-audit";
import { updatePreviousEventOrder } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isFounderAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { ids?: unknown };
    if (!Array.isArray(body.ids)) {
      return NextResponse.json({ error: "ids array is required" }, { status: 400 });
    }

    const ids = body.ids.map(Number).filter(Number.isInteger);
    if (ids.length !== body.ids.length) {
      return NextResponse.json({ error: "Every id must be a number" }, { status: 400 });
    }

    const events = await updatePreviousEventOrder(ids);
    await recordAuditEvent({
      adminId: session.id,
      adminName: session.name,
      action: "previous_events_reordered",
      targetType: "event",
      targetId: "previous-events",
      details: { ids },
    });

    return NextResponse.json(events);
  } catch (err) {
    console.error("Event order update error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update event order" },
      { status: 500 },
    );
  }
}
