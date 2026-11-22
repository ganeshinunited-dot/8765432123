import Link from "next/link";
import { articleCategoryLabel } from "@/lib/articles";
import { CategoryPills } from "@/components/articles/CategoryPills";
import { VERDICT_STYLES } from "@/lib/factCheck";

export interface FilterableArticle {
  slug: string;
  category: string;
  country: string | null;
  titleEn: string;
  excerptEn: string;
  publishedAt: string;
  /** Fact Check verdict (2026-11-22) — only ever set on fact-check rows;
   *  other sections never pass it, so their cards render exactly as before. */
  factCheckVerdict?: string | null;
}

// Hub list verdict pill — reads the one verdict-colour map in
// src/lib/factCheck.ts (TRUE green, MOSTLY_TRUE lighter green, MISLEADING
// yellow, FALSE red, UNVERIFIED grey).
function verdictPillClass(verdict: string): string {
  return VERDICT_STYLES[verdict as keyof typeof VERDICT_STYLES]?.pill ?? "bg-slate-500 text-white";
}

function verdictLabel(verdict: string): string {
  switch (verdict) {
    case "TRUE":
      return "True";
    case "MOSTLY_TRUE":
      return "Mostly true";
    case "MISLEADING":
      return "Misleading";
    case "FALSE":
      return "False";
    default:
      return "Unverified";
  }
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
}

/** Builds a listing URL that preserves the active category filter and, when > 1, the page number. preserveParams carries any extra filter the page adds (e.g. News ?country=, Tech ?topic=) so paging never drops it. */
function listingHref(
  basePath: string,
  active: string,
  page: number,
  preserveParams: ReadonlyArray<{ key: string; value: string }> = []
): string {
  const params = new URLSearchParams();
  for (const p of preserveParams) if (p.value) params.set(p.key, p.value);
  if (active) params.set("category", active);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

/**
 * Server-rendered category filter + article list. The filter row is the
 * shared <CategoryPills> — one horizontally scrollable row, same pills in
 * every section — so the row here, on Explore and on the section pages all
 * behave the same.
 *
 * Replaces the previous client-side FilteredArticleList for the /articles and
 * /explore pages: the card list is rendered on the server, so every article
 * link exists in the raw HTML for crawlers to discover without executing
 * JavaScript. Category filtering and pagination happen on the server from
 * the ?category= and ?page= parameters, which makes these routes dynamic
 * (no ISR cache) — an acceptable trade at this traffic level for real link
 * discovery. Pages are 20 cards each; older pages are linked from the
 * pagination nav below, and every article stays in the sitemap, so
 * discovery does not regress. Filtered and paged views canonicalise to the
 * base path and are noindex, follow (see generateMetadata in each page).
 */
export function ArticleCards({
  articles,
  categories,
  basePath,
  allLabel,
  variant,
  active,
  page = 1,
  totalPages = 1,
  preserveParams = [],
}: {
  articles: FilterableArticle[];
  categories: readonly { slug: string; label: string }[];
  basePath: string;
  allLabel: string;
  variant: "grid" | "list";
  active: string;
  page?: number;
  totalPages?: number;
  /** Extra query params a page-level filter adds (?country=, ?topic=) — kept on every link so paging never drops the filter. */
  preserveParams?: ReadonlyArray<{ key: string; value: string }>;
}) {
  const filtered = active ? articles.filter((a) => a.category === active) : articles;

  return (
    <>
      {categories.length > 0 && (
        <CategoryPills
          ariaLabel="Filter articles by category"
          pills={[
            { label: allLabel, href: listingHref(basePath, "", 1, preserveParams), active: !active },
            ...categories.map((c) => ({
              label: c.label,
              href: listingHref(basePath, c.slug, 1, preserveParams),
              active: active === c.slug,
            })),
          ]}
        />
      )}

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
                {a.factCheckVerdict && (
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${verdictPillClass(a.factCheckVerdict)}`}>
                    {verdictLabel(a.factCheckVerdict)}
                  </span>
                )}
                {a.country && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{a.country}</span>
                )}
              </div>
              <h2 className="mt-3 font-sans text-lg font-bold leading-snug text-slate-900 group-hover:text-emerald-700">{a.titleEn}</h2>
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
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-sans text-[15px] font-bold leading-snug text-slate-900 group-hover:text-emerald-800 sm:text-base">{a.titleEn}</p>
                  <span className="shrink-0 text-xs text-slate-500">{formatDate(a.publishedAt)}</span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-600">{a.country ?? articleCategoryLabel(a.category)}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{articleCategoryLabel(a.category)}</span>
                  {a.factCheckVerdict && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${verdictPillClass(a.factCheckVerdict)}`}>
                      {verdictLabel(a.factCheckVerdict)}
                    </span>
                  )}
                  {a.country && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{a.country}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="More articles" className="mt-10 flex items-center justify-center gap-3">
          {page > 1 ? (
            <Link
              href={listingHref(basePath, active, page - 1, preserveParams)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-emerald-300"
            >
              &larr; Newer
            </Link>
          ) : (
            <span aria-disabled="true" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-400">
              &larr; Newer
            </span>
          )}
          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={listingHref(basePath, active, page + 1, preserveParams)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-emerald-300"
            >
              Older &rarr;
            </Link>
          ) : (
            <span aria-disabled="true" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-400">
              Older &rarr;
            </span>
          )}
        </nav>
      )}
    </>
  );
}
