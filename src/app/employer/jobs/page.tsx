import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser, requireEmployer } from "@/lib/auth";
import { DashboardShell, icons } from "@/components/dashboard/Shell";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { timeAgo } from "@/lib/format";
import JobActions from "./JobActions";
import { EMPLOYER_NAV } from "../home/page";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, "green" | "amber" | "rose" | "slate" | "blue"> = {
  ACTIVE: "green", PENDING_REVIEW: "amber", DRAFT: "slate", PAUSED: "blue", EXPIRED: "slate", REJECTED: "rose",
};

export default async function EmployerJobs() {
  const user = await requireEmployer();
  const company = await db.company.findFirst({ where: { ownerId: user.id } });
  const jobs = company
    ? await db.job.findMany({
        where: { companyId: company.id },
        orderBy: { updatedAt: "desc" },
        include: { _count: { select: { applications: true } } },
      })
    : [];

  return (
    <DashboardShell title="My jobs" nav={EMPLOYER_NAV} active="/employer/jobs">
      <div className="mb-4 flex justify-end">
        <Link href="/employer/jobs/new" className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800">
          <span className="h-4 w-4">{icons.plus}</span> Post a job
        </Link>
      </div>
      {!company ? (
        <EmptyState title="Create your company profile first." action={<Link href="/employer/company" className="font-semibold text-emerald-700 hover:underline">Go to company profile</Link>} />
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No jobs posted yet."
          description="Post your first job — it takes about 3 minutes."
          action={<Link href="/employer/jobs/new" className="inline-flex h-11 items-center rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white">Post a job</Link>}
        />
      ) : (
        <Card className="divide-y divide-slate-100">
          {jobs.map((j) => (
            <div key={j.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/jobs/${j.slug}`} className="truncate text-sm font-semibold text-slate-900 hover:text-emerald-700">{j.title}</Link>
                  <Badge tone={STATUS_TONE[j.status] || "slate"}>{j.status.replace("_", " ")}</Badge>
                  {j.featured && <Badge tone="blue">Featured</Badge>}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {j._count.applications} applicant{j._count.applications === 1 ? "" : "s"} · {j.views} views · updated {timeAgo(j.updatedAt)}
                </p>
                {j.status === "REJECTED" && j.moderationNotes && (
                  <p className="mt-1 text-xs text-rose-700">Rejected: {j.moderationNotes}</p>
                )}
              </div>
              <JobActions id={j.id} status={j.status} />
            </div>
          ))}
        </Card>
      )}
    </DashboardShell>
  );
}
