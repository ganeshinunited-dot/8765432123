import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { STUDENT_NAV } from "@/components/dashboard/student-nav";
import { DashboardAiSearch } from "@/components/dashboard/DashboardAiSearch";
import { CourseCarousel } from "@/components/courses/CourseCarousel";
import { CourseCard, type CarouselCourse } from "@/components/courses/CourseCard";
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

  const [applications, savedCount, unread, interviews, courseRows] = await Promise.all([
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
    db.course
      .findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ price: "asc" }, { sales: "desc" }],
        take: 24,
        select: {
          title: true, slug: true, price: true, category: true, sales: true, views: true, thumbnailUrl: true,
          instructor: { select: { isVerified: true, user: { select: { name: true } } } },
        },
      })
      .catch(() => []),
  ]);

  const allCourses: CarouselCourse[] = courseRows.map((c) => ({
    slug: c.slug, title: c.title, price: c.price, category: c.category, sales: c.sales,
    views: c.views, thumbnailUrl: c.thumbnailUrl, instructorName: c.instructor.user.name,
    isVerified: c.instructor.isVerified,
  }));
  const freeCourses = allCourses.filter((c) => c.price === 0);
  const paidCourses = allCourses.filter((c) => c.price > 0);

  const matches = await matchJobsForStudent(profile.id, 6);
  const matchedJobs = matches.length
    ? await db.job.findMany({
        where: { id: { in: matches.map((m) => m.jobId) } },
        include: { company: { select: { name: true, verificationStatus: true, verificationExpiresAt: true, verifiedAt: true } }, location: { select: { name: true } } },
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
            <Link href="/profile" className="inline-flex h-11 items-center rounded-lg gx-btn gx-btn-primary px-5 text-sm font-semibold text-white">
              Complete profile
            </Link>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-emerald-600" style={{ width: `${profile.profileCompletion}%` }} />
          </div>
        </Card>
      )}

      {/* Job search — same as the front page */}
      <section className="mb-5 rounded-xl bg-emerald-900 p-4 sm:p-5" aria-label="Search jobs">
        <h2 className="text-base font-bold text-white sm:text-lg">Find your next job</h2>
        <form action="/jobs" method="get" role="search" className="mt-3 flex flex-col gap-2 rounded-xl bg-white p-2 shadow sm:flex-row">
          <label htmlFor="dash-q" className="sr-only">What job are you looking for?</label>
          <input
            id="dash-q" name="q" type="search" placeholder="What job are you looking for?"
            className="h-11 w-full flex-1 rounded-lg px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <label htmlFor="dash-loc" className="sr-only">Where?</label>
          <input
            id="dash-loc" name="location" type="text" placeholder="Where? e.g. Kathmandu"
            className="h-11 w-full rounded-lg px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:w-44"
          />
          <button type="submit" className="h-11 shrink-0 rounded-lg gx-btn gx-btn-primary px-5 text-sm font-semibold text-white">
            Search Jobs
          </button>
        </form>
      </section>

      <div className="mb-5">
        <DashboardAiSearch />
      </div>

      {/* Courses — same cards as the front page */}
      {freeCourses.length > 0 && (
        <section className="mb-8" aria-label="Free courses">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Free courses</h2>
              <p className="text-sm text-slate-500">Watch instantly — no payment needed.</p>
            </div>
            <Link href="/courses" className="shrink-0 text-sm font-semibold text-emerald-700 hover:underline">View all</Link>
          </div>
          <div className="mt-3">
            <CourseCarousel label="Free courses">
              {freeCourses.map((c) => (
                <CourseCard key={c.slug} c={c} />
              ))}
            </CourseCarousel>
          </div>
        </section>
      )}
      {paidCourses.length > 0 && (
        <section className="mb-8" aria-label="Paid courses">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Paid courses</h2>
              <p className="text-sm text-slate-500">From verified instructors on Growentix.</p>
            </div>
            <Link href="/courses" className="shrink-0 text-sm font-semibold text-emerald-700 hover:underline">View all</Link>
          </div>
          <div className="mt-3">
            <CourseCarousel label="Paid courses">
              {paidCourses.map((c) => (
                <CourseCard key={c.slug} c={c} />
              ))}
            </CourseCarousel>
          </div>
        </section>
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

      <h2 className="mt-8 flex items-center gap-2 text-lg font-bold text-slate-900">Recommended for you <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">Smart Match</span></h2>
      {ordered.length === 0 ? (
        <EmptyState
          title="No strong matches yet"
          description="Complete your profile with skills, location and schedule preferences to get personalized recommendations."
          action={<Link href="/profile" className="inline-flex h-11 items-center rounded-lg gx-btn gx-btn-primary px-5 text-sm font-semibold text-white">Update profile</Link>}
        />
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {ordered.map((j) => {
            const m = matchById.get(j.id)!;
            return (
              <div key={j.id} className="relative">
                <div className="absolute -top-2.5 left-4 z-10">
                  <Badge tone={m.label === "Strong match" ? "green" : m.label === "Good match" ? "blue" : "slate"}>{m.score}% · {m.label}</Badge>
                </div>
                <JobCard job={j} />
                {m.reasons.length > 0 && <p className="px-1 pt-1.5 text-xs text-slate-500">Why: {m.reasons.join(" · ")}</p>}
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
