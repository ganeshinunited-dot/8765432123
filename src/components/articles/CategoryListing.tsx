import { db } from "@/lib/db";
import { ArticleCards } from "@/components/articles/ArticleCards";

const PAGE_SIZE = 20;

type SearchParams = Promise<{ page?: string | string[] }>;

function firstParam(params: string | string[] | undefined): string {
  return Array.isArray(params) ? params[0] ?? "" : params ?? "";
}

/**
 * Shared listing for the clean category pages (/nepal, /gulf, /popmusic ...).
 * The route fixes the category, so the filter row shows only that category;
 * pagination reads ?page= like the /articles page.
 */
export default async function CategoryListing({
  slug,
  label,
  subtitle,
  searchParams,
}: {
  slug: string;
  label: string;
  subtitle: string;
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const requestedPage = parseInt(firstParam(params.page), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const total = await db.article.count({ where: { category: slug } });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = await db.article.findMany({
    where: { category: slug },
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
      <ArticleCards
        articles={articles}
        categories={[{ slug, label }]}
        basePath={`/${slug}`}
        allLabel="All"
        variant="grid"
        active={slug}
        page={safePage}
        totalPages={totalPages}
      />
    </div>
  );
}
