import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell, icons } from "@/components/dashboard/Shell";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

export const EMPLOYER_NAV = [
  { href: "/employer/home", label: "Overview", icon: icons.home },
  { href: "/employer/jobs", label: "My Jobs", icon: icons.briefcase },
  { href: "/employer/applicants", label: "Applicants", icon: icons.user },
  { href: "/employer/messages", label: "Messages", icon: icons.chat },
  { href: "/employer/company", label: "Company", icon: icons.building },
  { href: "/employer/billing", label: "Billing", icon: icons.card },
];

const STATUS_TONE: Record<string, "green" | "amber" | "rose" | "slate" | "blue"> = {
  ACTIVE: "green", PENDING_REVIEW: "amber", DRAFT: "slate", PAUSED: "blue", EXPIRED: "slate", REJECTED: "rose",
};

export default async function EmployerHome() {
  const user = await requireUser(["EMPLOYER"]);
  const company = await db.company.findFirst({ where: { ownerId: user.id } });

  if (!company) {
    return (
      <DashboardShell title="Welcome" nav={EMPLOYER_NAV} active="/employer/home">
        <EmptyState
          title="Set up your company profile to get started."
          description="Add your company details, then post your first job."
          action={<Link href="/employer/company" className="inline-flex h-11 items-center rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white">Set up company</Link>}
        />
      </DashboardShell>
    );
  }

  const [jobCount, activeJobs, appCount, newApps, recentJobs, unread] = await Promise.all([
    db.job.count({ where: { companyId: company.id } }),
    db.job.count({ where: { companyId: company.id, status: "ACTIVE" } }),
    db.application.count({ where: { job: { companyId: company.id } } }),
    db.application.count({ where: { job: { companyId: company.id }, status: "APPLIED" } }),
    db.job.findMany({
      where: { companyId: company.id },
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { _count: { select: { applications: true } } },
    }),
    db.notification.count({ where: { userId: user.id, readAt: null } }),
  ]);

  return (
    <DashboardShell title={company.name} nav={EMPLOYER_NAV} active="/employer/home">
      {company.verificationStatus !== "VERIFIED" && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <span className="font-semibold">Company not verified yet.</span>{" "}
          <Link href="/employer/company" className="font-semibold underline">Complete verification</Link> to earn a trust badge on your job posts.
        </div>
      )}
      {unread > 0 && (
        <Link href="/notifications" className="mb-5 block rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-900">
          You have {unread} unread notification{unread === 1 ? "" : "s"}. View →
        </Link>
      )}

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ["Active jobs", String(activeJobs), "/employer/jobs"],
          ["Total jobs", String(jobCount), "/employer/jobs"],
          ["Applications", String(appCount), "/employer/applicants"],
          ["New applicants", String(newApps), "/employer/applicants"],
        ].map(([label, value, href]) => (
          <Link key={label} href={href}>
            <Card className="p-5 transition-colors hover:border-emerald-300">
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-sm text-slate-600">{label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent jobs</h2>
        <Link href="/employer/jobs/new" className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800">
          <span className="h-4 w-4">{icons.plus}</span> Post a job
        </Link>
      </div>

      {recentJobs.length === 0 ? (
        <Card className="mt-3 p-6 text-center text-sm text-slate-500">
          No jobs yet. <Link href="/employer/jobs/new" className="font-semibold text-emerald-700 hover:underline">Post your first job</Link>
        </Card>
      ) : (
        <Card className="mt-3 divide-y divide-slate-100">
          {recentJobs.map((j) => (
            <Link key={j.id} href="/employer/jobs" className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{j.title}</p>
                <p className="text-xs text-slate-500">{j._count.applications} applicant{j._count.applications === 1 ? "" : "s"} · updated {timeAgo(j.updatedAt)}</p>
              </div>
              <Badge tone={STATUS_TONE[j.status] || "slate"}>{j.status.replace("_", " ")}</Badge>
            </Link>
          ))}
        </Card>
      )}
    </DashboardShell>
  );
}
