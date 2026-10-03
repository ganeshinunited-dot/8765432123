import Link from "next/link";
import { ReactNode } from "react";
import { icons, type NavItem } from "@/components/dashboard/Shell";

/**
 * Admin console shell — deliberately distinct from the employer/student
 * DashboardShell so it is always obvious which "hat" you are wearing.
 */
export function AdminShell({
  title,
  nav,
  active,
  children,
}: {
  title: string;
  nav: NavItem[];
  active: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto flex max-w-[90rem]">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 md:block" aria-label="Admin">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col px-4 py-6">
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg gx-btn gx-btn-primary text-white">
                <span className="h-5 w-5">{icons.shield}</span>
              </span>
              <div>
                <p className="text-sm font-bold text-white">Admin Console</p>
                <p className="text-xs text-slate-400">Full platform control</p>
              </div>
            </div>
            <nav className="flex-1 space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active === item.href ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active === item.href
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <span className="h-5 w-5" aria-hidden="true">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link href="/" className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-white">
              <span className="h-5 w-5" aria-hidden="true">{icons.search}</span>
              View public site
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 bg-white md:rounded-tl-2xl">
          {/* Mobile admin bar */}
          <div className="border-b border-slate-200 bg-slate-950 px-4 py-3 md:hidden">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <span className="h-4 w-4">{icons.shield}</span>
              </span>
              <p className="text-sm font-bold text-white">Admin Console</p>
            </div>
            <nav className="mt-3 flex gap-1 overflow-x-auto pb-1" aria-label="Admin">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold ${
                    active === item.href ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h1>
            <div className="mt-5 pb-20 md:pb-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
