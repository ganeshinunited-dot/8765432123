import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { STUDENT_NAV } from "@/components/dashboard/student-nav";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { JobCard } from "@/components/jobs/JobCard";
import { VerifyEmailBanner } from "@/components/auth/VerifyEmailBanner";
import { matchJobsForStudent } from "@/lib/match";
import { APP_STATUS_LABELS, APP_STATUS_COLORS } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function StudentHome() {
  const user = await requireUser(["STUDENT"]);
  const profile = await db.studentProfile.findUnique({
    where: { userId: user.id },
    include: { skills: { include: { skill: true } } },
  });
  if (!profile) redirect("/profile");

  const [applications, savedCount, unread, interviews] = await Promise.all([
    db.application.findMany({
      where: { studentId: profile.id },
      orderBy: { appliedAt: "desc" },
      take: 5,
      include: { job: { include: { company: { select: { name: true } } } } },
    }),
    db.savedJob.count({ where: { studentId: profile.id } }),
    db.notification.count({ where: { userId: user.id, readAt: null } }),
    db.interview.count({
      where: { application: { studentId: profile.id }, status: { in: ["PROPOSED", "ACCEPTED"] } },
    }),
  ]);

  const matches = await matchJobsForStudent(profile.id, 6);
  const matchedJobs = matches.length
    ? await db.job.findMany({
        where: { id: { in: matches.map((m) => m.jobId) } },
        include: { company: { select: { name: true, verificationStatus: true } }, location: { select: { name: true } } },
      })
    : [];
  const matchById = new Map(matches.map((m) => [m.jobId, m]));
  const ordered = matchedJobs.sort((a, b) => (matchById.get(b.id)?.score ?? 0) - (matchById.get(a.id)?.score ?? 0));

  return (
    <DashboardShell title={`Welcome, ${user.name.split(" ")[0]}`} nav={STUDENT_NAV} active="/dashboard/home">
      <VerifyEmailBanner emailVerified={user.emailVerified} />
      {profile.profileCompletion < 100 && (
        <Card className="mb-5 border-emerald-200 bg-emerald-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-900">Profile {profile.profileCompletion}% complete</p>
              <p className="text-sm text-slate-600">Complete your profile to receive better job matches.</p>
            </div>
            <Link href="/profile" className="inline-flex h-11 items-center rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800">
              Complete profile
            </Link>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-emerald-600" style={{ width: `${profile.profileCompletion}%` }} />
          </div>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Applications", String(await db.application.count({ where: { studentId: profile.id } })), "/dashboard/applications"],
          ["Saved jobs", String(savedCount), "/dashboard/saved"],
          ["Interviews", String(interviews), "/dashboard/applications"],
        ].map(([label, value, href]) => (
          <Link key={label} href={href}>
            <Card className="p-5 transition-colors hover:border-emerald-300">
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-sm text-slate-600">{label}</p>
            </Card>
          </Link>
        ))}
      </div>
      {unread > 0 && (
        <Link href="/notifications" className="mt-4 block rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-900">
          You have {unread} unread notification{unread === 1 ? "" : "s"}. View →
        </Link>
      )}

      <h2 className="mt-8 text-lg font-bold text-slate-900">Recommended for you</h2>
      {ordered.length === 0 ? (
        <EmptyState
          title="No strong matches yet"
          description="Complete your profile with skills, location and schedule preferences to get personalized recommendations."
          action={<Link href="/profile" className="inline-flex h-11 items-center rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white">Update profile</Link>}
        />
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {ordered.map((j) => {
            const m = matchById.get(j.id)!;
            return (
              <div key={j.id} className="relative">
                <div className="absolute -top-2.5 left-4 z-10">
                  <Badge tone={m.label === "Strong match" ? "green" : m.label === "Good match" ? "blue" : "slate"}>{m.label}</Badge>
                </div>
                <JobCard job={j} />
              </div>
            );
          })}
        </div>
      )}

      <h2 className="mt-8 text-lg font-bold text-slate-900">Recent applications</h2>
      {applications.length === 0 ? (
        <Card className="mt-3 p-6 text-center text-sm text-slate-500">
          You haven&apos;t applied to any jobs yet.{" "}
          <Link href="/jobs" className="font-semibold text-emerald-700 hover:underline">Explore jobs</Link>
        </Card>
      ) : (
        <Card className="mt-3 divide-y divide-slate-100">
          {applications.map((a) => (
            <Link key={a.id} href="/dashboard/applications" className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{a.job.title}</p>
                <p className="text-xs text-slate-500">{a.job.company.name}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${APP_STATUS_COLORS[a.status]}`}>
                {APP_STATUS_LABELS[a.status]}
              </span>
            </Link>
          ))}
        </Card>
      )}
    </DashboardShell>
  );
}
