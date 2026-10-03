import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, EmptyState, Badge } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";

export const dynamic = "force-dynamic";

const TABS = [
  { key: "pending", label: "Pending", statuses: ["PENDING"] },
  { key: "needs-info", label: "Needs info", statuses: ["NEEDS_INFO"] },
  { key: "decided", label: "Reviewed", statuses: ["VERIFIED", "REJECTED"] },
] as const;

function fraudFlags(checks: unknown): string[] {
  if (!checks || typeof checks !== "object") return [];
  const fraud = (checks as { fraud?: { message?: string }[] }).fraud;
  return Array.isArray(fraud) ? fraud.map((f) => String(f.message || "Flagged")) : [];
}

export default async function VerificationsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const tab = TABS.find((t) => t.key === sp.tab) || TABS[0];

  const verifications = await db.companyVerification.findMany({
    where: { status: { in: [...tab.statuses] as never[] } },
    orderBy: { createdAt: "asc" },
    include: { company: { select: { name: true, industry: true, verificationStatus: true } } },
    take: 100,
  });

  const pendingCount = await db.companyVerification.count({ where: { status: "PENDING" } });

  return (
    <AdminShell title="Company verifications" nav={ADMIN_NAV} active="/admin/verifications">
      <div className="mb-5 flex gap-2" role="tablist" aria-label="Verification queues">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/verifications?tab=${t.key}`}
            role="tab"
            aria-selected={tab.key === t.key}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab.key === t.key ? "bg-emerald-700 text-white" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"}`}
          >
            {t.label}{t.key === "pending" && pendingCount > 0 ? ` (${pendingCount})` : ""}
          </Link>
        ))}
      </div>

      {verifications.length === 0 ? (
        <EmptyState title="Nothing here." description={tab.key === "pending" ? "New employer verification requests will appear here." : "No verifications in this queue."} />
      ) : (
        <div className="space-y-3">
          {verifications.map((v) => {
            const info = v.businessInfo as Record<string, string>;
            const flags = fraudFlags(v.checks);
            return (
              <Card key={v.id} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{v.company.name}</p>
                    <p className="text-sm text-slate-500">{v.company.industry || "Industry not set"} · applied {new Date(v.createdAt).toLocaleDateString("en-GB")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {flags.length > 0 && <Badge tone="rose">⚠ {flags.length} fraud flag{flags.length > 1 ? "s" : ""}</Badge>}
                    <Badge tone={v.status === "PENDING" ? "amber" : v.status === "VERIFIED" ? "green" : v.status === "REJECTED" ? "rose" : "blue"}>{v.status.replace("_", " ")}</Badge>
                  </div>
                </div>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-4">
                  <div><dt className="text-slate-500">Contact person</dt><dd className="font-medium">{info.contactPerson || "—"}</dd></div>
                  <div><dt className="text-slate-500">Phone</dt><dd className="font-medium">{info.phone || "—"}</dd></div>
                  <div><dt className="text-slate-500">Registration no.</dt><dd className="font-medium">{info.registrationNo || "—"}</dd></div>
                  <div><dt className="text-slate-500">Documents</dt><dd className="font-medium">{v.documentIds.length}</dd></div>
                </dl>
                {flags.length > 0 && (
                  <div className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800">
                    {flags.map((f, i) => <p key={i}>{f}</p>)}
                  </div>
                )}
                <div className="mt-4">
                  <Link href={`/admin/verifications/${v.id}`} className="inline-flex h-10 items-center rounded-lg gx-btn gx-btn-primary px-4 text-sm font-semibold text-white">
                    Review application
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
