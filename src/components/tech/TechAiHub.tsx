import { db } from "@/lib/db";
import { techTopicForArticle } from "@/lib/articles";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { CategoryPills } from "@/components/articles/CategoryPills";
import { SmallSearch } from "@/components/articles/SmallSearch";

const PAGE_SIZE = 20;

type SearchParams = Promise<{ page?: string | string[]; topic?: string | string[] }>;

function firstParam(params: string | string[] | undefined): string {
  return Array.isArray(params) ? params[0] ?? "" : params ?? "";
}

/**
 * Tech & AI hub — same body as every other section (eyebrow + heading +
 * small search + article grid + pager) so all tabs feel identical.
 * Holds ONLY articles published with category "tech-ai", so the section
 * never mixes with Jobs: tech news lives here, tech jobs live in Jobs.
 * Server-rendered so Google indexes real article links, not an empty shell.
 * The pill row filters by company/topic (?topic=), derived from each
 * article's slug — see techTopicForArticle in @/lib/articles. Topics come
 * from every tech article, not just the current page, most-covered first;
 * anything with no known company falls under "Other", never dropped.
 */
export default async function TechAiHub({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedPage = parseInt(firstParam(params.page), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  // Topics for the pill row — light slug+title query over the whole
  // section, so a topic with articles only on a later page still gets a pill.
  const allTech = await db.article.findMany({
    where: { category: "tech-ai" },
    select: { slug: true, titleEn: true },
  });
  const topicGroups = new Map<string, string[]>();
  for (const a of allTech) {
    const topic = techTopicForArticle(a.slug, a.titleEn);
    const slugs = topicGroups.get(topic) ?? [];
    slugs.push(a.slug);
    topicGroups.set(topic, slugs);
  }
  const topics = [...topicGroups.entries()]
    .map(([topic, slugs]) => ({ topic, count: slugs.length, slugs }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
  const requestedTopic = firstParam(params.topic);
  const activeTopic = topics.some((t) => t.topic === requestedTopic) ? requestedTopic : "";
  const activeSlugs = activeTopic ? topics.find((t) => t.topic === activeTopic)?.slugs ?? [] : [];

  const where = activeTopic ? { category: "tech-ai", slug: { in: activeSlugs } } : { category: "tech-ai" };
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
        <SmallSearch scope="tech-ai" />
      </div>
      {topics.length > 0 && (
        <CategoryPills
          ariaLabel="Filter tech news by company"
          pills={[
            { label: "All", href: "/tech-ai", active: !activeTopic },
            ...topics.map((t) => ({
              label: t.topic,
              href: `/tech-ai?topic=${encodeURIComponent(t.topic)}`,
              active: activeTopic === t.topic,
            })),
          ]}
        />
      )}
      <ArticleCards
        articles={articles}
        categories={[]}
        basePath="/tech-ai"
        allLabel="All"
        variant="grid"
        active=""
        page={safePage}
        totalPages={totalPages}
        preserveParams={activeTopic ? [{ key: "topic", value: activeTopic }] : []}
      />
    </div>
  );
}
