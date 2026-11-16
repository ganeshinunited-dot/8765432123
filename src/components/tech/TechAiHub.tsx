import { db } from "@/lib/db";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { SmallSearch } from "@/components/articles/SmallSearch";

const PAGE_SIZE = 20;

type SearchParams = Promise<{ page?: string | string[] }>;

function firstParam(params: string | string[] | undefined): string {
  return Array.isArray(params) ? params[0] ?? "" : params ?? "";
}

/**
 * Tech & AI hub — same body as every other section (eyebrow + heading +
 * small search + article grid + pager) so all tabs feel identical.
 * Holds ONLY articles published with category "tech-ai", so the section
 * never mixes with Jobs: tech news lives here, tech jobs live in Jobs.
 * Server-rendered so Google indexes real article links, not an empty shell.
 */
export default async function TechAiHub({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedPage = parseInt(firstParam(params.page), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const where = { category: "tech-ai" };
  const total = await db.article.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = await db.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    skip: (safePage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: { slug: true, titleEn: true, excerptEn: true, publishedAt: true, category: true, country: true },
  });
  const articles = rows.map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Tech &amp; AI</p>
      <h1 className="gx-h2 mt-2">Tech &amp; AI</h1>
      <p className="gx-sub mt-2 max-w-2xl">Tech and AI news — new models, launches, outages and the companies behind them, with the newest stories first.</p>
      <div className="mt-5">
        <SmallSearch />
      </div>
      <ArticleCards
        articles={articles}
        categories={[]}
        basePath="/tech-ai"
        allLabel="All"
        variant="grid"
        active=""
        page={safePage}
        totalPages={totalPages}
      />
    </div>
  );
}
