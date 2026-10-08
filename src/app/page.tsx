import Link from "next/link";
import { db } from "@/lib/db";
import { JobCard } from "@/components/jobs/JobCard";
import { Card } from "@/components/ui/primitives";
import { CourseCarousel } from "@/components/courses/CourseCarousel";
import { CourseCard, type CarouselCourse } from "@/components/courses/CourseCard";
import { SARKARI_JOBS } from "@/data/sarkariJobs";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, totalActive, verifiedCompanies, locations, courseRows, categories] = await Promise.all([
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
    db.jobCategory
      .findMany({
        where: { active: true },
        include: { _count: { select: { jobs: { where: { status: "ACTIVE" } } } } },
        orderBy: { name: "asc" },
        take: 16,
      })
      .catch(() => []),
  ]);
  const cities = locations.filter((l) => l._count.jobs > 0);
  const topCategories = categories.filter((c) => c._count.jobs > 0).slice(0, 8);

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
    { value: SARKARI_JOBS.length, label: "Sarkari notices" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-emerald-950">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_0%,rgba(16,185,129,0.28),transparent_70%)]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(40%_35%_at_85%_100%,rgba(251,191,36,0.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-24 sm:pt-24">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Free for talent — forever
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Have Talent? Find Work That <span className="text-emerald-300">Fits Your Life</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-emerald-100/90 sm:text-lg">
            Part-time, evening, weekend and remote roles from verified employers — plus sarkari notices and free courses, all in one place.
          </p>

          <form action="/jobs" method="get" className="mt-7 max-w-2xl rounded-2xl bg-white p-2.5 shadow-2xl shadow-emerald-950/40 sm:mt-9 sm:flex sm:gap-2" role="search">
            <label htmlFor="hero-q" className="sr-only">What job are you looking for?</label>
            <input
              id="hero-q" name="q" type="search" placeholder="Try &quot;delivery rider&quot; or &quot;tutor&quot;"
              className="h-13 w-full flex-1 rounded-xl px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <label htmlFor="hero-loc" className="sr-only">Where?</label>
            <input
              id="hero-loc" name="location" type="text" placeholder="Where? e.g. Kathmandu"
              className="mt-2 h-13 w-full rounded-xl px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 sm:mt-0 sm:w-52 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button type="submit" className="mt-2 h-13 rounded-xl gx-btn gx-btn-primary px-7 py-3.5 text-sm font-bold text-white sm:mt-0 sm:w-auto">
              Search
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {[["Part-time", "/jobs?type=PART_TIME"], ["Evening", "/jobs?schedule=EVENING"], ["Remote", "/jobs?arrangement=REMOTE"], ["Internships", "/jobs?type=INTERNSHIP"], ["Sarkari Jobs", "/sarkari-jobs"]].map(([t, href]) => (
              <Link key={t} href={href} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-50 backdrop-blur-sm transition hover:bg-white/20">
                {t}
              </Link>
            ))}
          </div>

          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-6 sm:mt-10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl font-extrabold text-white sm:text-4xl">{s.value}</dd>
                <dt className="mt-1 text-xs font-medium uppercase tracking-wider text-emerald-200/80">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Dashain gigs spotlight — seasonal strip, remove after Tihar */}
      <section className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
            <span className="inline-flex items-center rounded-full bg-amber-400/30 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-900">
              Dashain season
            </span>
            Festival gigs are live — shops, restaurants &amp; delivery need extra hands. Short shifts, quick pay.
          </p>
          <div className="ml-auto flex flex-wrap gap-2">
            {[["Temporary", "/jobs?type=TEMPORARY"], ["Part-time", "/jobs?type=PART_TIME"], ["Weekend", "/jobs?schedule=WEEKEND"], ["Evening", "/jobs?schedule=EVENING"]].map(([label, href]) => (
              <Link key={label} href={href} className="rounded-full gx-btn gx-btn-primary px-3.5 py-1.5 text-sm font-medium text-emerald-50">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sarkari jobs banner */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-5 sm:px-6">
          <p className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 sm:text-base">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-900">
              Sarkari Jobs
            </span>
            {SARKARI_JOBS.length} ota current sarkari vacancy suchana — PSC, police, hospital, local level.
          </p>
          <Link href="/sarkari-jobs" className="ml-auto rounded-lg gx-btn gx-btn-dark px-4 py-2 text-sm font-bold text-white">Hernus</Link>
        </div>
      </section>

      {/* AI banner */}
      <section className="border-b border-emerald-100 bg-emerald-50/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-5 sm:px-6">
          <p className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 sm:text-base">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4L12 2zM19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" /></svg>
            </span>
            AI Job Assistant — describe your ideal job in your own words, get matched instantly.
          </p>
          <Link href="/jobs" className="ml-auto rounded-lg gx-btn gx-btn-primary px-4 py-2 text-sm font-bold text-white">Try AI Search</Link>
        </div>
      </section>

      {/* Browse by category */}
      {topCategories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
          <span className="gx-eyebrow">Explore</span>
          <h2 className="gx-h2">Browse by category</h2>
          <p className="gx-sub">From kitchens to classrooms — find the kind of work you actually want.</p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {topCategories.map((c) => (
              <Link
                key={c.id}
                href={`/jobs?category=${c.slug}`}
                className="gx-lift group rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 font-display text-lg font-extrabold text-emerald-800 sm:h-10 sm:w-10">
                  {c.name.charAt(0)}
                </span>
                <p className="mt-3 font-display text-[15px] font-bold text-slate-900 group-hover:text-emerald-800">{c.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{c._count.jobs} open role{c._count.jobs === 1 ? "" : "s"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured jobs */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="gx-eyebrow">Fresh</span>
              <h2 className="gx-h2">Featured jobs</h2>
            </div>
            <Link href="/jobs" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-800">View all jobs →</Link>
          </div>
          {featured.length === 0 ? (
            <Card className="mt-6 p-8 text-center text-sm text-slate-500">
              New opportunities are on the way. Check back soon — or be the first employer to <Link href="/for-employers" className="font-semibold text-emerald-700 hover:underline">post a job</Link>.
            </Card>
          ) : (
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((j) => <JobCard key={j.id} job={j} />)}
            </div>
          )}
        </div>
      </section>

      {/* Courses */}
      {freeCourses.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="gx-eyebrow">Learn</span>
              <h2 className="gx-h2">Free courses</h2>
              <p className="gx-sub">Watch instantly — no payment needed.</p>
            </div>
            <Link href="/courses" className="shrink-0 text-sm font-semibold text-emerald-700 hover:underline">View all courses →</Link>
          </div>
          <div className="mt-7">
            <CourseCarousel label="Free courses">
              {freeCourses.map((c) => (
                <CourseCard key={c.slug} c={c} />
              ))}
            </CourseCarousel>
          </div>
          {paidCourses.length > 0 && (
            <div className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-slate-900">Paid courses</h3>
                  <p className="gx-sub">From verified instructors on Growentix.</p>
                </div>
              </div>
              <div className="mt-6">
                <CourseCarousel label="Paid courses">
                  {paidCourses.map((c) => (
                    <CourseCard key={c.slug} c={c} />
                  ))}
                </CourseCarousel>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Browse by city */}
      {cities.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
            <span className="gx-eyebrow">Places</span>
            <h2 className="gx-h2">Jobs by city</h2>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {cities.map((l) => (
                <Link key={l.id} href={`/jobs?location=${encodeURIComponent(l.name)}`} className="gx-lift rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-emerald-800">
                  {l.name} <span className="ml-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-800">{l._count.jobs}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
          <div className="text-center">
            <span className="gx-eyebrow">Simple</span>
            <h2 className="gx-h2">How it works</h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <Card className="gx-lift rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-lg font-extrabold text-emerald-800">I Have Talent</h3>
              <ol className="mt-5 space-y-4 text-sm text-slate-700">
                {[["Create your profile", "Add education, skills and availability."], ["Discover matching jobs", "Search and filter jobs that fit your schedule."], ["Apply easily", "One application with your saved profile and CV."], ["Track applications", "Get notified at every stage."]].map(([t, d], i) => (
                  <li key={t} className="flex gap-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-display text-sm font-extrabold text-white">{i + 1}</span>
                    <div><p className="font-semibold text-slate-900">{t}</p><p className="mt-0.5 text-slate-600">{d}</p></div>
                  </li>
                ))}
              </ol>
              <Link href="/signup" className="mt-6 inline-block rounded-lg gx-btn gx-btn-primary px-5 py-2.5 text-sm font-bold text-white">Create your free talent account</Link>
            </Card>
            <Card className="gx-lift rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-lg font-extrabold text-slate-800">I Want Talent</h3>
              <ol className="mt-5 space-y-4 text-sm text-slate-700">
                {[["Create company profile", "Tell talented students about your business."], ["Post a job", "Describe the role, schedule and pay."], ["Find qualified talent", "Review applications and shortlist."], ["Hire", "Message, interview and select."]].map(([t, d], i) => (
                  <li key={t} className="flex gap-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 font-display text-sm font-extrabold text-white">{i + 1}</span>
                    <div><p className="font-semibold text-slate-900">{t}</p><p className="mt-0.5 text-slate-600">{d}</p></div>
                  </li>
                ))}
              </ol>
              <Link href="/for-employers" className="mt-6 inline-block rounded-lg gx-btn gx-btn-dark px-5 py-2.5 text-sm font-bold text-white">See employer plans</Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <div className="text-center">
          <span className="gx-eyebrow">Why Growentix</span>
          <h2 className="gx-h2">Built for Nepal&apos;s talent</h2>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Talent-first jobs", "Roles built around student schedules."],
            ["Verified employers", "Companies pass a verification review."],
            ["Easy applications", "Apply in minutes with your profile."],
            ["Safe by design", "Report scams — never pay to apply."],
          ].map(([t, d]) => (
            <Card key={t} className="gx-lift rounded-2xl p-6">
              <p className="font-display text-[15px] font-bold text-slate-900">{t}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-emerald-950">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(16,185,129,0.3),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-24">
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-extrabold tracking-tight text-white sm:text-5xl">Have talent? Put it to work.</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-emerald-100/90">Join talented students across Nepal finding flexible work that fits their studies.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/jobs" className="inline-flex h-13 items-center rounded-xl gx-btn gx-btn-mist px-7 py-3.5 text-sm font-bold text-emerald-900">
              Find Jobs
            </Link>
            <Link href="/signup" className="inline-flex h-13 items-center rounded-xl gx-btn gx-btn-primary px-7 py-3.5 text-sm font-bold text-white">
              Create Talent Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
