import { db } from "@/lib/db";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { SmallSearch } from "@/components/articles/SmallSearch";

/** Word-boundary match so "IT" never matches "with" and "app" never matches "apple". */
const TECH_PATTERN =
  /\b(ai|artificial intelligence|tech|technology|software|developer|programmer|programming|coding|machine learning|robot|semiconductor|chip|cloud|cyber|startup|digital|data|automation)\b/i;

const PAGE_SIZE = 20;

type SearchParams = Promise<{ page?: string | string[] }>;

function firstParam(params: string | string[] | undefined): string {
  return Array.isArray(params) ? params[0] ?? "" : params ?? "";
}

/**
 * Tech & AI hub — same body as every other section (eyebrow + heading +
 * small search + article grid + pager) so all tabs feel identical.
 * Server-rendered so Google indexes real article links, not an empty shell.
 * Lists recent articles whose title or excerpt matches tech/AI keywords,
 * newest first, paginated 20 per page from the newest 200 rows.
 */
export default async function TechAiHub({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedPage = parseInt(firstParam(params.page), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const recent = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 200,
    select: { slug: true, titleEn: true, excerptEn: true, publishedAt: true, category: true, country: true },
  });
  const matched = recent.filter(
    (a) =>
      a.category !== "pop-music" &&
      (TECH_PATTERN.test(a.titleEn) || TECH_PATTERN.test(a.excerptEn))
  );
  const totalPages = Math.max(1, Math.ceil(matched.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const articles = matched
    .slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
    .map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Tech &amp; AI</p>
      <h1 className="gx-h2 mt-2">Tech &amp; AI</h1>
      <p className="gx-sub mt-2 max-w-2xl">Tech and AI job news — hiring, skills and remote tech roles from around the world, with the newest stories first.</p>
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
