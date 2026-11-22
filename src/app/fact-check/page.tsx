import Link from "next/link";
import { db } from "@/lib/db";
import { articleCategoryLabel, matchesSearch } from "@/lib/articles";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { CategoryPills } from "@/components/articles/CategoryPills";
import { SmallSearch } from "@/components/articles/SmallSearch";
import { FactCheckChecker } from "@/components/articles/FactCheckChecker";
import { FACT_CHECK_VERDICTS, VERDICT_LABELS } from "@/lib/factCheck";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fact Check — Growentix",
  description:
    "Viral claims, checked against primary sources. Check a claim against our verified verdicts, or send it to our editors.",
};

/**
 * Fact Check hub at /fact-check (moved from /stories 2026-11-22, owner
 * order). /stories 301s here (next.config.ts).
 *
 * TWO modes, split on ?search=:
 *  1. With a query (?search=...&scope=...): the search page, EXACTLY as
 *     before — search by keyword over the newest 200 articles, scoped to
 *     the section it came from: "jobs" = job categories only, "stories" =
 *     pop-music + tech-ai only, "all" = everything, or a single category
 *     slug. Every section's SmallSearch still submits here.
 *  2. With NO query: the Fact Check engine — a single "Check a claim"
 *     box (paste claim text OR a link; links are opened server-side and
 *     checked like any other claim) above the published verdicts list,
 *     filterable by verdict (?verdict=) and paginated (20/page). The
 *     "stories" scope keeps meaning pop-music + tech-ai for search;
 *     fact-check articles live under category "fact-check".
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
  news: "Search news stories from around the world.",
};

const SCOPE_HINTS: Record<string, string> = {
  all: "stories and job news",
  jobs: "job news",
  stories: "stories",
  "tech-ai": "tech and AI news",
  "pop-music": "pop music stories",
  news: "news stories",
};

const SCOPE_SUGGESTIONS: Record<string, string[]> = {
  stories: ["Taylor Swift", "AI", "Grammy"],
  "tech-ai": ["AI", "ChatGPT", "Gemini"],
  "pop-music": ["Taylor Swift", "Grammy", "Coachella"],
  news: ["Nepal", "World", "Politics"],
};
const DEFAULT_SUGGESTIONS = ["AI jobs", "Korea", "Gulf"];

const PAGE_SIZE = 20;

function firstParam(v: string | string[] | undefined): string {
  return Array.isArray(v) ? v[0] ?? "" : v ?? "";
}

export default async function FactCheckPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    scope?: string;
    verdict?: string;
    page?: string | string[];
  }>;
}) {
  const sp = await searchParams;
  const query = (sp.search ?? "").trim();

  // ---- Search mode: unchanged behaviour (see the header comment) ----
  if (query) {
    // ?scope= wins; ?category= is the old filter param, kept for old links.
    const scope = sp.scope ?? (sp.category ? sp.category : "stories");
    const where =
      scope === "all"
        ? undefined
        : scope === "jobs"
          ? { category: { notIn: ["pop-music", "tech-ai", "news", "fact-check"] } }
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
    const results = rows.filter((a) => matchesSearch(a, query));
    const articles = results.map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));
    const subtitle = SCOPE_SUBTITLES[scope] ?? `Search ${articleCategoryLabel(scope)} jobs from around the world.`;
    const hint = SCOPE_HINTS[scope] ?? `${articleCategoryLabel(scope)} jobs`;
    const suggestions = SCOPE_SUGGESTIONS[scope] ?? DEFAULT_SUGGESTIONS;

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="gx-eyebrow">Fact Check</p>
        <h1 className="gx-h2 mt-2">Search</h1>
        <p className="gx-sub mt-2 max-w-2xl">{subtitle}</p>
        <div className="mt-5">
          <SmallSearch scope={scope} defaultValue={query} />
        </div>

        <p className="mt-8 text-sm text-slate-600">
          {results.length} matching {results.length === 1 ? "article" : "articles"} for{" "}
          <strong className="text-slate-900">&ldquo;{query}&rdquo;</strong>
          {scope !== "all" && (
            <>
              {" "}
              in <strong className="text-slate-900">{scopeLabel(scope)}</strong>
            </>
          )}
        </p>

        {results.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">No articles found for &ldquo;{query}&rdquo;</p>
            <p className="mt-2 text-sm text-slate-600">
              Try fewer or different words — e.g.{" "}
              {suggestions.map((s, i) => (
                <span key={s}>
                  {i > 0 && (i === suggestions.length - 1 ? ", or " : ", ")}
                  <Link
                    href={`/fact-check?search=${encodeURIComponent(s)}&scope=${scope}`}
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    {s}
                  </Link>
                </span>
              ))}
              .
            </p>
          </div>
        ) : (
          <ArticleCards
            articles={articles}
            categories={[]}
            basePath="/fact-check"
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

  // ---- Fact Check hub mode (no query) ----
  const requestedVerdict = firstParam(sp.verdict);
  const activeVerdict = (FACT_CHECK_VERDICTS as readonly string[]).includes(requestedVerdict)
    ? requestedVerdict
    : "";
  const requestedPage = parseInt(firstParam(sp.page), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const counts = await db.article.groupBy({
    by: ["factCheckVerdict"],
    where: { category: "fact-check" },
    _count: { _all: true },
  });
  const countByVerdict = new Map<string, number>();
  let totalAll = 0;
  for (const c of counts) {
    if (!c.factCheckVerdict) continue;
    countByVerdict.set(c.factCheckVerdict, c._count._all);
    totalAll += c._count._all;
  }

  const where = activeVerdict ? { category: "fact-check", factCheckVerdict: activeVerdict } : { category: "fact-check" };
  const total = activeVerdict ? countByVerdict.get(activeVerdict) ?? 0 : totalAll;
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
      factCheckVerdict: true,
    },
  });
  const articles = rows.map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));
  const verdictHref = (v: string) => (v ? `/fact-check?verdict=${v}` : "/fact-check");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Fact Check</p>
      <h1 className="gx-h2 mt-2">Fact Check</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        Viral claims, checked against primary sources. Every verdict names its evidence — and what is
        still unknown.
      </p>

      <FactCheckChecker />

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-base font-semibold text-slate-900">How we check</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          We trace each claim to its original source and check it against primary documents, official
          statements and the organisations involved — then publish the verdict with the evidence and a
          confidence score. If new evidence emerges, we update the verdict and say what changed. Claims
          we cannot verify are marked Unverified, never guessed. Our method is in the{" "}
          <Link href="/verification-policy" className="font-medium text-emerald-700 hover:underline">
            Verification Policy
          </Link>
          .
        </p>
      </div>

      <h2 className="gx-h2 mt-10">Published verdicts</h2>
      <CategoryPills
        ariaLabel="Filter fact-checks by verdict"
        pills={[
          { label: `All (${totalAll})`, href: verdictHref(""), active: !activeVerdict },
          ...FACT_CHECK_VERDICTS.map((v) => ({
            label: `${VERDICT_LABELS[v]} (${countByVerdict.get(v) ?? 0})`,
            href: verdictHref(v),
            active: activeVerdict === v,
          })),
        ]}
      />

      {total === 0 ? (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">No verdicts here yet</p>
          <p className="mt-2 text-sm text-slate-600">
            {activeVerdict
              ? `No claims rated ${VERDICT_LABELS[activeVerdict as keyof typeof VERDICT_LABELS]} yet — try another verdict.`
              : "Our editors are working on the first checks — send a claim above and we will look into it."}
          </p>
        </div>
      ) : (
        <ArticleCards
          articles={articles}
          categories={[]}
          basePath="/fact-check"
          allLabel="All"
          variant="list"
          active=""
          page={safePage}
          totalPages={totalPages}
          preserveParams={activeVerdict ? [{ key: "verdict", value: activeVerdict }] : []}
        />
      )}
    </div>
  );
}