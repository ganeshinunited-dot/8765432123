"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "../ui/primitives";

export function UserMenu({ name, role }: { name: string; role: string }) {
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
        <Avatar name={name} />
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
            <p className="text-xs capitalize text-slate-500">{role.toLowerCase()}</p>
          </div>
          <nav className="p-1.5" aria-label="Account">
            <MenuLink href="/dashboard" label="Dashboard" onClick={() => setOpen(false)} />
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
