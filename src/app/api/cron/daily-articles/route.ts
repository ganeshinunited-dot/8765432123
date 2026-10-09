import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { articleSlug } from "@/lib/articles";
import {
  parseRss,
  fetchPageText,
  writeArticle,
  VALID_CATEGORIES,
  type RssItem,
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
  { q: "remote jobs hiring work from home", category: "remote", country: null },
  { q: "layoffs hiring trends 2026", category: "global", country: null },
  { q: "artificial intelligence jobs hiring", category: "global", country: null },
  { q: "work abroad visa opportunities", category: "work-abroad", country: null },
  { q: "career advice salary interview tips", category: "career", country: null },
];

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
  const rssResults = await Promise.allSettled(
    QUERIES.map(async (q) => {
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

  // 2. Dedupe against already-published source links.
  const existing = await db.article.findMany({
    select: { sources: true },
    orderBy: { publishedAt: "desc" },
    take: 400,
  });
  const seenLinks = new Set(existing.flatMap((e) => e.sources));
  const seenInBatch = new Set<string>();
  const perCategory = new Map<string, number>();
  const picked: RssItem[] = [];
  for (const item of allItems) {
    if (picked.length >= TARGET_COUNT) break;
    if (!item.link || seenLinks.has(item.link) || seenInBatch.has(item.link))
      continue;
    const n = perCategory.get(item.category) ?? 0;
    if (n >= MAX_PER_CATEGORY) continue;
    seenInBatch.add(item.link);
    perCategory.set(item.category, n + 1);
    picked.push(item);
  }

  // 3. Ground each story: fetch the article page text (parallel).
  const pageTexts = await Promise.all(picked.map((p) => fetchPageText(p.link)));

  // 4. Write: one AI call per story, English + Nepali together (parallel).
  const written = await Promise.allSettled(
    picked.map((item, i) => writeArticle(item, pageTexts[i]))
  );

  // 5. Publish.
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  let published = 0;
  const titles: string[] = [];
  for (let idx = 0; idx < written.length; idx++) {
    const r = written[idx];
    if (r.status !== "fulfilled" || !r.value) continue;
    const data = r.value;
    const item = picked[idx];
    const category = VALID_CATEGORIES.has(data.category)
      ? data.category
      : item.category;
    let slug = `${articleSlug(data.titleEn) || "job-news"}-${dateStr}`;
    let n = 2;
    while (await db.article.findUnique({ where: { slug }, select: { id: true } })) {
      slug = `${articleSlug(data.titleEn) || "job-news"}-${dateStr}-${n++}`;
    }
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
    await db.article.create({
      data: {
        slug,
        category,
        country: data.country || item.country,
        titleEn: data.titleEn.slice(0, 200),
        titleNe: data.titleNe || data.titleEn,
        excerptEn: (data.excerptEn || "").slice(0, 500),
        excerptNe: data.excerptNe || data.excerptEn || "",
        bodyEn: data.bodyEn,
        bodyNe: data.bodyNe,
        sources: [item.link],
        publishedAt: isNaN(pubDate.getTime()) ? new Date() : pubDate,
      },
    });
    published++;
    titles.push(data.titleEn);
  }

  return NextResponse.json({
    ok: true,
    researched: allItems.length,
    picked: picked.length,
    published,
    titles,
  });
}
