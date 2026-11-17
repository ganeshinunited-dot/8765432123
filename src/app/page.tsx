import Link from "next/link";
import { db } from "@/lib/db";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SmallSearch } from "@/components/articles/SmallSearch";
import { SARKARI_JOBS, sarkariSlug } from "@/data/sarkariJobs";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

const PAGE_SIZE = 20;

function activePage(params: { page?: string | string[] }): number {
  const n = parseInt(Array.isArray(params.page) ? params.page[0] ?? "" : params.page ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(d);
}


export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  // Jobs only — the front page lists job articles (every category except
  // pop-music, tech-ai and news, which have their own sections), 20 per page,
  // newest first.
  const params = await searchParams;
  const requestedPage = activePage(params);
  const where = { category: { notIn: ["pop-music", "tech-ai", "news"] } };
  const total = await db.article.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const articles = await db.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: { slug: true, category: true, country: true, titleEn: true, excerptEn: true, publishedAt: true },
  });

  // Sarkari notices auto-expire by deadline — count only live ones (Asia/Kathmandu date).
  const todayNpt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kathmandu", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const liveSarkariJobs = SARKARI_JOBS.filter((j) => j.deadline >= todayNpt).sort((a, b) => (a.deadline < b.deadline ? -1 : 1));
  const liveSarkari = liveSarkariJobs.length;
  const latestNotices = liveSarkariJobs.slice(0, 6);
  const dayMs = 86400000;
  const todayMs = new Date(`${todayNpt}T00:00:00`).getTime();
  const daysLeft = (deadline: string) => Math.max(0, Math.round((new Date(`${deadline}T00:00:00`).getTime() - todayMs) / dayMs));

  return (
    <div>
      {/* Latest Job News */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div>
          <div className="min-w-0">
            <div className="mt-1">
              <SmallSearch scope="jobs" />
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <h2 className="gx-h2 mt-0">Latest Jobs</h2>
              <Link href="/articles" className="shrink-0 text-sm font-bold text-emerald-700 hover:underline">
                View All <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Latest articles — 3-column card grid */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => {
                return (
                  <Link
                    key={a.slug}
                    href={`/articles/${a.slug}`}
                    className="gx-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs text-slate-500">{formatDate(a.publishedAt)}</span>
                      <p className="mt-2 font-serif text-lg font-bold leading-snug text-slate-900 group-hover:text-emerald-800">
                        {a.titleEn}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {a.excerptEn}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <nav className="mt-8 flex items-center justify-between gap-3 text-sm" aria-label="Pagination">
                {page > 1 ? (
                  <Link href={`/?page=${page - 1}`} className="font-semibold text-emerald-700 hover:underline">← Previous</Link>
                ) : (
                  <span className="text-slate-400">← Previous</span>
                )}
                <span className="text-slate-500">Page {page} of {totalPages}</span>
                {page < totalPages ? (
                  <Link href={`/?page=${page + 1}`} className="font-semibold text-emerald-700 hover:underline">Next →</Link>
                ) : (
                  <span className="text-slate-400">Next →</span>
                )}
              </nav>
            )}
          </div>
        </div>
      </section>

      {/* Latest vacancy notices — national government jobs */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="gx-eyebrow">Live now</span>
              <h2 className="gx-h2">Latest vacancy notices</h2>
              <p className="gx-sub">{liveSarkari} open government notices — always apply via the official notice.</p>
            </div>
            <Link href="/sarkari-jobs" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-800">View all notices →</Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestNotices.map((j) => {
              const left = daysLeft(j.deadline);
              const badge = left <= 0 ? "Closing today" : left === 1 ? "1 day left" : `${left} days left`;
              return (
                <Link key={j.id} href={`/sarkari-jobs/${sarkariSlug(j)}`} className="gx-lift group block h-full rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-900">{badge}</span>
                  <p className="mt-3 font-display text-[15px] font-bold leading-snug text-slate-900 group-hover:text-emerald-800">{j.postTitle}</p>
                  <p className="mt-1 text-sm text-slate-600">{j.organization}{j.location ? ` · ${j.location}` : ""}</p>
                  <p className="mt-3 text-xs font-semibold text-emerald-700">Full details →</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly job news — email subscribe */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-xl text-center">
            <span className="gx-eyebrow">Weekly job news</span>
            <h2 className="gx-h2 mt-2">Get the week&apos;s job news by email</h2>
            <p className="gx-sub mt-2">The newest vacancies and job news, in your inbox once a week.</p>
            <div className="mt-6 text-left">
              <NewsletterForm />
            </div>
            <p className="mt-3 text-xs text-slate-500">
              By subscribing you agree to receive the Growentix weekly newsletter. See our{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
