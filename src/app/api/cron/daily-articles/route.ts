import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { articleSlug, titlesAreDuplicates } from "@/lib/articles";
import {
  parseRss,
  fetchPageText,
  writeArticle,
  VALID_CATEGORIES,
  type RssItem,
  type ArticleJson,
} from "@/lib/articleWriter";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ---------------------------------------------------------------------------
// Daily bilingual job-news publisher.
// Triggered by Vercel Cron every morning. Researches real job news via
// Google News RSS, writes each story in English + Nepali with the AI,
// and stores it in the Article table. No fake content: every article
// carries its real source links and only uses facts from the material.
// ---------------------------------------------------------------------------

const TARGET_COUNT = 8;
const MAX_PER_CATEGORY = 2;

const QUERIES: { q: string; category: string; country: string | null }[] = [
  { q: "jobs hiring Nepal", category: "nepal", country: "Nepal" },
  { q: "Gulf jobs vacancy hiring", category: "gulf", country: "Gulf" },
  { q: "Korea EPS workers Nepal", category: "korea-japan", country: "South Korea" },
  { q: "Japan work visa jobs foreigners", category: "korea-japan", country: "Japan" },
  { q: "USA jobs hiring visa sponsorship", category: "usa", country: "United States" },
  { q: "USA remote jobs hiring entry level", category: "usa", country: "United States" },
  { q: "USA seasonal hiring jobs 2026", category: "usa", country: "United States" },
  { q: "UK jobs hiring visa sponsorship", category: "uk", country: "United Kingdom" },
  { q: "Canada jobs hiring foreign workers", category: "canada", country: "Canada" },
  { q: "Australia jobs hiring skilled visa", category: "australia", country: "Australia" },
  { q: "Europe jobs hiring Germany France", category: "europe", country: "Europe" },
  { q: "Singapore Malaysia jobs hiring foreigners", category: "asia", country: "Asia" },
  { q: "remote jobs hiring work from home", category: "remote", country: null },
  { q: "layoffs hiring trends 2026", category: "global", country: null },
  { q: "artificial intelligence jobs hiring", category: "global", country: null },
  { q: "work abroad visa opportunities", category: "work-abroad", country: null },
  { q: "career advice salary interview tips", category: "career", country: null },
];

// Rotate query order by day-of-year so every country gets first-pick priority
// on some days — with 8 slots/day and first-come picking, a fixed order would
// starve the later countries forever.
function rotatedQueries(): typeof QUERIES {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const offset = dayOfYear % QUERIES.length;
  return [...QUERIES.slice(offset), ...QUERIES.slice(0, offset)];
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.AI_API_KEY) {
    return NextResponse.json({ error: "AI not configured" }, { status: 500 });
  }

  // 1. Research: fetch Google News RSS for each query in parallel.
  // Queries are day-rotated so every country gets priority on some days.
  const rssResults = await Promise.allSettled(
    rotatedQueries().map(async (q) => {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
        q.q
      )}&hl=en&gl=NP&ceid=NP:en`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; GrowentixBot/1.0)" },
        signal: AbortSignal.timeout(15_000),
      });
      if (!res.ok) return [] as RssItem[];
      return parseRss(await res.text(), q.category, q.country);
    })
  );
  const allItems = rssResults.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  // 2. Dedupe against already-published source links AND titles.
  // Link-only dedupe let the same story through from different outlets
  // (Korea EPS 7,200 published 3x: 9, 10, 15 Oct). Freshness guard: skip
  // RSS items whose source date is over 14 days old.
  const FRESHNESS_MS = 14 * 24 * 60 * 60 * 1000;
  const existing = await db.article.findMany({
    select: { sources: true, titleEn: true },
    orderBy: { publishedAt: "desc" },
    take: 400,
  });
  const seenLinks = new Set(existing.flatMap((e) => e.sources));
  const seenTitles = existing.map((e) => e.titleEn.toLowerCase());
  const seenInBatch = new Set<string>();
  const perCategory = new Map<string, number>();
  const picked: RssItem[] = [];
  for (const item of allItems) {
    if (picked.length >= TARGET_COUNT) break;
    if (!item.link || seenLinks.has(item.link) || seenInBatch.has(item.link))
      continue;
    const pubMs = Date.parse(item.pubDate);
    if (!Number.isNaN(pubMs) && Date.now() - pubMs > FRESHNESS_MS) continue;
    if (seenTitles.some((t) => titlesAreDuplicates(item.title, t))) continue;
    const n = perCategory.get(item.category) ?? 0;
    if (n >= MAX_PER_CATEGORY) continue;
    seenInBatch.add(item.link);
    perCategory.set(item.category, n + 1);
    picked.push(item);
  }

  // 3. Ground each story: fetch the article page text (parallel).
  const pageTexts = await Promise.all(picked.map((p) => fetchPageText(p.link)));

  // 4. Write: one AI call per story, English + Nepali together (parallel).
  // Guides + roundup live in /api/cron/weekly-content (own 60s budget).
  const written = await Promise.allSettled([
    ...picked.map((item, i) => writeArticle(item, pageTexts[i])),
  ]);

  // 5. Publish.
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  let published = 0;
  const titles: string[] = [];
  for (let idx = 0; idx < written.length; idx++) {
    const r = written[idx];
    if (r.status !== "fulfilled" || !r.value) continue;
    const data = r.value as ArticleJson;
    if (!data) continue;
    // Belt-and-suspenders: the AI rewrites titles, so re-check the FINAL
    // title against existing titles and this batch's own titles before
    // publishing — catches duplicates the RSS-title check missed.
    if (
      seenTitles.some((t) => titlesAreDuplicates(data.titleEn, t)) ||
      titles.some((t) => titlesAreDuplicates(data.titleEn, t))
    ) {
      continue;
    }
    const item = picked[idx];
    const category = VALID_CATEGORIES.has(data.category)
      ? data.category
      : (item as RssItem).category;
    let slug = `${articleSlug(data.titleEn) || "job-news"}-${dateStr}`;
    let n = 2;
    while (await db.article.findUnique({ where: { slug }, select: { id: true } })) {
      slug = `${articleSlug(data.titleEn) || "job-news"}-${dateStr}-${n++}`;
    }
    // Stamp the moment Growentix publishes the article, not the source
    // story's original date — otherwise fresh batches sink to old positions
    // in the /articles listing (ordered by publishedAt desc).
    await db.article.create({
      data: {
        slug,
        category,
        country: data.country || (item ? (item as RssItem).country : null),
        titleEn: data.titleEn.slice(0, 200),
        titleNe: data.titleNe || data.titleEn,
        excerptEn: (data.excerptEn || "").slice(0, 500),
        excerptNe: data.excerptNe || data.excerptEn || "",
        bodyEn: data.bodyEn,
        bodyNe: data.bodyNe,
        sources: [(item as RssItem).link],
        publishedAt: new Date(),
      },
    });
    published++;
    titles.push(data.titleEn);
  }

  // Purge ISR cache so the morning batch shows immediately.
  if (published > 0) {
    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath("/explore");
  }

  return NextResponse.json({
    ok: true,
    researched: allItems.length,
    picked: picked.length,
    published,
    titles,
  });
}
