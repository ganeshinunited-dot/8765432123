export const ARTICLE_CATEGORIES = [
  { slug: "nepal", label: "Nepal Jobs" },
  { slug: "gulf", label: "Gulf Jobs" },
  { slug: "korea-japan", label: "Korea & Japan" },
  { slug: "usa", label: "USA Jobs" },
  { slug: "uk", label: "UK Jobs" },
  { slug: "canada", label: "Canada Jobs" },
  { slug: "australia", label: "Australia Jobs" },
  { slug: "europe", label: "Europe Jobs" },
  { slug: "asia", label: "Asia Jobs" },
  { slug: "work-abroad", label: "Work Abroad" },
  { slug: "remote", label: "Remote Work" },
  { slug: "global", label: "Global Trends" },
  { slug: "career", label: "Career Guide" },
  { slug: "pop-music", label: "Pop Music" },
  { slug: "tech-ai", label: "Tech & AI" },
  { slug: "news", label: "News" },
] as const;

export function articleCategoryLabel(slug: string): string {
  return ARTICLE_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

/**
 * True for job-article categories — everything except news, pop-music,
 * tech-ai and the legacy taylor-swift pop category. One definition of
 * "job article" for the Verified badge, the JobPosting schema and the
 * job-detail route (Master Plan Phase 1, Batch 3).
 */
export function isJobCategory(category: string): boolean {
  return !["pop-music", "tech-ai", "news", "taylor-swift"].includes(category);
}

/** Job categories only — the 13 categories that live in the Jobs section. */
export const JOB_ARTICLE_CATEGORIES = ARTICLE_CATEGORIES.filter(
  (c) => c.slug !== "pop-music" && c.slug !== "tech-ai" && c.slug !== "news"
);

/**
 * Tech topic for a tech-ai article, derived from the slug (the article's
 * main keyword lives there) with the title as a fallback. The slug's first
 * word is the company or product — "google-gemini-..." is Google,
 * "google-deepmind-..." is DeepMind, "claude-..." is Anthropic. Anything
 * with no known company/product word falls under "Other" and is never
 * dropped from the list.
 */
const TECH_TOPIC_PREFIXES: { prefix: string; topic: string }[] = [
  { prefix: "google-deepmind", topic: "DeepMind" },
  { prefix: "deepmind", topic: "DeepMind" },
  { prefix: "google", topic: "Google" },
  { prefix: "gemini", topic: "Google" },
  { prefix: "anthropic", topic: "Anthropic" },
  { prefix: "claude", topic: "Anthropic" },
  { prefix: "openai", topic: "OpenAI" },
  { prefix: "chatgpt", topic: "OpenAI" },
  { prefix: "apple", topic: "Apple" },
  { prefix: "microsoft", topic: "Microsoft" },
  { prefix: "amazon", topic: "Amazon" },
  { prefix: "alexa", topic: "Amazon" },
  { prefix: "nvidia", topic: "NVIDIA" },
  { prefix: "github", topic: "GitHub" },
  { prefix: "meta", topic: "Meta" },
  { prefix: "grok", topic: "xAI" },
  { prefix: "xai", topic: "xAI" },
  { prefix: "samsung", topic: "Samsung" },
  { prefix: "intel", topic: "Intel" },
  { prefix: "amd", topic: "AMD" },
  { prefix: "tesla", topic: "Tesla" },
  { prefix: "oracle", topic: "Oracle" },
  { prefix: "adobe", topic: "Adobe" },
  { prefix: "salesforce", topic: "Salesforce" },
  { prefix: "servicenow", topic: "ServiceNow" },
];

function topicFromWords(words: string): string | null {
  const lower = words.toLowerCase();
  for (const { prefix, topic } of TECH_TOPIC_PREFIXES) {
    if (lower === prefix || lower.startsWith(`${prefix}-`) || lower.startsWith(`${prefix} `)) return topic;
  }
  return null;
}

export function techTopicForArticle(slug: string, titleEn: string): string {
  return topicFromWords(slug) ?? topicFromWords(titleEn.replace(/[^a-z0-9]+/gi, " ").trim()) ?? "Other";
}

export function articleSlug(titleEn: string): string {
  return titleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Categories that count as international (everything except Nepal + career guides). */
export const INTERNATIONAL_CATEGORIES = [
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
] as const;

/**
 * Title-similarity dedupe. The cron used to dedupe by source link only, so
 * the same story from different outlets slipped through (the Korea EPS
 * 7,200 story published 3 times: 9, 10, 15 Oct 2026). Two titles are
 * duplicates when their content-token Jaccard similarity is high, OR when
 * they share a distinctive (non-year) number plus at least two content
 * tokens — e.g. "7,200" + Korea + EPS catches reworded versions whose
 * Jaccard alone is low. Year tokens (1900–2100) are excluded from the
 * number rule so "Remote Jobs USA 2026" vs "Remote Jobs Canada 2026"
 * are NOT flagged.
 */
const TITLE_STOPWORDS = new Set([
  "the", "a", "an", "to", "in", "for", "of", "and", "on", "with", "from", "by",
  "at", "as", "is", "are", "will", "new", "after", "over", "amid", "amidst",
]);

function titleTokens(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => (t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t)) // naive singularise: nepalis -> nepali
    .filter((t) => !TITLE_STOPWORDS.has(t));
}

export function titlesAreDuplicates(a: string, b: string): boolean {
  const oa = titleTokens(a);
  const ob = titleTokens(b);
  const ta = new Set(oa);
  const tb = new Set(ob);
  if (ta.size === 0 || tb.size === 0) return false;
  // Shared-trigram rule: 3+ consecutive content tokens in common means the
  // same story with a reworded headline (e.g. "Germany-France car deal
  // hailed as jobs boost" vs "Germany-France car deal sparks jobs talk").
  // Template pairs like "Remote Jobs USA 2026" vs "Remote Jobs Canada
  // 2026" share only a bigram + year, so they stay distinct.
  const trigrams = (toks: string[]) => {
    const s = new Set<string>();
    for (let i = 0; i + 2 < toks.length; i++) s.add(toks.slice(i, i + 3).join(" "));
    return s;
  };
  const ga = trigrams(oa);
  if ([...ga].some((g) => trigrams(ob).has(g))) return true;
  const shared = [...ta].filter((t) => tb.has(t));
  const union = new Set([...ta, ...tb]);
  const symDiff = union.size - shared.length;
  // Jaccard rule, but a symmetric difference of exactly 2 means "same
  // template, one entity swapped" (USA vs Canada, engineers vs designers)
  // — different stories, not duplicates. Identical (0) or heavily
  // reworded (>= 3) differences with >= 50% overlap are duplicates.
  if (shared.length / union.size >= 0.5 && (symDiff <= 1 || symDiff >= 3)) return true;
  // Distinctive-number rule: shared non-year number + >= 3 other tokens +
  // heavily reworded (>= 3 differing tokens). The rewording requirement
  // keeps round-number templates apart: "500 Engineers" vs "500
  // Designers" and "200 Nurses Dubai" vs "200 Nurses Qatar" share a
  // number but differ by one swapped entity only.
  const isDistinctiveNumber = (t: string) =>
    /^\d{3,}$/.test(t) && !(Number(t) >= 1900 && Number(t) <= 2100);
  const sharedNumbers = shared.filter(isDistinctiveNumber);
  return sharedNumbers.length > 0 && shared.length >= 4 && symDiff >= 3;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Word matching: every query word must appear as a whole word in the article
 * text (title + excerpt, both languages, category, country). Whole-word
 * matching matters for short words — "ai" must not match "training".
 * Non-Latin words (e.g. Nepali) fall back to substring matching.
 */
export function matchesSearch(
  a: { titleEn: string; excerptEn: string; titleNe: string; excerptNe: string; category: string; country: string | null },
  query: string
): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = `${a.titleEn} ${a.excerptEn} ${a.titleNe} ${a.excerptNe} ${articleCategoryLabel(a.category)} ${a.country ?? ""}`.toLowerCase();
  return words.every((w) => {
    if (/^[a-z0-9]+$/.test(w)) {
      return new RegExp(`(^|[^a-z0-9])${escapeRegExp(w)}([^a-z0-9]|$)`, "i").test(haystack);
    }
    return haystack.includes(w);
  });
}

// ---------------------------------------------------------------------------
// Government / Private classification + Industries (Master Plan Phase 1,
// Batch 2). The Article model has no employer or sector field, so the
// government/private split and the industry of a job article are derived
// from the title (+ source domains for government). Validated against the
// full corpus on 2026-11-18: 118 government, 13 private, 33 neither out
// of 164 job articles; industries with 5+ articles: Engineering 42,
// Technology 30, Banking & Finance 14, Education 10, Healthcare 6,
// Defence & Security 6 (Energy 1, Transport & Logistics 2, Agriculture 1,
// Hospitality 0 — below the threshold, so not listed). Keep the lists
// curated: add a pattern only after eyeballing what it matches on the
// corpus, because a sloppy pattern misfiles real articles. Government
// takes precedence over private (e.g. a public-sector bank is government,
// never private); layoff news is never a vacancy.
// ---------------------------------------------------------------------------

export interface ClassifiableArticle {
  titleEn: string;
  sources: string[];
}

const GOVERNMENT_TITLE_PATTERNS: RegExp[] = [
  /\bupsc\b/i, /\bssc\b/i, /\bpsc\b/i, /\bpublic service commission\b/i,
  /\bstaff selection commission\b/i, /\bunion public service\b/i,
  /\brrb\b/i, /\brrc\b/i, /\brailway\b/i, /\brailways\b/i,
  /\bpolice\b/i, /\barmy\b/i, /\bnavy\b/i, /\bair force\b/i, /\bafcat\b/i,
  /\bassam rifles\b/i, /\bcoast guard\b/i, /\bparamilitary\b/i,
  /\bdefence\b/i, /\bdefense\b/i, /\blok sewa\b/i,
  /\bcivil service\b/i, /\bcivil services\b/i,
  /\bgovernment\b/i, /\bgovt\b/i, /\bfederal\b/i, /\bmunicipal\b/i,
  /\bparliament\b/i, /\bvidhan sabha\b/i, /\bsupreme court\b/i,
  /\bhigh court\b/i, /\bdistrict court\b/i, /\bcourt\b/i,
  /\bbhel\b/i, /\bbel\b/i, /\biocl\b/i, /\bnhpc\b/i, /\bnlc\b/i,
  /\bpowergrid\b/i, /\bpgcil\b/i, /\bongc\b/i, /\bsail\b/i,
  /\bcoal india\b/i, /\bntpc\b/i, /\bgail\b/i, /\bhpcl\b/i, /\bbpcl\b/i,
  /\bhal\b/i, /\bdrdo\b/i, /\bisro\b/i, /\bbarc\b/i, /\bnpcil\b/i,
  /\boil india\b/i, /\brecpdcl\b/i, /\brites\b/i, /\bgrse\b/i, /\bgstat\b/i,
  /\bexim bank\b/i, /\bindia post\b/i, /\bnepal telecom\b/i,
  /\bindian bank\b/i, /\bsbi\b/i, /\bbank of baroda\b/i, /\bj&k bank\b/i,
  /\bibps\b/i, /\bnicl\b/i, /\bdvc\b/i, /\bnhidcl\b/i, /\bcsir\b/i,
  /\bicar\b/i, /\basrb\b/i, /\baiims\b/i, /\bafms\b/i, /\biiit\b/i,
  /\bdelhi university\b/i, /\bsvsu\b/i, /\bdpsa\b/i, /\bfpsc\b/i,
  /\bhmrc\b/i, /\bcbp\b/i, /\bopm\b/i, /\busda\b/i, /\boaic\b/i,
  /\bcorrectional officer\b/i, /\bcanada summer jobs\b/i,
  /\beps korea\b/i, /\bisrael caregiver\b/i, /\bnepal police\b/i,
  /\bteacher recruitment\b/i, /tet\b/i, /\bdsc\b/i,
  /\bva veterans\b/i, /\bgsssb\b/i, /\bkea\b/i, /\btnpsc\b/i,
  /\btgpsc\b/i, /\buppsc\b/i, /\bupsssc\b/i, /\bwbpsc\b/i, /\bhppsc\b/i,
  /\bukpsc\b/i, /\bmpsc\b/i, /\bopsc\b/i, /\bappsc\b/i, /\bjkssb\b/i,
  /\bosssc\b/i, /\bousssc\b/i, /\bupessc\b/i, /\bircc\b/i, /\bdwcd\b/i,
  /\banganwadi\b/i, /\bstate power\b/i, /\bdsssb\b/i, /\bjshps\b/i,
  /\bjrhms\b/i, /\bhprca\b/i, /\bdhfws\b/i, /\brgcb\b/i, /\bnegd\b/i,
  /\bcabinet\b/i,
];

// A .gov.* source only counts when the title itself reads like a vacancy
// or government programme — a market report or visa guide that merely
// cites a government source is not a government job.
const GOVERNMENT_VACANCY_WORDS =
  /recruitment|vacancy|vacancies|posts|apply|hiring|jobs|roles|test|exam|result|programme|program|call|fair|event|incentive|officer|engineer|apprentice|trainee|clerk|assistant|teacher|nurse|doctor|driver|constable|inspector|manager|executive|technician|operator|worker|fellowship|residency|walk-in|interview|opening|openings/i;
const GOVERNMENT_NEWS_MARKERS =
  /market|guide|report|survey|\bsays\b|layoff|roundup|jobs report|job cuts|unemployment/i;

function isGovernmentSource(hostname: string): boolean {
  return /(^|\.)gov(\.|$)/.test(hostname) || hostname.endsWith(".gc.ca");
}

export function isGovernmentJob(a: ClassifiableArticle): boolean {
  const title = a.titleEn || "";
  if (GOVERNMENT_TITLE_PATTERNS.some((rx) => rx.test(title))) return true;
  const citesGovernment = (a.sources || []).some((url) => {
    try {
      return isGovernmentSource(new URL(url).hostname);
    } catch {
      return false;
    }
  });
  if (!citesGovernment) return false;
  return GOVERNMENT_VACANCY_WORDS.test(title) && !GOVERNMENT_NEWS_MARKERS.test(title);
}

const PRIVATE_TITLE_PATTERNS: RegExp[] = [
  /\bamazon\b/i, /\bgoogle\b/i, /\bmicrosoft\b/i, /\bapple\b/i,
  /\bmeta\b/i, /\btesla\b/i, /\bxai\b/i, /\banthropic\b/i, /\bopenai\b/i,
  /\broyal mail\b/i, /\bbritish steel\b/i, /\bslalom\b/i,
  /\bperiscope\b/i, /\blotte\b/i, /\bcanva\b/i, /\bservicenow\b/i,
  /\bco-operative bank\b/i, /\bstartup jobs\b/i, /\bwalk-in\b/i,
  /\bgates foundation\b/i, /\bdeprosc\b/i,
];

export function isPrivateJob(a: ClassifiableArticle): boolean {
  if (isGovernmentJob(a)) return false;
  const title = a.titleEn || "";
  if (/layoff/i.test(title)) return false; // layoff news is not a vacancy
  // A bank hiring is private — unless the title reads like news about a
  // bank ("Bank of England Says…"), which is market news, not a vacancy.
  if (/\bbank\b/i.test(title) && !/\bsays\b|\breport\b|\bsurvey\b|data shows/i.test(title)) return true;
  return PRIVATE_TITLE_PATTERNS.some((rx) => rx.test(title));
}

export interface Industry {
  slug: string;
  name: string;
  description: string;
  /** Title-only keyword patterns — the title is the article's own
   *  summary, so title matching stays clean where excerpt matching
   *  pulled in omnibus recruitments that merely mention a sector. */
  patterns: RegExp[];
}

/** Industries with 5+ job articles in the corpus (2026-11-18). An
 *  industry appears on /industries once it reaches 5 articles; below
 *  that it stays on /jobs only. */
export const INDUSTRIES: Industry[] = [
  {
    slug: "engineering",
    name: "Engineering",
    description: "Engineering vacancies — civil, mechanical, electrical and electronics engineers, railway and PSU apprenticeships, and GATE-based trainee roles.",
    patterns: [
      /engineer/i, /engineering/i, /railway/i, /power/i,
      /electricity/i, /telecom/i, /civil/i, /mechanical/i,
      /electrical/i, /electronics/i, /apprentice/i,
      /\baee\b/i, /\bje\b/i, /\bgate\b/i, /\brrb\b/i, /\brrc\b/i,
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    description: "Technology and AI jobs — AI, data, software and cybersecurity roles, from startups to global tech employers.",
    patterns: [
      /software/i, /artificial intelligence/i, /\bai\b/i, /\bdata\b/i,
      /cyber/i, /machine learning/i, /computer/i, /programmer/i,
      /developer/i, /information technology/i, /digital/i, /quantum/i,
    ],
  },
  {
    slug: "banking-finance",
    name: "Banking & Finance",
    description: "Banking and finance vacancies — public-sector banks, insurance, wealth management and accounting roles.",
    patterns: [
      /bank/i, /banking/i, /finance/i, /financial/i,
      /insurance/i, /accountant/i, /chartered accountant/i,
      /wealth management/i, /audit/i, /\bsbi\b/i, /\bnicl\b/i, /\bibps\b/i,
    ],
  },
  {
    slug: "education",
    name: "Education",
    description: "Education jobs — teachers, instructors, professors and tutors, including TET and teaching recruitments.",
    patterns: [
      /teacher/i, /teaching/i, /instructor/i, /professor/i,
      /lecturer/i, /assistant professor/i, /tutor/i, /school/i,
      /tet\b/i, /education/i,
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Healthcare jobs — doctors, nurses, pharmacists, caregivers and community health officers.",
    patterns: [
      /nurs/i, /doctor/i, /medical/i, /health/i, /hospital/i,
      /pharmac/i, /dentist/i, /dental/i, /caregiver/i,
      /health officer/i, /ophthalmic/i, /surgeon/i, /physician/i,
      /psychiatrist/i, /pathologist/i, /radiologist/i,
      /community health/i, /medical officer/i, /health assistant/i,
      /staff nurse/i, /lab technician/i, /pharmacy officer/i,
      /\bnhm\b/i,
    ],
  },
  {
    slug: "defence-security",
    name: "Defence & Security",
    description: "Defence and security jobs — police, armed forces, paramilitary and correctional roles.",
    patterns: [
      /police/i, /army/i, /navy/i, /air force/i, /defence/i,
      /defense/i, /security officer/i, /constable/i,
      /firefighter/i, /correctional/i, /paramilitary/i,
      /\bafms\b/i, /armed forces/i,
    ],
  },
];

export function industryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function industriesForTitle(titleEn: string): Industry[] {
  const title = titleEn || "";
  return INDUSTRIES.filter((ind) => ind.patterns.some((rx) => rx.test(title)));
}

// ---------------------------------------------------------------------------
// Best-effort apply-by date for job posts (shared by /articles/[slug] and
// /jobs/[slug]). Deadline phrasings vary — "Apply by 30 November 2026"
// (often only in the title), "Applications close on 17 November", "Last
// date | 17 November 2026" (at-a-glance table), "the form runs from 15
// October to 13 November 2026" (end date), "Submit before 11:59 pm on
// 13 November 2026". Returns ISO date (YYYY-MM-DD) or null. Year is taken
// from the text when present, else the current year. Only used for
// job-category articles — news/pop/tech never get a closed banner.
// ---------------------------------------------------------------------------

const APPLY_BY_MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

export function applyByDate(titleEn: string, excerptEn: string, bodyEn: string): string | null {
  const text = `${titleEn} ${excerptEn} ${bodyEn.replace(/<[^>]+>/g, " ")}`;
  const monthPat = APPLY_BY_MONTHS.join("|");
  const patterns = [
    `apply by\\s+(\\d{1,2})\\s+(${monthPat})(?:\\s+(\\d{4}))?`,
    `applications?\\s+close[sd]?\\s+(?:on\\s+)?(\\d{1,2})\\s+(${monthPat})(?:\\s+(\\d{4}))?`,
    `last date[^.]{0,80}?(\\d{1,2})\\s+(${monthPat})(?:\\s+(\\d{4}))?`,
    `runs from[^.]{0,80}?to\\s+(\\d{1,2})\\s+(${monthPat})(?:\\s+(\\d{4}))?`,
    `submit\\s+(?:before|by)[^.]{0,40}?(\\d{1,2})\\s+(${monthPat})(?:\\s+(\\d{4}))?`,
  ];
  for (const p of patterns) {
    const m = text.match(new RegExp(p, "i"));
    if (m) {
      const year = m[3] ? parseInt(m[3], 10) : new Date().getFullYear();
      const month = APPLY_BY_MONTHS.indexOf(m[2].toLowerCase()) + 1;
      return `${year}-${String(month).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
    }
  }
  return null;
}
