import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "admin_session";

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isSignin = req.nextUrl.pathname === "/admin/signin";
  if (!isAdminRoute || isSignin) return NextResponse.next();

  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/signin", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!signin).*)"],
};
