"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    label: "Home",
    href: "/",
    active: (p: string) => p === "/",
    icon: (active: boolean) => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    label: "Search",
    href: "/articles",
    active: (p: string) => p.startsWith("/articles"),
    icon: (active: boolean) => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    label: "News",
    href: "/articles",
    active: (p: string) => p.startsWith("/articles"),
    icon: (active: boolean) => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h13" />
        <path d="M9 7h6M9 11h6" />
      </svg>
    ),
  },
  {
    label: "Explore",
    href: "/sarkari-jobs",
    active: (p: string) => p.startsWith("/sarkari-jobs"),
    icon: (active: boolean) => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
      <div className="grid grid-cols-4">
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
