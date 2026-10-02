import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { icons } from "@/components/dashboard/Shell";
import { Card } from "@/components/ui/primitives";

export const dynamic = "force-dynamic";

export const ADMIN_NAV = [
  { href: "/admin/home", label: "Overview", icon: icons.chart },
  { href: "/admin/jobs", label: "Jobs", icon: icons.briefcase },
  { href: "/admin/verifications", label: "Verifications", icon: icons.shield },
  { href: "/admin/reports", label: "Reports", icon: icons.flag },
  { href: "/admin/users", label: "Users", icon: icons.user },
  { href: "/admin/companies", label: "Companies", icon: icons.building },
  { href: "/admin/plans", label: "Plans", icon: icons.card },
  { href: "/admin/cms", label: "Content", icon: icons.plus },
  { href: "/admin/audit", label: "Audit log", icon: icons.search },
];

export default async function AdminHome() {
  await requireAdmin();

  const [
    users, students, employers, activeJobs, pendingJobs, pendingVerifications,
    openReports, applications, interviews, recentActions,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { role: "STUDENT" } }),
    db.user.count({ where: { role: "EMPLOYER" } }),
    db.job.count({ where: { status: "ACTIVE" } }),
    db.job.count({ where: { status: "PENDING_REVIEW" } }),
    db.companyVerification.count({ where: { status: "PENDING" } }),
    db.report.count({ where: { status: "OPEN" } }),
    db.application.count(),
    db.interview.count({ where: { status: "PROPOSED" } }),
    db.adminAction.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { admin: { select: { name: true } } } }),
  ]);

  const stats: [string, string, string][] = [
    ["Total users", String(users), "/admin/users"],
    ["Students", String(students), "/admin/users?role=STUDENT"],
    ["Employers", String(employers), "/admin/users?role=EMPLOYER"],
    ["Active jobs", String(activeJobs), "/admin/jobs"],
    ["Applications", String(applications), "/admin/jobs"],
    ["Interviews proposed", String(interviews), "/admin/jobs"],
  ];

  const queues: [string, number, string][] = [
    ["Jobs awaiting review", pendingJobs, "/admin/jobs?status=PENDING_REVIEW"],
    ["Verifications pending", pendingVerifications, "/admin/verifications"],
    ["Open reports", openReports, "/admin/reports"],
  ];

  return (
    <AdminShell title="Admin dashboard" nav={ADMIN_NAV} active="/admin/home">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Needs attention</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {queues.map(([label, n, href]) => (
          <Link key={label} href={href}>
            <Card className={`p-5 ${n > 0 ? "border-amber-300 bg-amber-50/50" : ""}`}>
              <p className={`text-2xl font-bold ${n > 0 ? "text-amber-800" : "text-slate-900"}`}>{n}</p>
              <p className="text-sm text-slate-600">{label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">Platform stats</h2>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map(([label, value, href]) => (
          <Link key={label} href={href}>
            <Card className="p-4">
              <p className="text-xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-600">{label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">Recent admin actions</h2>
      <Card className="divide-y divide-slate-100">
        {recentActions.length === 0 && <p className="p-4 text-sm text-slate-500">No admin actions yet.</p>}
        {recentActions.map((a) => (
          <div key={a.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <p><span className="font-semibold">{a.admin.name}</span> · <span className="font-mono text-xs">{a.action}</span>
              {a.reason && <span className="text-slate-500"> — {a.reason}</span>}</p>
            <p className="text-xs text-slate-400">{a.createdAt.toLocaleDateString("en-GB")}</p>
          </div>
        ))}
      </Card>
    </AdminShell>
  );
}
