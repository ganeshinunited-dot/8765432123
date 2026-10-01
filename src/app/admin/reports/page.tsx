import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";
import ReportActions from "./ReportActions";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  await requireAdmin();
  const reports = await db.report.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { reporter: { select: { name: true, email: true } } },
  });

  // Resolve target names
  const jobIds = reports.filter((r) => r.targetType === "JOB").map((r) => r.targetId);
  const userIds = reports.filter((r) => r.targetType === "USER").map((r) => r.targetId);
  const jobs = jobIds.length ? await db.job.findMany({ where: { id: { in: jobIds } }, select: { id: true, title: true, slug: true, status: true } }) : [];
  const users = userIds.length ? await db.user.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true, email: true } }) : [];
  const jobById = new Map(jobs.map((j) => [j.id, j]));
  const userById = new Map(users.map((u) => [u.id, u]));

  const open = reports.filter((r) => r.status === "OPEN").length;

  return (
    <DashboardShell title={`Reports ${open > 0 ? `(${open} open)` : ""}`} nav={ADMIN_NAV} active="/admin/reports">
      {reports.length === 0 ? (
        <EmptyState title="No reports." description="User reports about jobs, companies or messages will appear here." />
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <Card key={r.id} className={`p-5 ${r.status === "OPEN" ? "border-amber-200" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{r.reason.replace(/_/g, " ")}</p>
                  <p className="text-sm text-slate-500">
                    Reported by {r.reporter.name} ({r.reporter.email}) · {r.createdAt.toLocaleDateString("en-GB")}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Target: {r.targetType === "JOB" && jobById.get(r.targetId)
                      ? <>Job “{jobById.get(r.targetId)!.title}” ({jobById.get(r.targetId)!.status})</>
                      : r.targetType === "USER" && userById.get(r.targetId)
                        ? <>User {userById.get(r.targetId)!.name}</>
                        : <span className="font-mono text-xs">{r.targetType}:{r.targetId.slice(0, 8)}</span>}
                  </p>
                  {r.details && <p className="mt-1 text-sm text-slate-600">Details: {r.details}</p>}
                </div>
                <Badge tone={r.status === "OPEN" ? "amber" : r.status === "RESOLVED" ? "green" : "slate"}>{r.status}</Badge>
              </div>
              {r.status === "OPEN" && (
                <div className="mt-3"><ReportActions id={r.id} targetType={r.targetType} /></div>
              )}
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
