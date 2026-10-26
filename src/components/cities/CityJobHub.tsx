import Link from "next/link";
import { db } from "@/lib/db";
import { SARKARI_JOBS, sarkariSlug, type SarkariJob } from "@/data/sarkariJobs";
import { CITY_PAGES, todayNpt, type CityPage } from "@/data/cityPages";

/**
 * City job hub — server-rendered so Google indexes the live notices, not an
 * empty shell. Shows only notices whose deadline is still open (the site's
 * own Asia/Kathmandu open rule), never a closed notice presented as open.
 * When a city has no open notices, the empty state says so honestly and
 * points at the full national list instead of inventing content.
 */
export default async function CityJobHub({ city }: { city: CityPage }) {
  const today = todayNpt();
  const jobs = SARKARI_JOBS.filter((j) => j.deadline >= today && city.matches(j.location)).sort((a, b) =>
    a.deadline < b.deadline ? -1 : a.deadline > b.deadline ? 1 : 0
  );

  const articles = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 6,
    select: { slug: true, titleEn: true, publishedAt: true },
  });

  const otherCities = CITY_PAGES.filter((c) => c.slug !== city.slug);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Government jobs in {city.name}
      </h1>
      <p className="mt-2 text-base leading-relaxed text-slate-600">{city.regionNote}</p>
      <p className="mt-4 text-sm text-slate-500">
        {jobs.length > 0 ? (
          <>
            <strong className="text-slate-800">{jobs.length} open government job {jobs.length === 1 ? "notice" : "notices"}</strong>{" "}
            in {city.name} right now. These are informational notices only — Growentix does not post these jobs. Apply through the
            official notice link.
          </>
        ) : (
          <>
            No open government job notices in {city.name} at the moment. New notices appear here as soon as they are published —{" "}
            <Link href="/sarkari-jobs" className="font-semibold text-emerald-700 hover:underline">
              see all government job notices across Nepal
            </Link>
            .
          </>
        )}
      </p>

      {jobs.length > 0 && (
        <section className="mt-8" aria-label={`Open government job notices in ${city.name}`}>
          <ul className="space-y-4">
            {jobs.map((job: SarkariJob) => (
              <li key={job.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{job.organization}</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  <Link href={`/sarkari-jobs/${sarkariSlug(job)}`} className="hover:underline">
                    {job.postTitle}
                  </Link>
                </h2>
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  {job.level && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{job.level}</span>}
                  {job.seats != null && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{job.seats} seats</span>
                  )}
                  {job.location && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{job.location}</span>}
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-900">
                    Deadline: {job.deadline}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={job.noticeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-emerald-700 px-3.5 py-1.5 text-sm font-semibold text-emerald-50 hover:bg-emerald-800"
                  >
                    View official notice
                  </a>
                  <Link href={`/sarkari-jobs/${sarkariSlug(job)}`} className="text-sm font-semibold text-emerald-700 hover:underline">
                    Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12" aria-label={`How to find government jobs in ${city.name}`}>
        <h2 className="text-xl font-bold text-slate-900">How to find government jobs in {city.name}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
          {city.guide.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      {articles.length > 0 && (
        <section className="mt-12" aria-label="Latest job news">
          <h2 className="text-xl font-bold text-slate-900">Latest job news</h2>
          <ul className="mt-3 space-y-2">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/articles/${a.slug}`} className="text-base font-semibold text-emerald-700 hover:underline">
                  {a.titleEn}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            <Link href="/articles" className="text-sm font-semibold text-emerald-700 hover:underline">
              All job news
            </Link>
          </p>
        </section>
      )}

      <nav className="mt-12 border-t border-slate-200 pt-6" aria-label="Other cities">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Government jobs in other cities</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {otherCities.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/jobs-in-${c.slug}`}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-700"
              >
                Jobs in {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
