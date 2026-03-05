import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  createSessionCookie,
  ADMIN_USERS,
  type AdminId,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const adminId = (body?.adminId ?? "").trim() as AdminId;
    const password = typeof body?.password === "string" ? body.password : "";

    const validIds = ADMIN_USERS.map((u) => u.id);
    if (!validIds.includes(adminId) || !password) {
      return NextResponse.redirect(
        new URL("/admin/signin?error=invalid", req.url)
      );
    }

    if (!verifyPassword(adminId, password)) {
      return NextResponse.redirect(
        new URL("/admin/signin?error=invalid", req.url)
      );
    }

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
      new URL("/admin/signin?error=invalid", req.url)
    );
  }
}
