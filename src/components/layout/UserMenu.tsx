"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "../ui/primitives";

export function UserMenu({ name, role, isAdmin, view }: { name: string; role: string; isAdmin: boolean; view?: "admin" | "employer" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Account menu"
        className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      >
        <span className="relative block">
          <Avatar name={name} />
          {isAdmin && (
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-white" title="Administrator">
              <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /></svg>
            </span>
          )}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
              {isAdmin ? (
                <span className="inline-flex items-center gap-1 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Admin{view ? ` · ${view} view` : ""}
                </span>
              ) : role === "INSTRUCTOR" ? (
                <span className="inline-flex items-center gap-1 rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700">
                  Course seller{view ? ` · ${view} view` : ""}
                </span>
              ) : (
                <span className="capitalize">{role.toLowerCase()}</span>
              )}
            </p>
          </div>
          <nav className="p-1.5" aria-label="Account">
            {isAdmin && view === "admin" ? (
              <>
                <MenuLink href="/admin/home" label="Admin console" onClick={() => setOpen(false)} />
                <MenuLink href="/employer/home" label="Switch to employer workspace" onClick={() => setOpen(false)} />
              </>
            ) : isAdmin ? (
              <>
                <MenuLink href="/employer/home" label="Employer dashboard" onClick={() => setOpen(false)} />
                <MenuLink href="/admin/home" label="Switch to admin console" onClick={() => setOpen(false)} />
              </>
            ) : (
              <MenuLink href="/dashboard" label="Dashboard" onClick={() => setOpen(false)} />
            )}
            <MenuLink href="/profile" label="Profile" onClick={() => setOpen(false)} />
            <MenuLink href="/notifications" label="Notifications" onClick={() => setOpen(false)} />
            <form action="/api/auth/logout" method="post">
              <button type="submit" className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">
                Log out
              </button>
            </form>
          </nav>
        </div>
      )}
    </div>
  );
}

function MenuLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100">
      {label}
    </Link>
  );
}
