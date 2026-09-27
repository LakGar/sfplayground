import { NextRequest, NextResponse } from "next/server";

import { recordAuditEvent } from "@/lib/admin-audit";
import { isFounderAdmin } from "@/lib/admin-access";
import { ADMIN_USERS, getSession, type AdminId } from "@/lib/admin-auth";
import { clearStoredAdminPassword } from "@/lib/admin-passwords";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isFounderAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limiter = checkRateLimit(`reset-password:${session.id}:${getClientIp(req)}`, {
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });
  if (!limiter.ok) {
    return rateLimitResponse(limiter.retryAfterSec);
  }

  const body = await req.json().catch(() => ({}));
  const adminId = String(body.adminId ?? "").trim() as AdminId;
  const target = ADMIN_USERS.find((user) => user.id === adminId);
  if (!target || target.role !== "employee") {
    return NextResponse.json({ error: "Employee account is required" }, { status: 400 });
  }

  await clearStoredAdminPassword(target.id);
  await recordAuditEvent({
    adminId: session.id,
    adminName: session.name,
    action: "employee_password_reset",
    targetType: "auth",
    targetId: target.id,
    details: { employee: target.name },
  });

  return NextResponse.json({
    ok: true,
    message: `${target.name} can sign in with the base password and choose a new password.`,
  });
}
