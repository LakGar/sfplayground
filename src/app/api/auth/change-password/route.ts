import { NextRequest, NextResponse } from "next/server";

import { recordAuditEvent } from "@/lib/admin-audit";
import { getSession, verifyPassword } from "@/lib/admin-auth";
import { setStoredAdminPassword } from "@/lib/admin-passwords";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/signin", req.url), 303);
  }

  const limiter = checkRateLimit(`change-password:${session.id}:${getClientIp(req)}`, {
    limit: 6,
    windowMs: 10 * 60 * 1000,
  });
  if (!limiter.ok) {
    return rateLimitResponse(limiter.retryAfterSec);
  }

  const body = Object.fromEntries((await req.formData()).entries());
  const currentPassword =
    typeof body.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
  const confirmPassword =
    typeof body.confirmPassword === "string" ? body.confirmPassword : "";

  const valid =
    newPassword.trim().length >= 10 &&
    newPassword === confirmPassword &&
    (session.passwordChangeRequired || (await verifyPassword(session.id, currentPassword)));

  if (!valid) {
    return NextResponse.redirect(
      new URL("/admin/change-password?error=invalid", req.url),
      303,
    );
  }

  await setStoredAdminPassword(session.id, newPassword);
  await recordAuditEvent({
    adminId: session.id,
    adminName: session.name,
    action: "password_changed",
    targetType: "auth",
  });

  return NextResponse.redirect(new URL("/admin", req.url), 303);
}
