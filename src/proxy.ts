import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "sjp_session";

/**
 * Logged-in users live inside their dashboard. The public front page (/)
 * is for visitors only — a signed-in user hitting / goes to /dashboard,
 * which routes by role (student -> /dashboard/home, employer -> /employer/home,
 * instructor -> /instructor/home, admin -> view-aware). They see the front
 * page again only after logging out (the logout API destroys the session).
 */
export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/" && req.cookies.get(COOKIE_NAME)?.value) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
