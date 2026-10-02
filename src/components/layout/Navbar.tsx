"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NavAuth } from "./NavAuth";
import { Logo } from "./Logo";

const links = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/for-employers", label: "For Employers" },
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
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setSession({ loggedIn: !!d.user, isAdmin: !!d.user?.isAdmin }))
      .catch(() => setSession({ loggedIn: false, isAdmin: false }));
  }, []);

  // Logged-in non-admins (students, employers, instructors) live in their
  // dashboard app — the public top bar is hidden for them everywhere.
  // Admins keep the top bar (it carries the Admin/Employer view switcher).
  if (session && session.loggedIn && !session.isAdmin) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
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
