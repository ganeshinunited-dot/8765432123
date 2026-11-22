"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    label: "Jobs",
    href: "/",
    active: (p: string) => p === "/",
    icon: (active: boolean) => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    label: "News",
    href: "/articles",
    active: (p: string) => p === "/articles",
    icon: (active: boolean) => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h13" />
        <path d="M9 7h6M9 11h6" />
      </svg>
    ),
  },
  {
    label: "Fact Check",
    href: "/fact-check",
    active: (p: string) => p.startsWith("/fact-check"),
    icon: (active: boolean) => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    label: "Pop Music",
    href: "/popmusic",
    active: (p: string) => p.startsWith("/popmusic"),
    icon: (active: boolean) => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    label: "Tech",
    href: "/tech-ai",
    active: (p: string) => p.startsWith("/tech-ai"),
    icon: (active: boolean) => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  },
];

/** Bottom tab bar — mobile only, mirrors the reference app layout. */
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-5">
        {TABS.map((t) => {
          const active = t.active(pathname);
          return (
            <Link
              key={t.label}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold transition ${
                active ? "text-emerald-700" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {t.icon(active)}
              {t.label}
              {active && <span className="mt-0.5 h-0.5 w-8 rounded-full bg-emerald-600" aria-hidden="true" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
