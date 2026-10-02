import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { STUDENT_NAV } from "@/components/dashboard/student-nav";
import { EmptyState } from "@/components/ui/primitives";
import { JobCard } from "@/components/jobs/JobCard";

export const dynamic = "force-dynamic";

export default async function SavedJobsPage() {
  const user = await requireUser(["STUDENT"]);
  const profile = await db.studentProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return <p className="p-8">Profile not found.</p>;

  const saved = await db.savedJob.findMany({
    where: { studentId: profile.id },
    orderBy: { createdAt: "desc" },
    include: {
      job: { include: { company: { select: { name: true, verificationStatus: true, verificationExpiresAt: true, verifiedAt: true } }, location: { select: { name: true } } } },
    },
  });
  const active = saved.filter((s) => s.job.status === "ACTIVE");

  return (
    <DashboardShell title="Saved jobs" nav={STUDENT_NAV} active="/dashboard/saved">
      {saved.length === 0 ? (
        <EmptyState
          title="You haven't saved any jobs yet."
          description="Tap the bookmark icon on any job to save it for later."
          action={<Link href="/jobs" className="inline-flex h-11 items-center rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800">Find Jobs</Link>}
        />
      ) : (
        <>
          {saved.length !== active.length && (
            <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {saved.length - active.length} saved job{saved.length - active.length === 1 ? " has" : "s have"} expired or been removed.
            </p>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {active.map((s) => <JobCard key={s.jobId} job={{ ...s.job, saved: true }} />)}
          </div>
        </>
      )}
    </DashboardShell>
  );
}
