import Link from "next/link";
import { db } from "@/lib/db";
import { JobCard } from "@/components/jobs/JobCard";
import { Card } from "@/components/ui/primitives";

export const revalidate = 60;

const POPULAR = [
  { label: "Part-Time", href: "/jobs?type=PART_TIME" },
  { label: "Remote", href: "/jobs?arrangement=REMOTE" },
  { label: "Evening", href: "/jobs?schedule=EVENING" },
  { label: "Weekend", href: "/jobs?schedule=WEEKEND" },
  { label: "Internships", href: "/jobs?type=INTERNSHIP" },
  { label: "Tutoring", href: "/jobs?category=tutoring-education" },
  { label: "Retail", href: "/jobs?category=retail-sales" },
  { label: "Hospitality", href: "/jobs?category=hospitality-food" },
  { label: "Digital & Creative", href: "/jobs?category=digital-creative" },
];

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    db.job.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      take: 6,
      include: { company: { select: { name: true, verificationStatus: true } }, location: { select: { name: true } } },
    }),
    db.jobCategory.findMany({ where: { active: true }, take: 9 }),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find Part-Time Jobs That Fit Your Student Life
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Discover part-time, evening, weekend, remote and entry-level opportunities from trusted employers.
          </p>
          <form action="/jobs" method="get" className="mt-8 flex max-w-2xl flex-col gap-2 sm:flex-row" role="search">
            <label htmlFor="hero-q" className="sr-only">What job are you looking for?</label>
            <input
              id="hero-q" name="q" type="search" placeholder="What job are you looking for?"
              className="h-12 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-[15px] focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
            <label htmlFor="hero-loc" className="sr-only">Where?</label>
            <input
              id="hero-loc" name="location" type="text" placeholder="Where? e.g. Kathmandu"
              className="h-12 rounded-lg border border-slate-300 bg-white px-4 text-[15px] sm:w-52 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
            <button type="submit" className="h-12 rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800">
              Search Jobs
            </button>
          </form>
          <p className="mt-3 text-sm text-slate-500">
            Try: <Link href="/jobs?q=Social+Media+Assistant&location=Kathmandu" className="font-medium text-emerald-700 hover:underline">Social Media Assistant</Link> in <span className="font-medium">Kathmandu</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/jobs" className="inline-flex h-12 items-center rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800">
              Find Jobs
            </Link>
            <Link href="/for-employers" className="inline-flex h-12 items-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50">
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Popular categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Popular categories</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {POPULAR.map((c) => (
            <Link key={c.label} href={c.href} className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-400 hover:text-emerald-800">
              {c.label}
            </Link>
          ))}
        </div>
        {categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.id} href={`/jobs?category=${c.slug}`} className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm text-slate-700 hover:bg-slate-200">
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured jobs */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
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
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-slate-50">
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
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Why use our platform?</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Student-focused jobs", "Roles built around class schedules."],
            ["Verified employers", "Companies pass a verification review."],
            ["Easy applications", "Apply in minutes with your profile."],
            ["Flexible work options", "Evening, weekend and remote roles."],
            ["Secure platform", "Report scams; never pay to apply."],
          ].map(([t, d]) => (
            <Card key={t} className="p-5">
              <p className="font-semibold text-slate-900">{t}</p>
              <p className="mt-1 text-sm text-slate-600">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials (sample) */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">What students say</h2>
        <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">Sample stories for illustration</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            "I found an evening cafe job near my college within a week. The schedule filter saved me so much time.",
            "Applying with my saved profile took two minutes. I got shortlisted for a social media role.",
            "The verified badge made me trust the employers here. No spam, no fake offers.",
          ].map((q, i) => (
            <Card key={i} className="p-5">
              <p className="text-sm text-slate-700">“{q}”</p>
              <p className="mt-3 text-xs text-slate-400">Sample student story</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-800">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to find your next opportunity?</h2>
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
