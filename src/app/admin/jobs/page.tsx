import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";
import ModerationActions from "./ModerationActions";

export const dynamic = "force-dynamic";

export default async function AdminJobs({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;

  const jobs = await db.job.findMany({
    where: status ? { status: status as never } : {},
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { company: { select: { name: true, verificationStatus: true } }, _count: { select: { applications: true } } },
  });

  const counts = await Promise.all([
    db.job.count({ where: { status: "PENDING_REVIEW" } }),
    db.job.count({ where: { status: "ACTIVE" } }),
  ]);

  return (
    <AdminShell title="Job moderation" nav={ADMIN_NAV} active="/admin/jobs">
      <div className="mb-4 flex gap-2 text-sm">
        <a href="/admin/jobs" className={`rounded-lg px-3.5 py-2 font-medium ${!status ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}>All</a>
        <a href="/admin/jobs?status=PENDING_REVIEW" className={`rounded-lg px-3.5 py-2 font-medium ${status === "PENDING_REVIEW" ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}>Pending ({counts[0]})</a>
        <a href="/admin/jobs?status=ACTIVE" className={`rounded-lg px-3.5 py-2 font-medium ${status === "ACTIVE" ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}>Active ({counts[1]})</a>
      </div>

      {jobs.length === 0 ? (
        <EmptyState title="No jobs in this view." />
      ) : (
        <Card className="divide-y divide-slate-100">
          {jobs.map((j) => (
            <div key={j.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{j.title}</p>
                  <p className="text-xs text-slate-500">
                    {j.company.name} · {j.company.verificationStatus === "VERIFIED" ? "✓ verified" : "unverified"} · {j._count.applications} applicants
                  </p>
                </div>
                <Badge tone={j.status === "ACTIVE" ? "green" : j.status === "PENDING_REVIEW" ? "amber" : j.status === "REJECTED" ? "rose" : "slate"}>
                  {j.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{j.description.slice(0, 200)}</p>
              <div className="mt-3">
                <ModerationActions id={j.id} status={j.status} slug={j.slug} />
              </div>
            </div>
          ))}
        </Card>
      )}
    </AdminShell>
  );
}
