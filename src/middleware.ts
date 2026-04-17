import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, parseSession } from "@/lib/auth";

// Routes only admins can visit
const ADMIN_PREFIXES = ["/admin"];

// Routes that require any authenticated user
const PROTECTED_PREFIXES = ["/profile", "/my-bookings", "/my-orders"];

// Routes accessible only when NOT logged in
const AUTH_ONLY_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const rawCookie = request.cookies.get(SESSION_COOKIE)?.value ?? "";
  const session = rawCookie
    ? parseSession(`${SESSION_COOKIE}=${rawCookie}`)
    : null;

  const { pathname } = request.nextUrl;

  // ── 1. If already logged in, redirect away from /login & /register ──
  if (AUTH_ONLY_ROUTES.includes(pathname) && session) {
    const dest = session.role === "admin" ? "/admin/dashboard" : "/home";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // ── 2. Admin-only routes ──
  if (ADMIN_PREFIXES.some((p) => pathname.startsWith(p))) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (session.role !== "admin") {
      // Customer trying to access admin → send to customer home
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  // ── 3. Protected customer-only routes ──
  if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     *  - _next/static, _next/image, favicon.ico, public files
     *  - api routes
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
