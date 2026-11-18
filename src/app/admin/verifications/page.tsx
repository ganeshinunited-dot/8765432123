import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Verification queue",
  robots: { index: false, follow: false },
};

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

type Row = {
  id: string;
  status: string;
  createdAt: Date;
  company: {
    name: string;
    slug: string;
    website: string | null;
    owner: { email: string; emailVerified: boolean };
  };
  businessInfo: Record<string, unknown>;
};

function regNo(v: Row): string {
  const r = v.businessInfo?.registrationNo;
  return typeof r === "string" ? r : "—";
}

export default async function AdminVerificationsPage() {
  await requireAdmin();
  const emailConfigured = (process.env.EMAIL_DRIVER || "log") === "resend";

  const pending = await db.companyVerification.findMany({
    where: { status: { in: ["PENDING", "NEEDS_INFO"] } },
    orderBy: { createdAt: "desc" },
    include: { company: { include: { owner: { select: { email: true, emailVerified: true } } } } },
  });
  const decided = await db.companyVerification.findMany({
    where: { status: { in: ["VERIFIED", "REJECTED"] } },
    orderBy: { updatedAt: "desc" },
    take: 10,
    include: { company: { include: { owner: { select: { email: true, emailVerified: true } } } } },
  });

  const rows = (list: typeof pending) =>
    list.map((v) => ({
      ...v,
      businessInfo: (v.businessInfo ?? {}) as Record<string, unknown>,
    }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Verification queue</h1>
      <p className="mt-2 text-base text-slate-600">
        Employer applications awaiting review. Approve only after the manual checks pass — a
        Verified badge is valid for 12 months.
      </p>

      {!emailConfigured && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Email is not configured (EMAIL_DRIVER is not &lsquo;resend&rsquo;) — verification emails
          are only logged, not sent. Contact applicants manually and use &lsquo;Confirm
          contact&rsquo; on their review page once you have reached them.
        </p>
      )}

      <h2 className="mt-8 text-lg font-bold text-slate-900">
        Awaiting review ({pending.length})
      </h2>
      {pending.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No applications awaiting review.</p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="px-4 py-2 font-semibold">Company</th>
                <th className="px-4 py-2 font-semibold">Owner email</th>
                <th className="px-4 py-2 font-semibold">Registration no.</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Submitted</th>
                <th className="px-4 py-2 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {rows(pending).map((v) => (
                <tr key={v.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-2 font-semibold text-slate-900">
                    {v.company.name}
                    <span className="block text-xs font-normal text-slate-500">
                      {v.company.website || "no website"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-700">
                    {v.company.owner.email}
                    <span className="block text-xs text-slate-500">
                      {v.company.owner.emailVerified ? "Email verified" : "Email NOT verified"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-700">{regNo(v as Row)}</td>
                  <td className="px-4 py-2 text-slate-700">{v.status}</td>
                  <td className="px-4 py-2 text-slate-700">{formatDate(v.createdAt)}</td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/admin/verifications/${v.id}`}
                      className="font-semibold text-emerald-700 hover:underline"
                    >
                      Review →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mt-10 text-lg font-bold text-slate-900">Recently decided</h2>
      {decided.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">Nothing decided yet.</p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="px-4 py-2 font-semibold">Company</th>
                <th className="px-4 py-2 font-semibold">Owner email</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {rows(decided).map((v) => (
                <tr key={v.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-2 font-semibold text-slate-900">{v.company.name}</td>
                  <td className="px-4 py-2 text-slate-700">{v.company.owner.email}</td>
                  <td className="px-4 py-2 text-slate-700">{v.status}</td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/admin/verifications/${v.id}`}
                      className="font-semibold text-emerald-700 hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-8 text-sm text-slate-600">
        <Link href="/admin/companies" className="font-semibold text-emerald-700 hover:underline">
          All companies →
        </Link>
      </p>
    </div>
  );
}
