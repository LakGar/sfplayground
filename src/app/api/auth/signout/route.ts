import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/signin", req.url), 302);
  res.headers.set("Set-Cookie", clearSessionCookie());
  return res;
}
