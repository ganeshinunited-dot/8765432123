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
  "usa",
  "uk",
  "canada",
  "australia",
  "europe",
  "asia",
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
  "You are a senior job-news editor for Growentix, Nepal's opportunity radar. You write in British English and in natural, fluent Nepali (Devanagari script). You never invent facts. Your writing must read as fully human: varied sentence rhythm, concrete specifics, no AI-telltale phrasing. Output JSON only.";

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
- "bodyEn": article body as HTML using only <h2>, <p>, <ul>, <li>, <strong>, <a> tags. 600-800 words. Structure:
  1. <p> lead — what happened, with the key facts up front.
  2. <h2>Why it matters</h2> — explain the background and what this means practically for a jobseeker. Add clearly-labelled general context where the material is thin (never invent specifics).
  3. <h2>Key details</h2> — the concrete facts: who, how many posts, eligibility, salary, dates, deadlines.
  4. <h2>How to apply</h2> — step-by-step, plain-language instructions a reader can actually follow (where to go, what documents, what to watch out for). If the story has no application process, replace this section with <h2>What to do next</h2> giving practical next steps.
  5. Short closing <p> — one honest takeaway, no hype.
  British English.
- "bodyNe": full Nepali (Devanagari script) version of bodyEn — rewrite it the way a skilled Nepali journalist would write it: natural sentence flow, common Nepali job vocabulary (रोजगारी, भर्ना, आवेदन, तलब, योग्यता), same HTML tags and structure. Never transliterate English sentences word-for-word.
- "category": one of: nepal, gulf, korea-japan, work-abroad, remote, global, career (pick the best fit)
- "country": the main country this story is about, or null

RULES:
- British English spelling in all English text (e.g. "organised", "favour", "labour").
- Write like a human journalist: vary sentence length and rhythm; lead with concrete facts, not throat-clearing. Never open with "In today's fast-paced world" or similar filler.
- Banned AI-telltale words: delve, moreover, furthermore, additionally (as sentence starter), tapestry, landscape (as metaphor), "game-changer", "in conclusion". Contractions (don't, it's, here's) are fine and encouraged.
- INLINE LINKS: link key entities in the body text itself using <a href="..."> tags — the first mention of the source publication, official portals (e.g. ferms.dofe.gov.np), and organisations should link to the source URL: ${item.link}. Example: <a href="${item.link}">Department of Foreign Employment</a>. 2-4 inline links per article; never link the same phrase twice.
- Every claim of fact must come from the material. If the material is thin, say what is known and add useful general context clearly framed as context.
- DISTINCTIVE VALUE: a reader must learn something here they did not get from the source headline. Every article must add at least one of: deadline context (how long is left, what happens next), an eligibility or document checklist, fee/process specifics, or what the story means for applicants from Nepal. A pure rewrite of the source is a failure.
- NEPAL ANGLE: when a story affects Nepali jobseekers (EPS, Gulf, work abroad, remote), add a short passage on what it means for applicants from Nepal — the official channel (DoFE, EPS, employer portal), documents typically needed, and a caution to apply only through official channels.
- VERIFICATION: if sources disagree on a number, date, or fee, use the official source (government portal or the hiring organisation) and note the difference. If a key fact (deadline, fee, seats) is not stated anywhere, say it has not been announced — never guess it.
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
    { json: true, maxTokens: 5000 }
  );
  const data = parseAiJson<ArticleJson>(raw);
  if (!data || !data.titleEn || !data.bodyEn || !data.bodyNe) return null;
  return data;
}

// ---------------------------------------------------------------------------
// Evergreen long-tail keyword guides. One is published per day by the daily
// cron (alongside the news batch) until the list is exhausted, then the
// cron stops generating guides. White-hat: the focus keyword appears in the
// title, first paragraph and one H2 — never stuffed.
// ---------------------------------------------------------------------------

export interface GuideSpec {
  keyword: string;
  workingTitle: string;
  category: string;
  angle: string;
  referenceUrls: string[];
}

