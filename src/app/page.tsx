import Link from "next/link";
import { db } from "@/lib/db";
import { JobCard } from "@/components/jobs/JobCard";
import { Card } from "@/components/ui/primitives";
import { CourseCarousel } from "@/components/courses/CourseCarousel";
import { CourseCard, type CarouselCourse } from "@/components/courses/CourseCard";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, totalActive, verifiedCompanies, locations, courseRows] = await Promise.all([
    db.job.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      take: 6,
      include: { company: { select: { name: true, verificationStatus: true, verificationExpiresAt: true, verifiedAt: true } }, location: { select: { name: true } } },
    }),
    db.job.count({ where: { status: "ACTIVE" } }),
    db.company.count({ where: { verificationStatus: "VERIFIED", OR: [{ verificationExpiresAt: null }, { verificationExpiresAt: { gt: new Date() } }] } }),
    db.location.findMany({
      include: { _count: { select: { jobs: { where: { status: "ACTIVE" } } } } },
      orderBy: { name: "asc" },
      take: 8,
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
  const cities = locations.filter((l) => l._count.jobs > 0);

  const allCourses: CarouselCourse[] = courseRows.map((c) => ({
    slug: c.slug, title: c.title, price: c.price, category: c.category, sales: c.sales,
    views: c.views, thumbnailUrl: c.thumbnailUrl, instructorName: c.instructor.user.name,
    isVerified: c.instructor.isVerified,
  }));
  const freeCourses = allCourses.filter((c) => c.price === 0);
  const paidCourses = allCourses.filter((c) => c.price > 0);

  const stats = [
    { value: totalActive, label: "Active jobs" },
    { value: verifiedCompanies, label: "Verified employers" },
    { value: cities.length, label: "Cities hiring" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-emerald-900">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
          <p className="inline-flex items-center rounded-full bg-emerald-800 px-3 py-1 text-xs font-semibold text-emerald-100">
            Free for students — forever
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Find Part-Time Jobs That Fit Your Student Life
          </h1>
          <p className="mt-4 max-w-xl text-base text-emerald-100 sm:text-lg">
            Discover part-time, evening, weekend, remote and entry-level opportunities from trusted employers.
          </p>

          <form action="/jobs" method="get" className="mt-8 max-w-2xl rounded-xl bg-white p-2 shadow-lg sm:flex sm:gap-2" role="search">
            <label htmlFor="hero-q" className="sr-only">What job are you looking for?</label>
            <input
              id="hero-q" name="q" type="search" placeholder="What job are you looking for?"
              className="h-12 w-full flex-1 rounded-lg px-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <label htmlFor="hero-loc" className="sr-only">Where?</label>
            <input
              id="hero-loc" name="location" type="text" placeholder="Where? e.g. Kathmandu"
              className="mt-2 h-12 w-full rounded-lg px-4 text-[15px] text-slate-900 placeholder:text-slate-400 sm:mt-0 sm:w-48 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button type="submit" className="mt-2 h-12 w-full rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 sm:mt-0 sm:w-auto">
              Search Jobs
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {["Part-time jobs", "Evening jobs", "Remote jobs", "Internships"].map((t, i) => {
              const hrefs = ["/jobs?type=PART_TIME", "/jobs?schedule=EVENING", "/jobs?arrangement=REMOTE", "/jobs?type=INTERNSHIP"];
              return (
                <Link key={t} href={hrefs[i]} className="rounded-full bg-emerald-800/80 px-3.5 py-1.5 text-sm font-medium text-emerald-50 hover:bg-emerald-800">
                  {t}
                </Link>
              );
            })}
          </div>

          <dl className="mt-8 flex max-w-xl divide-x divide-emerald-700/60">
            {stats.map((s) => (
              <div key={s.label} className="pr-6 pl-6 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-white sm:text-3xl">{s.value}</dd>
                <dd className="mt-0.5 text-xs text-emerald-200 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* AI banner */}
      <section className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
            <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4L12 2zM19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z"/></svg>
            New: AI Job Assistant — describe your job in your own words, get matched instantly.
          </p>
          <Link href="/jobs" className="ml-auto rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800">Try AI Search</Link>
        </div>
      </section>

      {/* Free courses */}
      {freeCourses.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Free courses</h2>
              <p className="mt-1 text-sm text-slate-500">Watch instantly — no payment needed.</p>
            </div>
            <Link href="/courses" className="shrink-0 text-sm font-semibold text-emerald-700 hover:underline">View all courses</Link>
          </div>
          <div className="mt-5">
            <CourseCarousel label="Free courses">
              {freeCourses.map((c) => (
                <CourseCard key={c.slug} c={c} />
              ))}
            </CourseCarousel>
          </div>
          {paidCourses.length > 0 && (
            <>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Paid courses</h2>
                  <p className="mt-1 text-sm text-slate-500">From verified instructors on Growentix.</p>
                </div>
              </div>
              <div className="mt-5">
                <CourseCarousel label="Paid courses">
                  {paidCourses.map((c) => (
                    <CourseCard key={c.slug} c={c} />
                  ))}
                </CourseCarousel>
              </div>
            </>
          )}
        </section>
      )}

      {/* Featured jobs */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Featured jobs</h2>
            <Link href="/jobs" className="text-sm font-semibold text-emerald-700 hover:underline">View all</Link>
          </div>
          {featured.length === 0 ? (
            <Card className="mt-5 p-8 text-center text-sm text-slate-500">
              New opportunities are on the way. Check back soon — or be the first employer to <Link href="/for-employers" className="font-semibold text-emerald-700 hover:underline">post a job</Link>.
            </Card>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((j) => <JobCard key={j.id} job={j} />)}
          </div>
          )}
        </div>
      </section>

      {/* Browse by city */}
      {cities.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Jobs by city</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {cities.map((l) => (
              <Link key={l.id} href={`/jobs?location=${encodeURIComponent(l.name)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-800">
                {l.name} <span className="text-slate-400">({l._count.jobs})</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">How it works</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-emerald-800">For Students</h3>
              <ol className="mt-3 space-y-3 text-sm text-slate-700">
                {[["Create your profile", "Add education, skills and availability."], ["Discover matching jobs", "Search and filter jobs that fit your schedule."], ["Apply easily", "One application with your saved profile and CV."], ["Track applications", "Get notified at every stage."]].map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">{i + 1}</span>
                    <div><p className="font-semibold text-slate-900">{t}</p><p className="text-slate-600">{d}</p></div>
                  </li>
                ))}
              </ol>
              <Link href="/signup" className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline">Create a free student account →</Link>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800">For Employers</h3>
              <ol className="mt-3 space-y-3 text-sm text-slate-700">
                {[["Create company profile", "Tell students about your business."], ["Post a job", "Describe the role, schedule and pay."], ["Find qualified students", "Review applications and shortlist."], ["Hire", "Message, interview and select."]].map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">{i + 1}</span>
                    <div><p className="font-semibold text-slate-900">{t}</p><p className="text-slate-600">{d}</p></div>
                  </li>
                ))}
              </ol>
              <Link href="/for-employers" className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline">See employer plans →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Why Growentix?</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Student-focused jobs", "Roles built around class schedules."],
              ["Verified employers", "Companies pass a verification review."],
              ["Easy applications", "Apply in minutes with your profile."],
              ["Safe by design", "Report scams — never pay to apply."],
            ].map(([t, d]) => (
              <Card key={t} className="p-5">
                <p className="font-semibold text-slate-900">{t}</p>
                <p className="mt-1 text-sm text-slate-600">{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-800">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to find your next opportunity?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-emerald-100">Join students across Nepal finding flexible work that fits their studies.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/jobs" className="inline-flex h-12 items-center rounded-lg bg-white px-6 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">
              Find Jobs
            </Link>
            <Link href="/signup" className="inline-flex h-12 items-center rounded-lg border border-emerald-200 px-6 text-sm font-semibold text-white hover:bg-emerald-700">
              Create Student Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
