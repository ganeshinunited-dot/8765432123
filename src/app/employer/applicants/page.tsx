import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { timeAgo } from "@/lib/format";
import ApplicantRow from "./ApplicantRow";
import { EMPLOYER_NAV } from "../home/page";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, "green" | "amber" | "rose" | "slate" | "blue"> = {
  APPLIED: "blue", VIEWED: "slate", SHORTLISTED: "amber", INTERVIEW: "blue", SELECTED: "green", REJECTED: "rose", WITHDRAWN: "slate",
};

export default async function ApplicantsPage({
  searchParams,
}: {
  searchParams: Promise<{ job?: string; status?: string }>;
}) {
  const { job: jobFilter, status: statusFilter } = await searchParams;
  const user = await requireUser(["EMPLOYER"]);
  const company = await db.company.findFirst({ where: { ownerId: user.id } });
  if (!company) {
    return (
      <DashboardShell title="Applicants" nav={EMPLOYER_NAV} active="/employer/applicants">
        <EmptyState title="Create your company profile first." />
      </DashboardShell>
    );
  }

  const jobs = await db.job.findMany({ where: { companyId: company.id }, orderBy: { createdAt: "desc" }, select: { id: true, title: true } });

  const apps = await db.application.findMany({
    where: {
      job: { companyId: company.id },
      ...(jobFilter ? { jobId: jobFilter } : {}),
      ...(statusFilter ? { status: statusFilter as never } : {}),
    },
    orderBy: { appliedAt: "desc" },
    take: 100,
    include: {
      job: { select: { id: true, title: true } },
      student: {
        include: {
          user: { select: { name: true } },
          location: { select: { name: true } },
          skills: { include: { skill: true } },
        },
      },
    },
  });

  return (
    <DashboardShell title="Applicants" nav={EMPLOYER_NAV} active="/employer/applicants">
      <form className="mb-4 flex flex-wrap gap-3" method="get">
        <select name="job" defaultValue={jobFilter || ""} className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm">
          <option value="">All jobs</option>
          {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
        <select name="status" defaultValue={statusFilter || ""} className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm">
          <option value="">All statuses</option>
          {Object.keys(STATUS_TONE).map((s) => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
        </select>
        <button type="submit" className="h-11 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white">Filter</button>
      </form>

      {apps.length === 0 ? (
        <EmptyState title="No applicants yet." description="Share your job posts — applicants will appear here." />
      ) : (
        <Card className="divide-y divide-slate-100">
          {apps.map((a) => (
            <ApplicantRow
              key={a.id}
              app={{
                id: a.id, status: a.status, appliedAt: a.appliedAt.toISOString(),
                jobTitle: a.job.title, jobId: a.job.id,
                studentName: a.student.user.name,
                headline: a.student.headline, location: a.student.location?.name,
                education: a.student.educationLevel, college: a.student.college,
                skills: a.student.skills.map((s) => s.skill.name),
                coverMessage: a.coverMessage, cvFileId: a.cvFileId,
              }}
              tone={STATUS_TONE[a.status] || "slate"}
            />
          ))}
        </Card>
      )}
    </DashboardShell>
  );
}

export { timeAgo };
