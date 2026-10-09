import Link from "next/link";
import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES, articleCategoryLabel } from "@/lib/articles";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Job News & Articles — English and Nepali | Growentix",
  description:
    "Daily job news from Nepal and around the world — hiring trends, Gulf jobs, Korea & Japan opportunities, remote work and career guides, in English and Nepali.",
  alternates: { canonical: "https://growentix.cloud/articles" },
};

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const active = sp.category ?? "";

  const articles = await db.article.findMany({
    where: active ? { category: active } : undefined,
    orderBy: { publishedAt: "desc" },
    take: 60,
    select: {
      slug: true,
      category: true,
      country: true,
      titleEn: true,
      excerptEn: true,
      publishedAt: true,
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Daily job news</p>
      <h1 className="gx-h2 mt-2">Articles</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        Fresh job stories from Nepal and around the world — every article in English and Nepali.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/articles"
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            !active
              ? "bg-emerald-600 text-white"
              : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
          }`}
        >
          All
        </Link>
        {ARTICLE_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/articles?category=${c.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === c.slug
                ? "bg-emerald-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">New articles are on the way</p>
          <p className="mt-2 text-sm text-slate-600">
            We publish fresh job news every morning — check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="gx-lift group flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {articleCategoryLabel(a.category)}
                </span>
                {a.country && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {a.country}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-emerald-700">
                {a.titleEn}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{a.excerptEn}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">{formatDate(a.publishedAt)}</span>
                <span className="text-sm font-semibold text-emerald-700 group-hover:underline">
                  Read in English + नेपाली <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
