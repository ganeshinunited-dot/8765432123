import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "All companies",
  robots: { index: false, follow: false },
};

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export default async function AdminCompaniesPage() {
  await requireAdmin();

  const companies = await db.company.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      owner: { select: { email: true, emailVerified: true } },
      verifications: { orderBy: { createdAt: "desc" }, take: 1, select: { id: true, status: true } },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">All companies</h1>
      <p className="mt-2 text-base text-slate-600">
        Every employer that has applied, with its current verification status. Only VERIFIED
        companies appear on the public Companies directory.
      </p>

      {companies.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">No companies yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="px-4 py-2 font-semibold">Company</th>
                <th className="px-4 py-2 font-semibold">Owner email</th>
                <th className="px-4 py-2 font-semibold">Industry</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Applied</th>
                <th className="px-4 py-2 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-2 font-semibold text-slate-900">{c.name}</td>
                  <td className="px-4 py-2 text-slate-700">
                    {c.owner.email}
                    <span className="block text-xs text-slate-500">
                      {c.owner.emailVerified ? "Email verified" : "Email NOT verified"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-700">{c.industry || "—"}</td>
                  <td className="px-4 py-2 text-slate-700">{c.verificationStatus}</td>
                  <td className="px-4 py-2 text-slate-700">{formatDate(c.createdAt)}</td>
                  <td className="px-4 py-2">
                    {c.verifications[0] ? (
                      <Link
                        href={`/admin/verifications/${c.verifications[0].id}`}
                        className="font-semibold text-emerald-700 hover:underline"
                      >
                        Review →
                      </Link>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-8 text-sm text-slate-600">
        <Link href="/admin/verifications" className="font-semibold text-emerald-700 hover:underline">
          ← Verification queue
        </Link>
      </p>
    </div>
  );
}
