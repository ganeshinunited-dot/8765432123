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
- "bodyEn": article body as HTML using only <h2>, <p>, <ul>, <li>, <strong>, <a>, <table>, <tr>, <th>, <td> tags. 600-800 words. Structure:
  1. <p> lead — what happened, with the key facts up front.
  2. <h2>At a glance</h2> — a <table> of the key facts, one row per fact: <tr><th>Deadline</th><td>...</td></tr>, Posts, Salary, Location, Eligibility, Official channel. Include ONLY rows for facts stated in the material — omit any row whose fact is not in the material. Keep values short. If the material states none of these facts, omit the whole At a glance section.
  3. <h2>Why it matters</h2> — explain the background and what this means practically for a jobseeker. Add clearly-labelled general context where the material is thin (never invent specifics).
  4. <h2>Key details</h2> — the concrete facts: who, how many posts, eligibility, salary, dates, deadlines.
  5. <h2>How to apply</h2> — step-by-step, plain-language instructions a reader can actually follow (where to go, what documents, what to watch out for). If the story has no application process, replace this section with <h2>What to do next</h2> giving practical next steps.
  6. Short closing <p> — one honest takeaway, no hype.
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
  // --- Batch 2: 90 more evergreen specs (total 100) ---
  // USA
  {
    keyword: "warehouse jobs in usa for foreigners",
    workingTitle: "Warehouse Jobs in USA for Foreigners: Visa, Pay and How to Apply",
    category: "usa",
    angle: "Which warehouses hire foreign workers, H-2B visa route, realistic pay, legal application channels.",
    referenceUrls: ["https://www.indeed.com", "https://www.uscis.gov"],
  },
  {
    keyword: "truck driver jobs in usa salary",
    workingTitle: "Truck Driver Jobs in USA: Salary, Licence and Visa Routes",
    category: "usa",
    angle: "CDL licence, pay per mile, H-2B route, demand by state.",
    referenceUrls: ["https://www.indeed.com", "https://www.fmcsa.dot.gov"],
  },
  {
    keyword: "caregiver jobs in usa for foreigners",
    workingTitle: "Caregiver Jobs in USA for Foreigners: Requirements and Pay",
    category: "usa",
    angle: "HHA/CNA roles, visa options, training, realistic pay.",
    referenceUrls: ["https://www.indeed.com", "https://www.uscis.gov"],
  },
  {
    keyword: "farm worker jobs in usa h-2a visa",
    workingTitle: "Farm Worker Jobs in USA on the H-2A Visa",
    category: "usa",
    angle: "How H-2A works, seasonal work, housing, pay, how to apply legally.",
    referenceUrls: ["https://www.dol.gov", "https://www.uscis.gov"],
  },
  {
    keyword: "hotel jobs in usa for foreigners",
    workingTitle: "Hotel Jobs in USA for Foreigners: Roles, Pay and Visas",
    category: "usa",
    angle: "Front desk, housekeeping, food and beverage roles, H-2B route, pay.",
    referenceUrls: ["https://www.indeed.com", "https://www.uscis.gov"],
  },
  {
    keyword: "nursing jobs in usa for foreign nurses",
    workingTitle: "Nursing Jobs in USA for Foreign Nurses: NCLEX, Visa and Pay",
    category: "usa",
    angle: "NCLEX exam, VisaScreen, EB-3 route, pay by state.",
    referenceUrls: ["https://www.ncsbn.org", "https://www.uscis.gov"],
  },
  {
    keyword: "software engineer jobs in usa for foreigners",
    workingTitle: "Software Engineer Jobs in USA for Foreigners: H-1B, Pay and Hiring",
    category: "usa",
    angle: "H-1B lottery, pay bands, hiring process, what employers look for.",
    referenceUrls: ["https://www.linkedin.com", "https://www.uscis.gov"],
  },
  {
    keyword: "construction jobs in usa for foreigners",
    workingTitle: "Construction Jobs in USA for Foreigners: Pay, Safety and Visas",
    category: "usa",
    angle: "Trades in demand, OSHA safety basics, H-2B route, pay.",
    referenceUrls: ["https://www.indeed.com", "https://www.osha.gov"],
  },
  {
    keyword: "restaurant jobs in usa for foreigners",
    workingTitle: "Restaurant Jobs in USA for Foreigners: Roles and Pay",
    category: "usa",
    angle: "Cooks, servers, kitchen staff, H-2B route, tips and pay.",
    referenceUrls: ["https://www.indeed.com", "https://www.uscis.gov"],
  },
  {
    keyword: "cleaning jobs in usa for foreigners",
    workingTitle: "Cleaning Jobs in USA for Foreigners: Pay and How to Apply",
    category: "usa",
    angle: "Commercial and residential cleaning, pay, agencies, legal channels.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "security guard jobs in usa requirements",
    workingTitle: "Security Guard Jobs in USA: Requirements, Licence and Pay",
    category: "usa",
    angle: "State licences, training requirements, pay, where to apply.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "amazon warehouse jobs pay",
    workingTitle: "Amazon Warehouse Jobs: Pay, Shifts and How to Apply",
    category: "usa",
    angle: "Warehouse roles, pay, shift patterns, application process.",
    referenceUrls: ["https://www.amazon.jobs", "https://www.indeed.com"],
  },
  // UK
  {
    keyword: "care worker jobs in uk for foreigners",
    workingTitle: "Care Worker Jobs in UK for Foreigners: Visa, Pay and Requirements",
    category: "uk",
    angle: "Health and Care Worker visa, sponsorship, pay, requirements.",
    referenceUrls: ["https://www.gov.uk", "https://www.indeed.com"],
  },
  {
    keyword: "nhs jobs for foreign nurses",
    workingTitle: "NHS Jobs for Foreign Nurses: NMC, Visa and Pay",
    category: "uk",
    angle: "NMC registration, OSCE exam, visa route, NHS pay bands.",
    referenceUrls: ["https://www.nmc.org.uk", "https://www.jobs.nhs.uk"],
  },
  {
    keyword: "warehouse jobs in uk for foreigners",
    workingTitle: "Warehouse Jobs in UK for Foreigners: Pay and How to Apply",
    category: "uk",
    angle: "Warehouse roles, pay, right-to-work rules, where to apply.",
    referenceUrls: ["https://www.indeed.com", "https://www.gov.uk"],
  },
  {
    keyword: "chef jobs in uk visa sponsorship",
    workingTitle: "Chef Jobs in UK With Visa Sponsorship: Requirements and Pay",
    category: "uk",
    angle: "Skilled Worker visa, salary thresholds, chef roles in demand.",
    referenceUrls: ["https://www.gov.uk", "https://www.indeed.com"],
  },
  {
    keyword: "delivery driver jobs uk salary",
    workingTitle: "Delivery Driver Jobs in UK: Salary, Licence and Where to Apply",
    category: "uk",
    angle: "Van and car delivery, pay structures, apps vs employers.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "cleaning jobs in london pay",
    workingTitle: "Cleaning Jobs in London: Pay, Hours and How to Apply",
    category: "uk",
    angle: "Domestic and commercial cleaning, London pay, agencies.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "hotel jobs in london for foreigners",
    workingTitle: "Hotel Jobs in London for Foreigners: Roles and Visas",
    category: "uk",
    angle: "Hotel roles, sponsorship routes, pay, where to apply.",
    referenceUrls: ["https://www.indeed.com", "https://www.gov.uk"],
  },
  {
    keyword: "student part time jobs in uk",
    workingTitle: "Part-Time Jobs for Students in the UK: Rules, Pay and Where to Look",
    category: "uk",
    angle: "20-hour work rule, pay, best student-friendly roles.",
    referenceUrls: ["https://www.gov.uk", "https://www.indeed.com"],
  },
  // Canada
  {
    keyword: "farm worker jobs in canada for foreigners",
    workingTitle: "Farm Worker Jobs in Canada for Foreigners: SAWP, Pay and How to Apply",
    category: "canada",
    angle: "SAWP and TFWP routes, pay, housing, how to apply legally.",
    referenceUrls: ["https://www.canada.ca", "https://www.indeed.com"],
  },
  {
    keyword: "truck driver jobs in canada for foreigners",
    workingTitle: "Truck Driver Jobs in Canada for Foreigners: Licence, Pay and PNP",
    category: "canada",
    angle: "Licence classes, pay, provincial nominee pathways.",
    referenceUrls: ["https://www.canada.ca", "https://www.indeed.com"],
  },
  {
    keyword: "caregiver jobs in canada for foreigners",
    workingTitle: "Caregiver Jobs in Canada for Foreigners: Home Care Pilot, Pay",
    category: "canada",
    angle: "Home Child Care and Home Support pilots, pay, requirements.",
    referenceUrls: ["https://www.canada.ca"],
  },
  {
    keyword: "warehouse jobs in canada for foreigners",
    workingTitle: "Warehouse Jobs in Canada for Foreigners: Pay and How to Apply",
    category: "canada",
    angle: "Warehouse roles, pay, TFWP route, where to apply.",
    referenceUrls: ["https://www.indeed.com", "https://www.canada.ca"],
  },
  {
    keyword: "cook jobs in canada visa",
    workingTitle: "Cook Jobs in Canada With Visa: Requirements and Pay",
    category: "canada",
    angle: "Red Seal, TFWP route, pay by province.",
    referenceUrls: ["https://www.canada.ca", "https://www.indeed.com"],
  },
  {
    keyword: "nursing jobs in canada for foreign nurses",
    workingTitle: "Nursing Jobs in Canada for Foreign Nurses: Licensing, Pay and PR",
    category: "canada",
    angle: "NNAS assessment, provincial licensing, pay, Express Entry.",
    referenceUrls: ["https://www.canada.ca", "https://www.nnas.ca"],
  },
  {
    keyword: "construction jobs in canada for foreigners",
    workingTitle: "Construction Jobs in Canada for Foreigners: Pay and Pathways",
    category: "canada",
    angle: "Trades in demand, pay, TFWP and PNP pathways.",
    referenceUrls: ["https://www.indeed.com", "https://www.canada.ca"],
  },
  {
    keyword: "jobs in canada for nepali",
    workingTitle: "Jobs in Canada for Nepalis: Pathways, Pay and How to Apply",
    category: "canada",
    angle: "Express Entry, TFWP, study route, Nepali community in Canada.",
    referenceUrls: ["https://www.canada.ca"],
  },
  // Australia
  {
    keyword: "farm work in australia for foreigners",
    workingTitle: "Farm Work in Australia for Foreigners: PALM, Pay and How to Apply",
    category: "australia",
    angle: "PALM scheme, pay, regions, how to apply legally.",
    referenceUrls: ["https://www.dewr.gov.au", "https://www.indeed.com"],
  },
  {
    keyword: "aged care jobs in australia for foreigners",
    workingTitle: "Aged Care Jobs in Australia for Foreigners: Visa, Pay and Training",
    category: "australia",
    angle: "Aged care visa, Certificate III, pay, training.",
    referenceUrls: ["https://www.health.gov.au", "https://www.indeed.com"],
  },
  {
    keyword: "warehouse jobs in australia for foreigners",
    workingTitle: "Warehouse Jobs in Australia for Foreigners: Pay and Visas",
    category: "australia",
    angle: "Warehouse roles, pay, visa options, where to apply.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "chef jobs in australia visa sponsorship",
    workingTitle: "Chef Jobs in Australia With Visa Sponsorship: Pay and Requirements",
    category: "australia",
    angle: "TSS 482 visa, skills assessment, pay.",
    referenceUrls: ["https://immi.homeaffairs.gov.au", "https://www.indeed.com"],
  },
  {
    keyword: "truck driver jobs in australia for foreigners",
    workingTitle: "Truck Driver Jobs in Australia for Foreigners: Licence and Pay",
    category: "australia",
    angle: "HC and MC licences, pay, sponsorship routes.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "cleaning jobs in australia pay",
    workingTitle: "Cleaning Jobs in Australia: Pay, Hours and How to Apply",
    category: "australia",
    angle: "Pay under awards, hours, agencies, where to apply.",
    referenceUrls: ["https://www.indeed.com", "https://www.fairwork.gov.au"],
  },
  {
    keyword: "nursing jobs in australia for foreign nurses",
    workingTitle: "Nursing Jobs in Australia for Foreign Nurses: AHPRA, Pay and Visas",
    category: "australia",
    angle: "AHPRA registration, pay, visa routes.",
    referenceUrls: ["https://www.ahpra.gov.au", "https://www.indeed.com"],
  },
  {
    keyword: "student part time jobs in australia",
    workingTitle: "Part-Time Jobs for Students in Australia: Rules, Pay and Where to Look",
    category: "australia",
    angle: "48-hour fortnight rule, pay, student-friendly roles.",
    referenceUrls: ["https://immi.homeaffairs.gov.au", "https://www.indeed.com"],
  },
  // Europe
  {
    keyword: "caregiver jobs in germany for foreigners",
    workingTitle: "Caregiver Jobs in Germany for Foreigners: Visa, Pay and Language",
    category: "europe",
    angle: "Recognition of qualifications, B1/B2 German, pay.",
    referenceUrls: ["https://www.make-it-in-germany.com", "https://www.indeed.com"],
  },
  {
    keyword: "factory jobs in germany for foreigners",
    workingTitle: "Factory Jobs in Germany for Foreigners: Pay, Visa and How to Apply",
    category: "europe",
    angle: "Sectors hiring, pay, Opportunity Card route.",
    referenceUrls: ["https://www.make-it-in-germany.com", "https://www.indeed.com"],
  },
  {
    keyword: "jobs in germany for english speakers",
    workingTitle: "Jobs in Germany for English Speakers: Sectors, Pay and Visas",
    category: "europe",
    angle: "IT, engineering and English-speaking roles, pay, visas.",
    referenceUrls: ["https://www.make-it-in-germany.com", "https://www.linkedin.com"],
  },
  {
    keyword: "seasonal farm jobs in europe for foreigners",
    workingTitle: "Seasonal Farm Jobs in Europe for Foreigners: Pay and Visas",
    category: "europe",
    angle: "Harvest seasons by country, pay, seasonal work permits.",
    referenceUrls: ["https://ec.europa.eu", "https://www.indeed.com"],
  },
  {
    keyword: "hotel jobs in europe for foreigners",
    workingTitle: "Hotel Jobs in Europe for Foreigners: Roles, Pay and Visas",
    category: "europe",
    angle: "Seasonal resorts, roles, pay, work permits.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "truck driver jobs in europe for foreigners",
    workingTitle: "Truck Driver Jobs in Europe for Foreigners: Licence, Pay and Permits",
    category: "europe",
    angle: "Code 95, pay, permit routes by country.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "nursing jobs in germany for foreign nurses",
    workingTitle: "Nursing Jobs in Germany for Foreign Nurses: Recognition, Language and Pay",
    category: "europe",
    angle: "Recognition process, B2 German, pay.",
    referenceUrls: ["https://www.make-it-in-germany.com"],
  },
  {
    keyword: "jobs in poland for foreigners",
    workingTitle: "Jobs in Poland for Foreigners: Pay, Permits and Where to Apply",
    category: "europe",
    angle: "Work permit process, sectors hiring, pay.",
    referenceUrls: ["https://www.gov.pl", "https://www.indeed.com"],
  },
  // Asia
  {
    keyword: "jobs in singapore for foreigners",
    workingTitle: "Jobs in Singapore for Foreigners: EP, S Pass, Pay and Sectors",
    category: "asia",
    angle: "EP and S Pass criteria, pay, sectors hiring.",
    referenceUrls: ["https://www.mom.gov.sg", "https://www.indeed.com"],
  },
  {
    keyword: "factory jobs in malaysia for foreigners",
    workingTitle: "Factory Jobs in Malaysia for Foreigners: Pay, Permit and How to Apply",
    category: "asia",
    angle: "Sectors, levy, pay, legal channels.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "jobs in japan for foreigners no japanese",
    workingTitle: "Jobs in Japan for Foreigners Without Japanese: Roles and Visas",
    category: "asia",
    angle: "English-friendly roles, SSW route, pay.",
    referenceUrls: ["https://www.jobs-in-japan.com", "https://www.indeed.com"],
  },
  {
    keyword: "hotel jobs in singapore for foreigners",
    workingTitle: "Hotel Jobs in Singapore for Foreigners: Roles and Pay",
    category: "asia",
    angle: "Hotel roles, pay, work pass routes.",
    referenceUrls: ["https://www.mom.gov.sg", "https://www.indeed.com"],
  },
  {
    keyword: "caregiver jobs in japan for foreigners",
    workingTitle: "Caregiver Jobs in Japan for Foreigners: SSW, Training and Pay",
    category: "asia",
    angle: "SSW care worker route, training, pay.",
    referenceUrls: ["https://www.mhlw.go.jp", "https://www.indeed.com"],
  },
  {
    keyword: "jobs in south korea for foreigners",
    workingTitle: "Jobs in South Korea for Foreigners: EPS, E-7 and Pay",
    category: "asia",
    angle: "EPS and E-7 routes, pay, how to apply.",
    referenceUrls: ["https://www.eps.go.kr", "https://www.indeed.com"],
  },
  {
    keyword: "domestic helper jobs in hong kong salary",
    workingTitle: "Domestic Helper Jobs in Hong Kong: Salary, Contract and Rights",
    category: "asia",
    angle: "FDH contract, minimum wage, worker rights.",
    referenceUrls: ["https://www.labour.gov.hk"],
  },
  {
    keyword: "jobs in thailand for foreigners",
    workingTitle: "Jobs in Thailand for Foreigners: Work Permit, Pay and Sectors",
    category: "asia",
    angle: "Work permit process, sectors hiring, pay.",
    referenceUrls: ["https://www.indeed.com"],
  },
  // Gulf
  {
    keyword: "jobs in dubai for nepali",
    workingTitle: "Jobs in Dubai for Nepalis: Demand Letters, Pay and Legal Channels",
    category: "gulf",
    angle: "Demand letter system, DOFE approval, pay, fraud warnings.",
    referenceUrls: ["https://www.dofe.gov.np", "https://www.indeed.com"],
  },
  {
    keyword: "driver jobs in dubai salary",
    workingTitle: "Driver Jobs in Dubai: Salary, Licence and How to Apply",
    category: "gulf",
    angle: "Taxi, delivery and heavy drivers, RTA licence, pay.",
    referenceUrls: ["https://www.rta.ae", "https://www.indeed.com"],
  },
  {
    keyword: "security guard jobs in dubai salary",
    workingTitle: "Security Guard Jobs in Dubai: Salary, Licence and How to Apply",
    category: "gulf",
    angle: "SIRA licence, pay, agencies, legal channels.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "electrician jobs in dubai salary",
    workingTitle: "Electrician Jobs in Dubai: Salary, Requirements and How to Apply",
    category: "gulf",
    angle: "Trade tests, pay, demand letters.",
    referenceUrls: ["https://www.indeed.com", "https://www.dofe.gov.np"],
  },
  {
    keyword: "plumber jobs in dubai salary",
    workingTitle: "Plumber Jobs in Dubai: Salary and How to Apply",
    category: "gulf",
    angle: "Trade skills, pay, legal channels.",
    referenceUrls: ["https://www.indeed.com", "https://www.dofe.gov.np"],
  },
  {
    keyword: "jobs in saudi arabia for nepali",
    workingTitle: "Jobs in Saudi Arabia for Nepalis: Demand Letters, Pay and Legal Channels",
    category: "gulf",
    angle: "Demand letter system, DOFE approval, pay, fraud warnings.",
    referenceUrls: ["https://www.dofe.gov.np"],
  },
  {
    keyword: "jobs in qatar for nepali",
    workingTitle: "Jobs in Qatar for Nepalis: Demand Letters, Pay and Legal Channels",
    category: "gulf",
    angle: "Demand letter system, DOFE approval, pay, fraud warnings.",
    referenceUrls: ["https://www.dofe.gov.np"],
  },
  {
    keyword: "supermarket jobs in dubai salary",
    workingTitle: "Supermarket Jobs in Dubai: Salary, Roles and How to Apply",
    category: "gulf",
    angle: "Cashier, stocker and helper roles, pay, where to apply.",
    referenceUrls: ["https://www.indeed.com"],
  },
  // Korea & Japan
  {
    keyword: "eps korea exam 2026",
    workingTitle: "EPS Korea Exam: Eligibility, Subjects and How to Prepare",
    category: "korea-japan",
    angle: "EPS-TOPIK, pass marks, eligibility, preparation strategy.",
    referenceUrls: ["https://www.eps.go.kr", "https://www.dofe.gov.np"],
  },
  {
    keyword: "eps korea salary and benefits",
    workingTitle: "EPS Korea Salary and Benefits: Pay, Overtime and Insurance",
    category: "korea-japan",
    angle: "Monthly pay, overtime, insurance, contract terms.",
    referenceUrls: ["https://www.eps.go.kr"],
  },
  {
    keyword: "korea work visa for nepali",
    workingTitle: "Korea Work Visa for Nepalis: EPS, E-7 and Other Routes",
    category: "korea-japan",
    angle: "Visa types, requirements, application process.",
    referenceUrls: ["https://www.eps.go.kr", "https://www.dofe.gov.np"],
  },
  {
    keyword: "jobs in japan for nepali",
    workingTitle: "Jobs in Japan for Nepalis: SSW, TITP and Student Routes",
    category: "korea-japan",
    angle: "SSW, TITP and student routes, pay, how to apply.",
    referenceUrls: ["https://www.mhlw.go.jp", "https://www.dofe.gov.np"],
  },
  {
    keyword: "ssw japan visa requirements",
    workingTitle: "SSW Japan Visa: Requirements, Tests and How to Apply",
    category: "korea-japan",
    angle: "14 SSW sectors, skills tests, Japanese level required.",
    referenceUrls: ["https://www.mhlw.go.jp"],
  },
  {
    keyword: "japan student visa part time work",
    workingTitle: "Japan Student Visa: Part-Time Work Rules, Pay and Limits",
    category: "korea-japan",
    angle: "28-hour rule, pay, work permission process.",
    referenceUrls: ["https://www.mofa.go.jp", "https://www.indeed.com"],
  },
  // Nepal
  {
    keyword: "lok sewa exam preparation tips",
    workingTitle: "Lok Sewa Exam Preparation: Syllabus, Books and Strategy",
    category: "nepal",
    angle: "Syllabus, study plan, common mistakes, where to find notices.",
    referenceUrls: ["https://www.psc.gov.np"],
  },
  {
    keyword: "government jobs in nepal for 12 pass",
    workingTitle: "Government Jobs in Nepal for +2 Pass: Posts, Pay and How to Apply",
    category: "nepal",
    angle: "Kharidar, police, army and other +2-level posts, pay, process.",
    referenceUrls: ["https://www.psc.gov.np", "https://growentix.cloud/sarkari-jobs"],
  },
  {
    keyword: "government jobs in nepal for see pass",
    workingTitle: "Government Jobs in Nepal for SEE Pass: Posts and How to Apply",
    category: "nepal",
    angle: "SEE-level posts, eligibility, application process.",
    referenceUrls: ["https://www.psc.gov.np", "https://growentix.cloud/sarkari-jobs"],
  },
  {
    keyword: "nepal army vacancy 2026",
    workingTitle: "Nepal Army Vacancy: Posts, Eligibility and How to Apply",
    category: "nepal",
    angle: "Ranks, physical standards, selection process.",
    referenceUrls: ["https://www.nepalarmy.mil.np"],
  },
  {
    keyword: "nepal police vacancy 2026",
    workingTitle: "Nepal Police Vacancy: Posts, Eligibility and How to Apply",
    category: "nepal",
    angle: "Ranks, physical standards, selection process.",
    referenceUrls: ["https://www.nepalpolice.gov.np"],
  },
  {
    keyword: "teacher vacancy nepal 2026",
    workingTitle: "Teacher Vacancy in Nepal: TSC, Eligibility and How to Apply",
    category: "nepal",
    angle: "TSC licence, levels, application process.",
    referenceUrls: ["https://www.tsc.gov.np"],
  },
  {
    keyword: "bank jobs in nepal 2026",
    workingTitle: "Bank Jobs in Nepal: Vacancies, Eligibility and How to Apply",
    category: "nepal",
    angle: "Commercial bank exams, eligibility, pay.",
    referenceUrls: ["https://growentix.cloud/sarkari-jobs", "https://www.indeed.com"],
  },
  {
    keyword: "ngo jobs in nepal",
    workingTitle: "NGO Jobs in Nepal: Roles, Pay and Where to Apply",
    category: "nepal",
    angle: "INGO and local NGO roles, pay, where vacancies are posted.",
    referenceUrls: ["https://reliefweb.int", "https://growentix.cloud/sarkari-jobs"],
  },
  // Remote
  {
    keyword: "online jobs from home nepal",
    workingTitle: "Online Jobs From Home in Nepal: Real Options and Pay",
    category: "remote",
    angle: "Freelancing, tutoring, VA and other real options, pay, payments.",
    referenceUrls: ["https://www.upwork.com", "https://www.fiverr.com"],
  },
  {
    keyword: "freelancing in nepal for beginners",
    workingTitle: "Freelancing in Nepal for Beginners: Skills, Platforms and Payments",
    category: "remote",
    angle: "Starter skills, platforms, how to get paid in Nepal.",
    referenceUrls: ["https://www.upwork.com", "https://www.fiverr.com"],
  },
  {
    keyword: "content writing jobs from home",
    workingTitle: "Content Writing Jobs From Home: Pay, Skills and Where to Find Work",
    category: "remote",
    angle: "Niches, pay, platforms, building a portfolio.",
    referenceUrls: ["https://www.upwork.com", "https://www.fiverr.com"],
  },
  {
    keyword: "graphic design jobs from home",
    workingTitle: "Graphic Design Jobs From Home: Pay, Portfolio and Clients",
    category: "remote",
    angle: "Portfolio building, pay, finding clients.",
    referenceUrls: ["https://www.fiverr.com", "https://www.upwork.com"],
  },
  {
    keyword: "transcription jobs from home",
    workingTitle: "Transcription Jobs From Home: Pay, Speed and Legit Platforms",
    category: "remote",
    angle: "Pay per audio hour, typing speed, legit platforms vs scams.",
    referenceUrls: ["https://www.rev.com", "https://www.upwork.com"],
  },
  {
    keyword: "online tutoring jobs from home",
    workingTitle: "Online Tutoring Jobs From Home: Pay, Subjects and Platforms",
    category: "remote",
    angle: "Subjects in demand, pay, platforms, getting students.",
    referenceUrls: ["https://www.preply.com", "https://www.upwork.com"],
  },
  {
    keyword: "social media manager jobs remote",
    workingTitle: "Social Media Manager Jobs (Remote): Skills, Pay and How to Get Hired",
    category: "remote",
    angle: "Skills, pay, portfolio, finding clients.",
    referenceUrls: ["https://www.linkedin.com", "https://www.indeed.com"],
  },
  {
    keyword: "data analyst jobs remote no experience",
    workingTitle: "Data Analyst Jobs (Remote) With No Experience: Skills, Pay and Path",
    category: "remote",
    angle: "Starter skills, portfolio projects, pay, breaking in.",
    referenceUrls: ["https://www.linkedin.com", "https://www.indeed.com"],
  },
  // Career
  {
    keyword: "how to write a cv for foreign jobs",
    workingTitle: "How to Write a CV for Foreign Jobs: Format, Mistakes and Examples",
    category: "career",
    angle: "CV format for Gulf, Korea and Western employers, ATS, mistakes.",
    referenceUrls: ["https://growentix.cloud/articles"],
  },
  {
    keyword: "interview questions and answers for beginners",
    workingTitle: "Interview Questions and Answers for Beginners: 20 Common Ones",
    category: "career",
    angle: "Common questions, strong answers, mistakes to avoid.",
    referenceUrls: ["https://www.indeed.com"],
  },
  {
    keyword: "how to apply for passport in nepal",
    workingTitle: "How to Apply for a Passport in Nepal: Documents, Fee and Process",
    category: "career",
    angle: "Documents, fee, online form, appointment process.",
    referenceUrls: ["https://www.dop.gov.np"],
  },
  {
    keyword: "how to get police report in nepal",
    workingTitle: "How to Get a Police Report in Nepal: Documents, Fee and Process",
    category: "career",
    angle: "Documents, fee, where to apply, processing time.",
    referenceUrls: ["https://www.nepalpolice.gov.np"],
  },
  {
    keyword: "how to write an application letter for a job",
    workingTitle: "How to Write an Application Letter for a Job: Format and Examples",
    category: "career",
    angle: "Letter format, what to include, examples, mistakes.",
    referenceUrls: ["https://growentix.cloud/articles"],
  },
  {
    keyword: "skills to learn for jobs in 2026",
    workingTitle: "Skills to Learn for Jobs in 2026: What Employers Actually Want",
    category: "career",
    angle: "In-demand skills by sector, free ways to learn them.",
    referenceUrls: ["https://growentix.cloud/courses", "https://www.linkedin.com"],
  },
  // Global
  {
    keyword: "highest paying jobs in the world",
    workingTitle: "Highest Paying Jobs in the World: Pay, Training and Demand",
    category: "global",
    angle: "Top-paying roles, training required, demand outlook.",
    referenceUrls: ["https://www.indeed.com", "https://www.linkedin.com"],
  },
  {
    keyword: "jobs in demand in 2026",
    workingTitle: "Jobs in Demand in 2026: Roles, Pay and Where They Are Hiring",
    category: "global",
    angle: "Sectors hiring, pay, regions with the most openings.",
    referenceUrls: ["https://www.linkedin.com", "https://www.indeed.com"],
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
    { json: true, maxTokens: 6000, timeoutMs: 55_000, maxCompletionTokens: 8000 }
  );
  const data = parseAiJson<ArticleJson>(raw);
  if (!data || !data.titleEn || !data.bodyEn || !data.bodyNe) return null;
  return data;
}

