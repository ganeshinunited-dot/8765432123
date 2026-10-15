import Link from "next/link";
import type { CSSProperties } from "react";
import { db } from "@/lib/db";
import { Reveal } from "@/components/ui/Reveal";
import { SARKARI_JOBS, sarkariSlug } from "@/data/sarkariJobs";
import { articleCategoryLabel } from "@/lib/articles";

export const revalidate = 60;

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

export default async function HomePage() {
  const articles = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 6,
    select: { slug: true, category: true, titleEn: true, excerptEn: true, publishedAt: true },
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
      {/* Hero — slim: headline, one line, category chips */}
      <section className="relative overflow-hidden bg-emerald-950">
        <div aria-hidden className="gx-glow absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_0%,rgba(232,50,31,0.28),transparent_70%)]" />
        <div aria-hidden className="gx-glow absolute inset-0 bg-[radial-gradient(40%_35%_at_85%_100%,rgba(192,192,192,0.14),transparent_70%)]" style={{ animationDelay: "-4.5s" }} />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-20">
          <h1 className="gx-enter max-w-3xl font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl" style={{ "--gx-delay": "120ms" } as CSSProperties}>
            Never miss <span className="text-emerald-300">an opportunity.</span>
          </h1>
          <p className="gx-enter mt-5 max-w-xl text-base leading-relaxed text-emerald-100/90 sm:text-lg" style={{ "--gx-delay": "200ms" } as CSSProperties}>
            Vacancy notices, work-abroad updates and daily job news — tracked for you.
          </p>
          <div className="gx-enter mt-6 flex flex-wrap gap-2" style={{ "--gx-delay": "280ms" } as CSSProperties}>
            {[["Sarkari Jobs", "/sarkari-jobs"], ["Gulf Jobs", "/articles?category=gulf"], ["Korea & Japan", "/articles?category=korea-japan"], ["Remote Work", "/articles?category=remote"], ["Work Abroad", "/articles?category=work-abroad"]].map(([t, href]) => (
              <Link key={t} href={href} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-50 backdrop-blur-sm transition hover:bg-white/20">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest news — newest articles */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="gx-eyebrow">Daily job news</span>
            <h2 className="gx-h2">Latest news</h2>
          </div>
          <Link href="/articles" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-800">All articles →</Link>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={Math.min(i, 5) * 60} className="h-full">
              <Link href={`/articles/${a.slug}`} className="gx-lift group block h-full rounded-2xl border border-slate-200 bg-white p-5">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-800">{articleCategoryLabel(a.category)}</span>
                <p className="mt-3 font-display text-[15px] font-bold leading-snug text-slate-900 group-hover:text-emerald-800">{a.titleEn}</p>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">{a.excerptEn}</p>
                <p className="mt-3 text-xs font-semibold text-slate-500">{formatDate(a.publishedAt)}</p>
              </Link>
            </Reveal>
          ))}
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

      {/* Beyond Nepal — international opportunities */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <span className="gx-eyebrow">Beyond Nepal</span>
        <h2 className="gx-h2">Work abroad, tracked daily</h2>
        <p className="gx-sub">Gulf demand, Korea &amp; Japan pipelines, remote roles — news and guides in English and Nepali.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Gulf Jobs", "gulf", "Qatar, UAE, Saudi & more — salary, visa and demand updates."],
            ["Korea & Japan", "korea-japan", "EPS-TOPIK, SSW and training pipelines explained."],
            ["Remote Work", "remote", "Worldwide remote roles you can do from Nepal."],
            ["Work Abroad", "work-abroad", "G2G recruitments, documents and pre-departure guides."],
          ].map(([t, slug, d], i) => (
            <Reveal key={slug} delay={i * 70} className="h-full">
              <Link href={`/articles?category=${slug}`} className="gx-lift group block h-full rounded-2xl border border-slate-200 bg-white p-5">
                <p className="font-display text-[15px] font-bold text-slate-900 group-hover:text-emerald-800">{t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d}</p>
                <p className="mt-3 text-xs font-semibold text-emerald-700">Read latest →</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
