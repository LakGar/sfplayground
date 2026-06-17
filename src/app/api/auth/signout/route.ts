import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, getSession } from "@/lib/admin-auth";
import { recordAuditEvent } from "@/lib/admin-audit";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (session) {
    await recordAuditEvent({
      adminId: session.id,
      adminName: session.name,
      action: "logout",
      targetType: "auth",
    });
  }
  const res = NextResponse.redirect(new URL("/admin/signin", req.url), 302);
  res.headers.set("Set-Cookie", clearSessionCookie());
  return res;
}