export interface RoundupItem {
  titleEn: string;
  excerptEn: string;
  slug: string;
  category: string;
}

function buildRoundupPrompt(items: RoundupItem[]): string {
  const list = items
    .map((it, i) => `${i + 1}. ${it.titleEn} — ${it.excerptEn} (https://growentix.cloud/articles/${it.slug})`)
    .join("\n");
  return `Write a weekly job-news roundup based ONLY on the stories below. Do not invent facts, numbers, dates, or deadlines that are not in the story summaries. This is an editorial digest: a reader should get the week's picture in one read and jump to any story for details.

STORIES THIS WEEK:
${list}

Return JSON with exactly these keys:
- "titleEn": "Weekly Job Roundup: <short theme of the week's biggest story, no numbers>", British English, max 90 characters
- "titleNe": the same headline in natural Nepali (Devanagari script)
- "excerptEn": 1-2 sentence summary, British English
- "excerptNe": the summary in fluent Nepali (Devanagari script)
- "bodyEn": roundup body as HTML using only <h2>, <p>, <ul>, <li>, <strong>, <a> tags. 700-900 words. Structure:
  1. <p> lead — what the week brought, in one paragraph.
  2. <h2>The biggest stories this week</h2> — each story in 2-3 sentences with its key facts, and a link to the full article on Growentix. Link every story to its URL.
  3. <h2>Closing soon</h2> — stories whose summaries mention a near deadline, with the deadline stated. Omit this section if no summary mentions a deadline.
  4. <h2>What to do next</h2> — practical advice: check deadlines, apply only through official channels, never pay anyone for a job.
  5. Short closing <p> — one honest takeaway.
  British English.
- "bodyNe": full Nepali (Devanagari script) version — same structure, natural journalistic Nepali.
- "category": "global"
- "country": null

RULES:
- British English spelling in all English text.
- Write like a human editor: varied sentence rhythm, concrete and practical, no filler openers.
- Banned AI-telltale words: delve, moreover, furthermore, additionally (as sentence starter), tapestry, landscape (as metaphor), "game-changer", "in conclusion". Contractions are fine.
- INLINE LINKS: link every story to its Growentix article URL from the list above. Use ONLY those URLs. Never invent URLs.
- Every claim of fact must come from the story summaries. If a summary does not state a deadline or number, do not state one.
- No emojis. No markdown. HTML only in the body fields.
- Never mention that you are an AI.`;
}

/** Writes the Saturday weekly roundup from the week's published articles. Returns null on failure. */
export async function writeRoundup(items: RoundupItem[]): Promise<ArticleJson | null> {
  const raw = await aiComplete(
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildRoundupPrompt(items) },
    ],
    { json: true, maxTokens: 6000, timeoutMs: 55_000, maxCompletionTokens: 8000 }
  );
  const data = parseAiJson<ArticleJson>(raw);
  if (!data || !data.titleEn || !data.bodyEn || !data.bodyNe) return null;
  return data;
}
