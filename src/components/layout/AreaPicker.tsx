"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ARTICLE_CATEGORIES } from "@/lib/articles";

const AREAS = [
  { label: "All Areas", href: "/" },
  ...ARTICLE_CATEGORIES.filter((c) => c.slug !== "global" && c.slug !== "career").map((c) => ({
    label: c.label,
    href: `/articles?category=${c.slug}`,
  })),
];

/** Globe "All Areas" dropdown in the public header — jump to any region. */
export function AreaPicker() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-bold text-slate-900 transition hover:text-emerald-800 sm:gap-2 sm:px-3"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="hidden sm:inline">All Areas</span>
        <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 z-50 mt-1 max-h-96 w-52 overflow-y-auto rounded-2xl border border-slate-200 bg-white py-1 shadow-xl">
          {AREAS.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              role="menuitem"
              className="block px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
            >
              {a.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