export const GUIDE_SPECS: GuideSpec[] = [
  {
    keyword: "remote data entry jobs no experience",
    workingTitle: "Remote Data Entry Jobs With No Experience: Where Beginners Can Actually Start",
    category: "remote",
    angle: "Beginner-oriented: what data entry really involves, realistic pay ranges, which platforms list genuine entry-level roles, red flags for scams.",
    referenceUrls: ["https://www.upwork.com", "https://www.fiverr.com", "https://growentix.cloud/courses"],
  },
  {
    keyword: "work from home jobs for students",
    workingTitle: "Work From Home Jobs for Students in Nepal: Realistic Options in 2026",
    category: "remote",
    angle: "Nepali students: freelancing, tutoring, content writing, virtual assistance; balancing classes; payment methods available in Nepal.",
    referenceUrls: ["https://www.upwork.com", "https://growentix.cloud/courses"],
  },
  {
    keyword: "virtual assistant jobs for beginners",
    workingTitle: "Virtual Assistant Jobs for Beginners: Skills, Pay and Where to Apply",
    category: "remote",
    angle: "What VAs actually do, starter skill stack, realistic beginner pay, where beginners find first clients, how to write a VA profile.",
    referenceUrls: ["https://www.upwork.com", "https://growentix.cloud/courses"],
  },
  {
    keyword: "remote customer service jobs no experience",
    workingTitle: "Remote Customer Service Jobs With No Experience: What Employers Really Ask",
    category: "remote",
    angle: "Entry-level remote support roles, communication skills that matter, common interview questions, companies known to hire beginners.",
    referenceUrls: ["https://www.indeed.com", "https://growentix.cloud/jobs"],
  },
  {
    keyword: "jobs in dubai for foreigners",
    workingTitle: "Jobs in Dubai for Foreigners: Visa, Salary and In-Demand Roles",
    category: "gulf",
    angle: "How Dubai work visas work, in-demand sectors, realistic salary bands, legal application channels, avoiding recruitment fraud.",
    referenceUrls: ["https://www.dofe.gov.np", "https://growentix.cloud/sarkari-jobs"],
  },
  {
    keyword: "delivery driver jobs dubai salary",
    workingTitle: "Delivery Driver Jobs in Dubai: Salary, Requirements and How to Apply",
    category: "gulf",
    angle: "Licence requirements, typical salary + commission structure, major delivery companies, legal route via manpower agencies.",
    referenceUrls: ["https://www.dofe.gov.np"],
  },
  {
    keyword: "no experience jobs abroad nepal",
    workingTitle: "No Experience Jobs Abroad for Nepalis: Gulf, Korea and Beyond",
    category: "work-abroad",
    angle: "Legal pathways for first-time migrant workers: EPS Korea, Gulf demand letters, required documents, costs, fraud prevention.",
    referenceUrls: ["https://www.dofe.gov.np", "https://eps.go.kr", "https://growentix.cloud/sarkari-jobs"],
  },
  {
    keyword: "part time online jobs for students",
    workingTitle: "Part-Time Online Jobs for Students: Flexible Work That Fits Your Classes",
    category: "remote",
    angle: "Flexible online roles by hours available, realistic weekly earnings, avoiding time-wasters, building skills that compound.",
    referenceUrls: ["https://www.upwork.com", "https://growentix.cloud/courses"],
  },
  {
    keyword: "data entry jobs from home",
    workingTitle: "Data Entry Jobs From Home: Legit Platforms vs the Scams to Avoid",
    category: "remote",
    angle: "Public-service angle: how data-entry scams work (registration fees, fake cheques), verification checklist, genuinely legit platforms.",
    referenceUrls: ["https://www.upwork.com"],
  },
  {
    keyword: "remote accountant jobs",
    workingTitle: "Remote Accountant Jobs: Certifications and Platforms That Hire Internationally",
    category: "remote",
    angle: "Which accounting credentials travel internationally, bookkeeping vs CPA-track roles, platforms and firms hiring remote accountants.",
    referenceUrls: ["https://www.linkedin.com", "https://growentix.cloud/courses"],
  },
];

function buildGuidePrompt(spec: GuideSpec): string {
  return `Write a comprehensive evergreen career guide based on your knowledge. Do NOT invent specific job listings, company hiring claims, salaries for named employers, or deadlines. Salary figures must be realistic typical ranges clearly labelled as typical. If you mention platforms or official portals, use only well-known real ones.

FOCUS KEYWORD: "${spec.keyword}"
WORKING TITLE: "${spec.workingTitle}"
ANGLE: ${spec.angle}

Return JSON with exactly these keys:
- "titleEn": compelling headline containing the focus keyword naturally, British English, max 90 characters
- "titleNe": the same headline in natural Nepali (Devanagari script) — fluent and idiomatic
- "excerptEn": 1-2 sentence summary, British English
- "excerptNe": the summary in fluent Nepali (Devanagari script)
- "bodyEn": guide body as HTML using only <h2>, <p>, <ul>, <li>, <strong>, <a> tags. 800-1000 words. Structure:
  1. <p> lead containing the focus keyword — who this guide is for and what they will learn.
  2. <h2> containing the focus keyword — the honest reality: what the work involves, typical pay (labelled typical), who succeeds.
  3. <h2>Where to find legitimate opportunities</h2> — real platforms and channels; how to verify a listing is genuine.
  4. <h2>How to apply, step by step</h2> — concrete steps a reader can follow today.
  5. <h2>Watch out for scams</h2> — red flags specific to this field (skip only if genuinely not applicable).
  6. Short closing <p> — one honest takeaway.
  British English.
- "bodyNe": full Nepali (Devanagari script) version — rewrite like a skilled Nepali journalist, natural flow, common job vocabulary, same HTML structure. Never transliterate word-for-word.
- "category": "${spec.category}"
- "country": null

RULES:
- British English spelling in all English text.
- Write like a human expert: varied sentence rhythm, concrete and practical, no filler openers. Never open with "In today's fast-paced world" or similar.
- Banned AI-telltale words: delve, moreover, furthermore, additionally (as sentence starter), tapestry, landscape (as metaphor), "game-changer", "in conclusion". Contractions are fine.
- INLINE LINKS: 2-4 <a href> links on key entities (official portals, well-known platforms, Growentix pages). Use only these URLs: ${spec.referenceUrls.join(", ")}. Never invent URLs.
- No emojis. No markdown. HTML only in the body fields.
- Never mention that you are an AI.`;
}

/** Writes one evergreen long-tail guide. Returns null on failure. */
export async function writeGuide(spec: GuideSpec): Promise<ArticleJson | null> {
  const raw = await aiComplete(
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildGuidePrompt(spec) },
    ],
    { json: true, maxTokens: 6000 }
  );
  const data = parseAiJson<ArticleJson>(raw);
  if (!data || !data.titleEn || !data.bodyEn || !data.bodyNe) return null;
  return data;
}
