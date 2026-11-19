import { db } from "@/lib/db";
import type { ReactNode } from "react";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { CategoryPills } from "@/components/articles/CategoryPills";
import { SmallSearch } from "@/components/articles/SmallSearch";

const PAGE_SIZE = 20;

type SearchParams = Promise<{ page?: string | string[]; country?: string | string[] }>;

function firstParam(params: string | string[] | undefined): string {
  return Array.isArray(params) ? params[0] ?? "" : params ?? "";
}

/**
 * Shared listing for the clean category pages (/nepal, /gulf, /popmusic ...).
 * The route fixes the category, so the filter row shows only that category;
 * pagination reads ?page= like the /articles page. basePath is the route's
 * own URL when it differs from the slug (e.g. /articles serves "news").
 * With showCountryPills (News only), a second pill row lists the countries
 * the section's articles come from (?country=), built from every article in
 * the section — not just the current page — most-covered country first.
 */
export default async function CategoryListing({
  slug,
  label,
  subtitle,
  basePath,
  searchParams,
  showCountryPills = false,
  // Optional guidance panel (country pages, GEO Step 6) — rendered
  // between the subtitle and the search box, page 1 only, so paginated
  // pages never repeat it.
  intro,
}: {
  slug: string;
  label: string;
  subtitle: string;
  basePath?: string;
  searchParams: SearchParams;
  showCountryPills?: boolean;
  intro?: ReactNode;
}) {
  const params = await searchParams;
  const requestedPage = parseInt(firstParam(params.page), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const listingBase = basePath ?? `/${slug}`;

  // Countries for the pill row — every article in this section, so a
  // country with articles only on a later page still gets a pill.
  let countries: { country: string; count: number }[] = [];
  if (showCountryPills) {
    const grouped = await db.article.groupBy({
      by: ["country"],
      where: { category: slug },
      _count: { _all: true },
    });
    countries = grouped
      .filter((g) => g.country)
      .map((g) => ({ country: g.country as string, count: g._count._all }))
      .sort((a, b) => b.count - a.count || a.country.localeCompare(b.country));
  }
  const requestedCountry = firstParam(params.country);
  const activeCountry = countries.some((c) => c.country === requestedCountry) ? requestedCountry : "";

  const where = { category: slug, ...(activeCountry ? { country: activeCountry } : {}) };
  const total = await db.article.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = await db.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    skip: (safePage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      slug: true,
      category: true,
      country: true,
      titleEn: true,
      excerptEn: true,
      publishedAt: true,
    },
  });
  const articles = rows.map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">{label}</p>
      <h1 className="gx-h2 mt-2">{label}</h1>
      <p className="gx-sub mt-2 max-w-2xl">{subtitle}</p>
      {intro && safePage === 1 ? intro : null}
      <div className="mt-5">
        <SmallSearch scope={slug} />
      </div>
      {showCountryPills && countries.length > 0 && (
        <CategoryPills
          ariaLabel="Filter news by country"
          pills={[
            { label: "All", href: listingBase, active: !activeCountry },
            ...countries.map((c) => ({
              label: c.country,
              href: `${listingBase}?country=${encodeURIComponent(c.country)}`,
              active: activeCountry === c.country,
            })),
          ]}
        />
      )}
      <ArticleCards
        articles={articles}
        categories={[]}
        basePath={listingBase}
        allLabel="All"
        variant="grid"
        active={slug}
        page={safePage}
        totalPages={totalPages}
        preserveParams={activeCountry ? [{ key: "country", value: activeCountry }] : []}
      />
    </div>
  );
}
