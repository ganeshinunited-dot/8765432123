"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SessionUser } from "@/lib/auth";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";
import { ViewSwitcher } from "./ViewSwitcher";

/**
 * Auth-aware part of the navbar, resolved in the browser via /api/auth/me
 * so the surrounding page HTML can be cached at the edge (ISR).
 */
export function NavAuth() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [unread, setUnread] = useState(0);
  const [view, setView] = useState<"admin" | "employer">("employer");
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        setUser(d.user ?? null);
        setUnread(d.unread ?? 0);
        setView(d.view === "admin" ? "admin" : "employer");
        setCompanyName(d.companyName ?? null);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const isAdmin = !!user?.isAdmin;

  return (
    <>
      {loaded && user ? (
        <>
          {user?.role === "INSTRUCTOR" && (
            <span className="hidden items-center gap-1.5 rounded-lg bg-violet-700 px-3 py-2 text-xs font-bold text-white sm:inline-flex" title="You are signed in as a course seller">
              SELLER
            </span>
          )}
          {isAdmin && view === "admin" && (
            <span className="hidden items-center gap-1.5 rounded-lg gx-btn gx-btn-dark px-3 py-2 text-xs font-bold text-white sm:inline-flex" title="You are browsing as an administrator">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /></svg>
              ADMIN
            </span>
          )}
          {isAdmin && <ViewSwitcher view={view} companyName={companyName} />}
          <Link
            href="/notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 01-3.4 0" />
            </svg>
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white">
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </Link>
          <Link
            href="/dashboard"
            className="hidden rounded-lg gx-btn gx-btn-primary px-4 py-2.5 text-sm font-semibold text-white sm:block"
          >
            Dashboard
          </Link>
          <UserMenu name={user.name} role={user.role} isAdmin={isAdmin} view={isAdmin ? view : undefined} />
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:block"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg gx-btn gx-btn-primary px-4 py-2.5 text-sm font-semibold text-white"
          >
            Sign up
          </Link>
        </>
      )}
      <MobileMenu user={loaded ? user : null} />
    </>
  );
}
