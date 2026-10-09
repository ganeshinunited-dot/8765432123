import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiComplete, parseAiJson } from "@/lib/ai";
import { articleSlug } from "@/lib/articles";

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

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  publisher: string;
  description: string;
  category: string;
  country: string | null;
}

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

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function parseRss(
  xml: string,
  category: string,
  country: string | null
): RssItem[] {
  const items: RssItem[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  const get = (block: string, tag: string) => {
    const r = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
    const x = block.match(r);
    return x ? decodeEntities(x[1].trim()) : "";
  };
  while ((m = itemRe.exec(xml))) {
    const block = m[1];
    const rawTitle = get(block, "title");
    if (!rawTitle) continue;
    const dashIdx = rawTitle.lastIndexOf(" - ");
    items.push({
      title: (dashIdx > 0 ? rawTitle.slice(0, dashIdx) : rawTitle).trim(),
      publisher:
        (dashIdx > 0 ? rawTitle.slice(dashIdx + 3) : get(block, "source")).trim(),
      link: get(block, "link"),
      pubDate: get(block, "pubDate"),
      description: get(block, "description"),
      category,
      country,
    });
  }
  return items;
}

function extractText(html: string): string {
  let t = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(t).replace(/\s+/g, " ").trim().slice(0, 3000);
}

async function fetchPageText(link: string): Promise<string> {
  try {
    const res = await fetch(link, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GrowentixBot/1.0)" },
      signal: AbortSignal.timeout(12_000),
      redirect: "follow",
    });
    if (!res.ok) return "";
    const html = await res.text();
    return extractText(html);
  } catch {
    return "";
  }
}

interface ArticleJson {
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  bodyEn: string;
  bodyNe: string;
  category: string;
  country: string | null;
}

const SYSTEM_PROMPT =
  "You are a job-news editor for Growentix, Nepal's student job platform. You write in British English and in natural Nepali (Devanagari script). You never invent facts. Output JSON only.";

function buildPrompt(item: RssItem, pageText: string): string {
  const material = pageText || item.description || "(no further text available)";
  return `Write a job-news article based ONLY on the material below. Do not invent facts, numbers, dates, names, or quotes that are not in the material. If the material is thin, write a concise piece and add general, clearly-labelled context that a jobseeker would find useful (without inventing specifics).

MATERIAL:
Headline: ${item.title}
Publisher: ${item.publisher}
Published: ${item.pubDate}
Page text: ${material}

Return JSON with exactly these keys:
- "titleEn": short punchy headline, British English, max 90 characters
- "titleNe": the same headline translated into natural Nepali (Devanagari script)
- "excerptEn": 1-2 sentence summary, British English
- "excerptNe": the summary in Nepali (Devanagari script)
- "bodyEn": article body as HTML using only <h2>, <p>, <ul>, <li>, <strong> tags. 300-420 words. Structure: what happened, why it matters for jobseekers, what to do next. British English.
- "bodyNe": full Nepali (Devanagari script) translation of bodyEn, same HTML tags and structure
- "category": one of: nepal, gulf, korea-japan, work-abroad, remote, global, career (pick the best fit)
- "country": the main country this story is about, or null

RULES:
- British English spelling in all English text (e.g. "organised", "favour", "labour").
- No emojis. No markdown. HTML only in the body fields.
- Never mention that you are an AI.`;
}

const VALID_CATEGORIES = new Set([
  "nepal",
  "gulf",
  "korea-japan",
  "work-abroad",
  "remote",
  "global",
  "career",
]);

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
    picked.map(async (item, i) => {
      const raw = await aiComplete(
        [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildPrompt(item, pageTexts[i]) },
        ],
        { json: true, maxTokens: 2600 }
      );
      const data = parseAiJson<ArticleJson>(raw);
      if (!data || !data.titleEn || !data.bodyEn || !data.bodyNe) return null;
      return { item, data };
    })
  );

  // 5. Publish.
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  let published = 0;
  const titles: string[] = [];
  for (const r of written) {
    if (r.status !== "fulfilled" || !r.value) continue;
    const { item, data } = r.value;
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
