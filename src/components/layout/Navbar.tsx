import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { MobileMenu } from "./MobileMenu";
import { UserMenu } from "./UserMenu";
import { unreadCount } from "@/lib/notifications";

const links = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/for-employers", label: "For Employers" },
  { href: "/resources", label: "Resources" },
];

export async function Navbar() {
  const user = await getSessionUser();
  const unread = user ? await unreadCount(user.id) : 0;
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Growentix home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-lg font-bold text-white">G</span>
          <span className="hidden text-lg font-bold text-slate-900 sm:block">Grow<span className="text-emerald-700">entix</span></span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <Link href="/notifications" className="relative flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100" aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></svg>
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white">
                    {unread > 99 ? "99+" : unread}
                  </span>
                )}
              </Link>
              <Link href="/dashboard" className="hidden rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 sm:block">
                Dashboard
              </Link>
              <UserMenu name={user.name} role={user.role} />
            </>
          ) : (
            <>
              <Link href="/login" className="hidden rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:block">
                Log in
              </Link>
              <Link href="/signup" className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
                Sign up
              </Link>
            </>
          )}
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
}
