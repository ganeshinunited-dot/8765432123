import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";

export const dynamic = "force-dynamic";

export default async function AdminCompanies() {
  await requireAdmin();
  const companies = await db.company.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      owner: { select: { name: true, email: true } },
      location: { select: { name: true } },
      _count: { select: { jobs: true } },
    },
  });

  return (
    <DashboardShell title="Companies" nav={ADMIN_NAV} active="/admin/companies">
      {companies.length === 0 ? (
        <EmptyState title="No companies yet." />
      ) : (
        <Card className="divide-y divide-slate-100">
          {companies.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                <p className="text-xs text-slate-500">
                  {c.owner.name} ({c.owner.email}) · {c.location?.name || "No location"} · {c._count.jobs} jobs
                </p>
              </div>
              <Badge tone={c.verificationStatus === "VERIFIED" ? "green" : c.verificationStatus === "PENDING" ? "amber" : "rose"}>
                {c.verificationStatus}
              </Badge>
            </div>
          ))}
        </Card>
      )}
      <p className="mt-3 text-sm text-slate-500">
        Review pending verifications in <Link href="/admin/verifications" className="font-medium text-emerald-700 hover:underline">Verifications</Link>.
      </p>
    </DashboardShell>
  );
}
