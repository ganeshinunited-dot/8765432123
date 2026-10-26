import Link from "next/link";
import type { CSSProperties } from "react";
import { db } from "@/lib/db";
import { Reveal } from "@/components/ui/Reveal";
import { SARKARI_JOBS, sarkariSlug } from "@/data/sarkariJobs";
import { articleCategoryLabel } from "@/lib/articles";
import { articleImagesFor } from "@/data/articleImages";

export const revalidate = 60;

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

const CATEGORY_PILLS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "All",
    href: "/articles",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Remote",
    href: "/articles?category=remote",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="4" width="20" height="12" rx="2" />
        <path d="M2 20h20" />
      </svg>
    ),
  },
  {
    label: "Gulf",
    href: "/articles?category=gulf",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "USA",
    href: "/articles?category=usa",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "UK",
    href: "/articles?category=uk",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Canada",
    href: "/articles?category=canada",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Australia",
    href: "/articles?category=australia",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Europe",
    href: "/articles?category=europe",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Asia",
    href: "/articles?category=asia",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Korea & Japan",
    href: "/articles?category=korea-japan",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Work Abroad",
    href: "/articles?category=work-abroad",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
  {
    label: "Nepal",
    href: "/articles?category=nepal",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

export default async function HomePage() {
  // Latest job news — the front page lists the newest articles. View counts
  // are no longer collected since the login system was removed.
  const articles = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 6,
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
      {/* Hero — dark, headline + search pill + category pills */}
      <section className="relative overflow-hidden bg-emerald-950">
        <div aria-hidden className="gx-glow absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_0%,rgba(232,50,31,0.28),transparent_70%)]" />
        <div aria-hidden className="gx-glow absolute inset-0 bg-[radial-gradient(40%_35%_at_85%_100%,rgba(192,192,192,0.14),transparent_70%)]" style={{ animationDelay: "-4.5s" }} />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
          <h1 className="gx-enter max-w-3xl font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl" style={{ "--gx-delay": "120ms" } as CSSProperties}>
            Never miss <span className="text-emerald-300">an opportunity.</span>
          </h1>
          <p className="gx-enter mt-4 max-w-xl text-base leading-relaxed text-emerald-100/90 sm:text-lg" style={{ "--gx-delay": "200ms" } as CSSProperties}>
            Latest job news, vacancies and career opportunities from around the world — all in one place.
          </p>

          {/* Category pills — horizontal scroll on mobile */}
          <div className="gx-enter -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ "--gx-delay": "280ms" } as CSSProperties}>
            {CATEGORY_PILLS.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  p.label === "All"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                    : "border border-white/15 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                }`}
              >
                {p.icon}
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Job News */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex items-center justify-between gap-3">
          <h2 className="gx-h2 mt-0">Latest Job News</h2>
          <Link href="/articles" className="shrink-0 text-sm font-bold text-emerald-700 hover:underline">
            View All <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-6 space-y-3">
          {articles.map((a, i) => {
            const images = articleImagesFor(a.slug);
            return (
              <Reveal key={a.slug} delay={Math.min(i, 5) * 60}>
                <Link href={`/articles/${a.slug}`} className="gx-lift group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  {images ? (
                    <img
                      src={images[0]}
                      alt=""
                      loading="lazy"
                      className="hidden h-20 w-24 shrink-0 rounded-xl object-cover sm:block"
                    />
                  ) : (
                    <span className="hidden h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-display text-2xl font-extrabold text-emerald-700 sm:flex">
                      {articleCategoryLabel(a.category).charAt(0)}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-[15px] font-bold leading-snug text-slate-900 group-hover:text-emerald-800 sm:text-base">
                        {a.titleEn}
                      </p>
                      <span className="shrink-0 text-xs text-slate-500">{formatDate(a.publishedAt)}</span>
                    </div>
                    <p className="mt-1 truncate text-sm text-slate-600">
                      {a.country ?? articleCategoryLabel(a.category)}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        {articleCategoryLabel(a.category)}
                      </span>
                      {a.country && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                          {a.country}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
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
            {latestNotices.map((j, i) => {
              const left = daysLeft(j.deadline);
              const badge = left <= 0 ? "Closing today" : left === 1 ? "1 day left" : `${left} days left`;
              return (
                <Reveal key={j.id} delay={Math.min(i, 5) * 60} className="h-full">
                  <Link href={`/sarkari-jobs/${sarkariSlug(j)}`} className="gx-lift group block h-full rounded-2xl border border-slate-200 bg-white p-5">
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-900">{badge}</span>
                    <p className="mt-3 font-display text-[15px] font-bold leading-snug text-slate-900 group-hover:text-emerald-800">{j.postTitle}</p>
                    <p className="mt-1 text-sm text-slate-600">{j.organization}{j.location ? ` · ${j.location}` : ""}</p>
                    <p className="mt-3 text-xs font-semibold text-emerald-700">Full details →</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
