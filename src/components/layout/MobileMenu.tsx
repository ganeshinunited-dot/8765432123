"use client";

import Link from "next/link";
import { useState } from "react";
import type { SessionUser } from "@/lib/auth";

const links = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/for-employers", label: "For Employers" },
  { href: "/resources", label: "Resources" },
];

export function MobileMenu({ user }: { user: SessionUser | null }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <div className="absolute inset-x-0 top-16 border-b border-slate-200 bg-white px-4 pb-6 pt-2 shadow-lg">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100">
                {l.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-slate-200 pt-3">
              {user ? (
                <>
                  {user.role === "INSTRUCTOR" && (
                    <div className="mb-2 flex items-center justify-center gap-1.5 rounded-lg bg-violet-700 px-4 py-2 text-xs font-bold text-white">
                      COURSE SELLER ACCOUNT
                    </div>
                  )}
                  {user.isAdmin && (
                    <div className="mb-2 flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /></svg>
                      ADMIN ACCOUNT
                    </div>
                  )}
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="block rounded-lg bg-emerald-700 px-4 py-3 text-center text-base font-semibold text-white">
                    Dashboard
                  </Link>
                  {user.isAdmin && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Link href="/admin/home" onClick={() => setOpen(false)} className="block rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white">
                        Admin console
                      </Link>
                      <Link href="/employer/home" onClick={() => setOpen(false)} className="block rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700">
                        Employer view
                      </Link>
                    </div>
                  )}
                  <form action="/api/auth/logout" method="post" className="mt-2">
                    <button type="submit" className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base font-semibold text-slate-700">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="block rounded-lg bg-emerald-700 px-4 py-3 text-center text-base font-semibold text-white">
                  Log in
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
