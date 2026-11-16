import Link from "next/link";
import { db } from "@/lib/db";
import { articleCategoryLabel, matchesSearch } from "@/lib/articles";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { SmallSearch } from "@/components/articles/SmallSearch";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Stories — Search Job News",
  description: "Search stories and job news from around the world by keyword, region or category.",
  robots: { index: false, follow: true },
};

/**
 * Stories — the search page, rebuilt clean in the same body as every other
 * section (eyebrow + heading + small search + cards). The old /search route
 * redirects here. Search is by keyword over the newest 200 articles, scoped
 * to the section it came from — each section searches its own content:
 * "jobs" = job categories only, "stories" = pop-music + tech-ai only,
 * "all" = everything, or a single category slug. The Stories tab itself
 * defaults to "stories", so its search finds stories, not job listings.
 */
function scopeLabel(scope: string): string {
  if (scope === "jobs") return "Jobs";
  if (scope === "stories") return "Stories";
  if (scope === "all") return "All stories";
  return articleCategoryLabel(scope);
}

const SCOPE_SUBTITLES: Record<string, string> = {
  all: "Search stories and job news from around the world.",
  jobs: "Search job news from around the world.",
  stories: "Search stories from around the world.",
  "tech-ai": "Search tech and AI news from around the world.",
  "pop-music": "Search pop music stories from around the world.",
};

const SCOPE_HINTS: Record<string, string> = {
  all: "stories and job news",
  jobs: "job news",
  stories: "stories",
  "tech-ai": "tech and AI news",
  "pop-music": "pop music stories",
};

const SCOPE_SUGGESTIONS: Record<string, string[]> = {
  stories: ["Taylor Swift", "AI", "Grammy"],
  "tech-ai": ["AI", "ChatGPT", "Gemini"],
  "pop-music": ["Taylor Swift", "Grammy", "Coachella"],
};
const DEFAULT_SUGGESTIONS = ["AI jobs", "Korea", "Gulf"];

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; scope?: string }>;
}) {
  const sp = await searchParams;
  const query = (sp.search ?? "").trim();
  // ?scope= wins; ?category= is the old filter param, kept for old links.
  const scope = sp.scope ?? (sp.category ? sp.category : "stories");
  const where =
    scope === "all"
      ? undefined
      : scope === "jobs"
        ? { category: { notIn: ["pop-music", "tech-ai"] } }
        : scope === "stories"
          ? { category: { in: ["pop-music", "tech-ai"] } }
          : { category: scope };

  const rows = await db.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: 200,
    select: {
      slug: true,
      category: true,
      country: true,
      titleEn: true,
      excerptEn: true,
      titleNe: true,
      excerptNe: true,
      publishedAt: true,
    },
  });
  const results = query ? rows.filter((a) => matchesSearch(a, query)) : [];
  const articles = results.map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));
  const subtitle = SCOPE_SUBTITLES[scope] ?? `Search ${articleCategoryLabel(scope)} jobs from around the world.`;
  const hint = SCOPE_HINTS[scope] ?? `${articleCategoryLabel(scope)} jobs`;
  const suggestions = SCOPE_SUGGESTIONS[scope] ?? DEFAULT_SUGGESTIONS;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Stories</p>
      <h1 className="gx-h2 mt-2">Stories</h1>
      <p className="gx-sub mt-2 max-w-2xl">{subtitle}</p>
      <div className="mt-5">
        <SmallSearch scope={scope} defaultValue={query} />
      </div>

      {query && (
        <p className="mt-8 text-sm text-slate-600">
          {results.length} matching {results.length === 1 ? "article" : "articles"} for <strong className="text-slate-900">“{query}”</strong>
          {scope !== "all" && <> in <strong className="text-slate-900">{scopeLabel(scope)}</strong></>}
        </p>
      )}

      {!query ? (
        <p className="mt-10 text-center text-sm text-slate-500">Type a keyword above to search {hint}.</p>
      ) : results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">No articles found for “{query}”</p>
          <p className="mt-2 text-sm text-slate-600">
            Try fewer or different words — e.g.{" "}
            {suggestions.map((s, i) => (
              <span key={s}>
                {i > 0 && (i === suggestions.length - 1 ? ", or " : ", ")}
                <Link href={`/stories?search=${encodeURIComponent(s)}&scope=${scope}`} className="font-semibold text-emerald-700 hover:underline">{s}</Link>
              </span>
            ))}
            .
          </p>
        </div>
      ) : (
        <ArticleCards
          articles={articles}
          categories={[]}
          basePath="/stories"
          allLabel="All"
          variant="list"
          active=""
          page={1}
          totalPages={1}
        />
      )}
    </div>
  );
}
