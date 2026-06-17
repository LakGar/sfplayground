import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  createSessionCookie,
  ADMIN_USERS,
  type AdminId,
} from "@/lib/admin-auth";
import { recordAuditEvent } from "@/lib/admin-audit";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    const body =
      contentType.includes("application/json")
        ? await req.json()
        : Object.fromEntries((await req.formData()).entries());
    const adminId = (body?.adminId ?? "").trim() as AdminId;
    const password = typeof body?.password === "string" ? body.password : "";

    const validIds = ADMIN_USERS.map((u) => u.id);
    if (!validIds.includes(adminId) || !password) {
      return NextResponse.redirect(
        new URL("/admin/signin?error=invalid", req.url),
        303
      );
    }

    if (!verifyPassword(adminId, password)) {
      await recordAuditEvent({
        adminId: adminId || "system",
        adminName: ADMIN_USERS.find((u) => u.id === adminId)?.name ?? "Unknown admin",
        action: "login_failed",
        targetType: "auth",
        details: { adminId },
      });
      return NextResponse.redirect(
        new URL("/admin/signin?error=invalid", req.url),
        303
      );
    }

    const admin = ADMIN_USERS.find((u) => u.id === adminId);
    await recordAuditEvent({
      adminId,
      adminName: admin?.name ?? adminId,
      action: "login_success",
      targetType: "auth",
    });

    const cookie = createSessionCookie(adminId);
    // 303 See Other: browser must follow with GET (avoids POST /admin → 405)
    const res = NextResponse.redirect(
      new URL("/admin", req.url),
      303
    );
    res.headers.set("Set-Cookie", cookie);
    return res;
  } catch {
    return NextResponse.redirect(
      new URL("/admin/signin?error=invalid", req.url),
      303
    );
  }
}
