"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavAuth } from "./NavAuth";
import { Logo } from "./Logo";
import { readChromeCookie, writeChromeCookie, syncChromeAttr } from "@/lib/chrome-cookie";

const links = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/for-employers", label: "I Want Talent" },
  { href: "/resources", label: "Resources" },
];

const DASHBOARD_PREFIXES = ["/dashboard", "/employer", "/instructor", "/admin", "/profile", "/notifications"];

/** App areas that render their own dashboard chrome (no public top bar). Kept for compatibility. */
export function isDashboardPath(pathname: string): boolean {
  return DASHBOARD_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

interface SessionState {
  loggedIn: boolean;
  isAdmin: boolean;
}

export function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    // Instant: the readable chrome-hint cookie (set at login) already tells us
    // the truth — this covers client-side navigations right after login/logout
    // with no reload and no waiting for the fetch below.
    syncChromeAttr();
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        const s = { loggedIn: !!d.user, isAdmin: !!d.user?.isAdmin };
        setSession(s);
        // Reconcile the hint cookie with the server truth (heals sessions
        // created before this change, expiry drift, etc.).
        const want = s.loggedIn ? (s.isAdmin ? "admin" : "app") : "";
        if (readChromeCookie() !== want) {
          writeChromeCookie(want);
          syncChromeAttr();
        }
      })
      .catch(() => setSession({ loggedIn: false, isAdmin: false }));
    // Re-run on every navigation: the layout persists across client-side
    // route changes, so without this the bar would stay stale after login.
  }, [pathname]);

  // Logged-in non-admins (students, employers, instructors) live in their
  // dashboard app — the public top bar is hidden for them everywhere.
  // Admins keep the top bar (it carries the Admin/Employer view switcher).
  // (Also hidden instantly via CSS from the pre-paint script; this removes it
  // from the DOM once the session is confirmed.)
  if (session && session.loggedIn && !session.isAdmin) return null;

  return (
    <header className="gx-public-chrome sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Growentix home">
          <Logo />
        </Link>
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <NavAuth />
        </div>
      </div>
    </header>
  );
}
