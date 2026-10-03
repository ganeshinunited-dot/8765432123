import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { STUDENT_NAV } from "@/components/dashboard/student-nav";
import { Card, EmptyState } from "@/components/ui/primitives";
import { APP_STATUS_LABELS, APP_STATUS_COLORS, timeAgo } from "@/lib/format";
import { WithdrawButton } from "@/components/student/WithdrawButton";

export const dynamic = "force-dynamic";

const WITHDRAWABLE = ["APPLIED", "VIEWED", "SHORTLISTED"];

export default async function ApplicationsPage() {
  const user = await requireUser(["STUDENT"]);
  const profile = await db.studentProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return <p className="p-8">Profile not found.</p>;

  const applications = await db.application.findMany({
    where: { studentId: profile.id },
    orderBy: { appliedAt: "desc" },
    include: {
      job: { include: { company: { select: { name: true, slug: true } }, location: { select: { name: true } } } },
      interviews: { orderBy: { dateTime: "desc" }, take: 1 },
    },
  });

  return (
    <DashboardShell title="My applications" nav={STUDENT_NAV} active="/dashboard/applications">
      {applications.length === 0 ? (
        <EmptyState
          title="You haven't applied to any jobs yet."
          description="Find a role that fits your schedule and apply in minutes."
          action={<Link href="/jobs" className="inline-flex h-11 items-center rounded-lg gx-btn gx-btn-primary px-5 text-sm font-semibold text-white">Explore Jobs</Link>}
        />
      ) : (
        <div className="space-y-3">
          {applications.map((a) => (
            <Card key={a.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={`/jobs/${a.job.slug}`} className="font-semibold text-slate-900 hover:text-emerald-700 hover:underline">
                    {a.job.title}
                  </Link>
                  <p className="text-sm text-slate-600">{a.job.company.name}{a.job.location ? ` · ${a.job.location.name}` : ""}</p>
                  <p className="mt-1 text-xs text-slate-500">Applied {timeAgo(a.appliedAt)}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${APP_STATUS_COLORS[a.status]}`}>
                  {APP_STATUS_LABELS[a.status]}
                </span>
              </div>
              {a.interviews[0] && ["PROPOSED", "ACCEPTED"].includes(a.interviews[0].status) && (
                <div className="mt-3 rounded-lg bg-violet-50 px-4 py-3 text-sm text-violet-900">
                  Interview {a.interviews[0].status === "ACCEPTED" ? "scheduled" : "proposed"}:{" "}
                  {new Date(a.interviews[0].dateTime).toLocaleString()}
                  <Link href="/dashboard/messages" className="ml-2 font-semibold underline">Respond →</Link>
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/jobs/${a.job.slug}`} className="inline-flex h-10 items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  View job
                </Link>
                {WITHDRAWABLE.includes(a.status) && <WithdrawButton applicationId={a.id} />}
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
