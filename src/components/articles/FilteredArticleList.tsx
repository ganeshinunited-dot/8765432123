"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { articleCategoryLabel } from "@/lib/articles";

export interface FilterableArticle {
  slug: string;
  category: string;
  country: string | null;
  titleEn: string;
  excerptEn: string;
  publishedAt: string;
  image?: string | null;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
}

/**
 * Category filter + article list, filtered client-side.
 * The server renders the full (cached) list once; switching categories only
 * re-filters in the browser — no server round-trip, and the page stays
 * ISR-cacheable (using searchParams on the server would force dynamic
 * rendering and kill the cache).
 */
function FilteredListInner({
  articles,
  categories,
  basePath,
  allLabel,
  variant,
}: {
  articles: FilterableArticle[];
  categories: readonly { slug: string; label: string }[];
  basePath: string;
  allLabel: string;
  variant: "grid" | "list";
}) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "";
  const filtered = active ? articles.filter((a) => a.category === active) : articles;

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={basePath}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            !active ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
          }`}
        >
          {allLabel}
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`${basePath}?category=${c.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === c.slug ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">New articles are on the way</p>
          <p className="mt-2 text-sm text-slate-600">We publish fresh job news every morning — check back soon.</p>
        </div>
      ) : variant === "grid" ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
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
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{a.country}</span>
                )}
              </div>
              <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-emerald-700">{a.titleEn}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{a.excerptEn}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">{formatDate(a.publishedAt)}</span>
                <span className="text-sm font-semibold text-emerald-700 group-hover:underline">
                  Read article <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {filtered.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="gx-lift group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              {a.image ? (
                <img src={a.image} alt="" loading="lazy" className="hidden h-20 w-24 shrink-0 rounded-xl object-cover sm:block" />
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
          ))}
        </div>
      )}
    </>
  );
}

export function FilteredArticleList(props: {
  articles: FilterableArticle[];
  categories: readonly { slug: string; label: string }[];
  basePath: string;
  allLabel: string;
  variant: "grid" | "list";
}) {
  return (
    <Suspense>
      <FilteredListInner {...props} />
    </Suspense>
  );
}
