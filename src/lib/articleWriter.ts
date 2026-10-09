import { aiComplete, parseAiJson } from "@/lib/ai";

// ---------------------------------------------------------------------------
// Shared bilingual article writer used by the daily cron and the admin
// article publisher. Research (RSS / page fetch) + AI writing live here
// so both entry points produce identical quality.
// ---------------------------------------------------------------------------

export interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  publisher: string;
  description: string;
  category: string;
  country: string | null;
}

export interface ArticleJson {
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  bodyEn: string;
  bodyNe: string;
  category: string;
  country: string | null;
}

export const VALID_CATEGORIES = new Set([
  "nepal",
  "gulf",
  "korea-japan",
  "work-abroad",
  "remote",
  "global",
  "career",
]);

export function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

export function parseRss(
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
      publisher: (dashIdx > 0 ? rawTitle.slice(dashIdx + 3) : get(block, "source")).trim(),
      link: get(block, "link"),
      pubDate: get(block, "pubDate"),
      description: get(block, "description"),
      category,
      country,
    });
  }
  return items;
}

export function extractText(html: string): string {
  const t = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(t).replace(/\s+/g, " ").trim().slice(0, 3000);
}

export async function fetchPageText(link: string): Promise<string> {
  try {
    const res = await fetch(link, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GrowentixBot/1.0)" },
      signal: AbortSignal.timeout(12_000),
      redirect: "follow",
    });
    if (!res.ok) return "";
    return extractText(await res.text());
  } catch {
    return "";
  }
}

const SYSTEM_PROMPT =
  "You are a job-news editor for Growentix, Nepal's student job platform. You write in British English and in natural, fluent Nepali (Devanagari script). You never invent facts. Output JSON only.";

function buildPrompt(
  item: RssItem,
  pageText: string,
  focusKeyword?: string
): string {
  const material = pageText || item.description || "(no further text available)";
  const keywordRule = focusKeyword
    ? `\n- Naturally include the focus keyword "${focusKeyword}" in the English title, the first paragraph of bodyEn, and at least one <h2> heading. Never stuff it unnaturally.`
    : "";
  return `Write a job-news article based ONLY on the material below. Do not invent facts, numbers, dates, names, or quotes that are not in the material. If the material is thin, write a concise piece and add general, clearly-labelled context that a jobseeker would find useful (without inventing specifics).

MATERIAL:
Headline: ${item.title}
Publisher: ${item.publisher}
Published: ${item.pubDate}
Page text: ${material}

Return JSON with exactly these keys:
- "titleEn": short punchy headline, British English, max 90 characters
- "titleNe": the same headline in natural Nepali (Devanagari script) — fluent and idiomatic, not a word-for-word translation
- "excerptEn": 1-2 sentence summary, British English
- "excerptNe": the summary in fluent Nepali (Devanagari script)
- "bodyEn": article body as HTML using only <h2>, <p>, <ul>, <li>, <strong> tags. 300-420 words. Structure: what happened, why it matters for jobseekers, what to do next. British English.
- "bodyNe": full Nepali (Devanagari script) version of bodyEn — rewrite it the way a skilled Nepali journalist would write it: natural sentence flow, common Nepali job vocabulary (रोजगारी, भर्ना, आवेदन, तलब, योग्यता), same HTML tags and structure. Never transliterate English sentences word-for-word.
- "category": one of: nepal, gulf, korea-japan, work-abroad, remote, global, career (pick the best fit)
- "country": the main country this story is about, or null

RULES:
- British English spelling in all English text (e.g. "organised", "favour", "labour").
- No emojis. No markdown. HTML only in the body fields.${keywordRule}
- Never mention that you are an AI.`;
}

/** Writes one bilingual article from a researched item. Returns null on failure. */
export async function writeArticle(
  item: RssItem,
  pageText: string,
  focusKeyword?: string
): Promise<ArticleJson | null> {
  const raw = await aiComplete(
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildPrompt(item, pageText, focusKeyword) },
    ],
    { json: true, maxTokens: 2600 }
  );
  const data = parseAiJson<ArticleJson>(raw);
  if (!data || !data.titleEn || !data.bodyEn || !data.bodyNe) return null;
  return data;
}
