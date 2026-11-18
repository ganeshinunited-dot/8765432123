import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <nav className="flex items-center gap-5 text-sm font-semibold">
            <Link href="/admin/verifications" className="text-slate-900">
              Verification queue
            </Link>
            <Link
              href="/admin/companies"
              className="text-slate-600 hover:text-slate-900"
            >
              All companies
            </Link>
          </nav>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition-colors hover:border-rose-300 hover:text-rose-700"
            >
              Log out
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
