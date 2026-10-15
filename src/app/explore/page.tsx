import Link from "next/link";
import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES, INTERNATIONAL_CATEGORIES, articleCategoryLabel } from "@/lib/articles";
import { articleImagesFor } from "@/data/articleImages";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  if (sp.category) {
    return { robots: { index: false, follow: true } };
  }
  return {
    title: "Explore International Jobs — Big Companies, Big Countries",
    description:
      "Job news from big companies in big countries — USA, UK, Canada, Australia, Europe, Asia, Gulf, Korea & Japan, remote work and work abroad.",
    alternates: { canonical: "https://growentix.cloud/explore" },
  };
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

const REGIONS = ARTICLE_CATEGORIES.filter((c) => (INTERNATIONAL_CATEGORIES as readonly string[]).includes(c.slug));

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const active = sp.category ?? "";
  const allowed = active ? [active] : [...INTERNATIONAL_CATEGORIES];

  const articles = await db.article.findMany({
    where: { category: { in: allowed } },
    orderBy: { publishedAt: "desc" },
    take: 60,
    select: { slug: true, category: true, country: true, titleEn: true, excerptEn: true, publishedAt: true },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">International</p>
      <h1 className="gx-h2 mt-2">Explore International Jobs</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        Job news from big companies in big countries — USA, UK, Canada, Australia, Europe, Asia, Gulf, Korea &amp; Japan, remote work and work abroad.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/explore"
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${!active ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"}`}
        >
          All International
        </Link>
        {REGIONS.map((c) => (
          <Link
            key={c.slug}
            href={`/explore?category=${c.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${active === c.slug ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"}`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">New international news is on the way</p>
          <p className="mt-2 text-sm text-slate-600">We publish fresh job news from around the world every morning — check back soon.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {articles.map((a) => {
            const images = articleImagesFor(a.slug);
            return (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="gx-lift group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                {images ? (
                  <img src={images[0]} alt="" loading="lazy" className="hidden h-20 w-24 shrink-0 rounded-xl object-cover sm:block" />
                ) : (
                  <span className="hidden h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-display text-2xl font-extrabold text-emerald-700 sm:flex">
                    {articleCategoryLabel(a.category).charAt(0)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-[15px] font-bold leading-snug text-slate-900 group-hover:text-emerald-800 sm:text-base">{a.titleEn}</p>
                    <span className="shrink-0 text-xs text-slate-500">{formatDate(a.publishedAt)}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-slate-600">{a.country ?? articleCategoryLabel(a.category)}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{articleCategoryLabel(a.category)}</span>
                    {a.country && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{a.country}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
