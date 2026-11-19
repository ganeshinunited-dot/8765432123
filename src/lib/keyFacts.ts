// ---------------------------------------------------------------------------
// Key Facts box (GEO Step 2, plan §2/§3). Derives a compact, honest summary
// for the top of every article page from data that already exists — nothing
// is invented.
//
// Two tiers:
//  1. Job articles: the summary table already written near the top of
//     the body (a 2-column label/value table — "At a glance", "Detail", or
//     no header at all) is parsed and its rows are whitelisted into
//     canonical Key Facts labels. The table is removed from the body at
//     render time so it never appears twice. Multi-column tables (role
//     lists, department splits, timelines) are never touched: only a
//     2-column table with at least 2 whitelisted rows qualifies. Any row
//     whose label is not in the whitelist is dropped, never guessed.
//  2. Every article: derived rows from fields the Article model already
//     has — section, country, published/updated dates, the apply-by date
//     from applyByDate(), open/closed status, and the verification date.
//     A field with no data is simply omitted — there is no "Not disclosed"
//     filler, and no salary/employer/positions row appears unless the
//     article itself states it.
// ---------------------------------------------------------------------------

export interface KeyFact {
  label: string;
  value: string;
}

/** Canonical label -> display order. Only these labels ever reach the box. */
const LABEL_MAP: Record<string, string> = {
  organisation: "Employer",
  organization: "Employer",
  employer: "Employer",
  post: "Positions",
  posts: "Positions",
  totalposts: "Positions",
  totalslots: "Positions",
  totalseats: "Positions",
  pay: "Salary",
  paypermonth: "Salary",
  salary: "Salary",
  stipend: "Stipend",
  applicationdates: "Application dates",
  applyonline: "Application dates",
  lastdate: "Deadline",
  deadline: "Deadline",
  applicationdeadline: "Deadline",
  applicationroute: "How to apply",
  apply: "How to apply",
  howtoapply: "How to apply",
  applicationmode: "How to apply",
  applicationfee: "Fee",
  examfee: "Fee",
  fee: "Fee",
  qualification: "Eligibility",
  eligibility: "Eligibility",
  agelimit: "Age limit",
  upperagelimit: "Age limit",
  selection: "Selection",
  notification: "Notice",
  advertisement: "Notice",
  advertisements: "Notice",
  advt: "Notice",
  notice: "Notice",
  examdate: "Exam date",
  examinationdates: "Exam date",
  preliminaryexam: "Exam date",
  interview: "Interview",
  coursebegins: "Course begins",
  trainingperiod: "Training",
  tenure: "Tenure",
};

const LABEL_ORDER: string[] = [
  "Employer",
  "Positions",
  "Salary",
  "Stipend",
  "Application dates",
  "Deadline",
  "How to apply",
  "Eligibility",
  "Age limit",
  "Fee",
  "Selection",
  "Exam date",
  "Interview",
  "Notice",
  "Course begins",
  "Training",
  "Tenure",
];

const MAX_PARSED_ROWS = 8;
const MAX_FACTS = 12;
const MAX_VALUE_CHARS = 220;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeLabel(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function formatShortDate(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function formatLongDate(iso: string): string {
  const [y, m, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, day)));
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

export interface KeyFactsInput {
  isJob: boolean;
  country: string | null;
  categoryLabel: string;
  publishedAt: Date;
  updatedAt: Date;
  verifiedAt: Date | null;
  /** ISO apply-by date from applyByDate(), or null. */
  deadline: string | null;
  closed: boolean;
}

export interface KeyFactsResult {
  facts: KeyFact[];
  /** Body with the parsed summary table removed (unchanged when nothing parsed). */
  bodyWithoutSummaryTable: string;
}

/**
 * Parse the summary table out of a job article's body. Returns the mapped
 * facts plus the body with that table removed — or null when the body has
 * no qualifying table (then the caller keeps the body untouched and shows
 * derived facts only).
 */
function parseSummaryTable(bodyEn: string): { facts: KeyFact[]; body: string } | null {
  // The summary table is the first 2-column label/value table in the body
  // whose rows whitelist-map to at least 2 known facts. It usually sits
  // right after the lede, but some bodies put a heading before it, so the
  // position is not constrained. Content tables never qualify: role lists
  // and department splits have more than 2 columns or unmapped labels, and
  // timelines map zero rows.
  const tableMatches = [...bodyEn.matchAll(/<table[\s\S]*?<\/table>/gi)];
  for (const tableMatch of tableMatches) {
    const tableHtml = tableMatch[0];
    const tableIndex = tableMatch.index ?? 0;
    const rowMatches = tableHtml.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
    const mapped: KeyFact[] = [];
    const seen = new Set<string>();

    for (const row of rowMatches) {
      const cells = [...row.matchAll(/<t([dh])[^>]*>([\s\S]*?)<\/t\1>/gi)];
      // Header rows (<th><th>) and multi-column rows are not facts.
      if (cells.length !== 2) continue;
      if (cells[0][1].toLowerCase() === "th" && cells[1][1].toLowerCase() === "th") continue;
      const label = LABEL_MAP[normalizeLabel(stripHtml(cells[0][2]))];
      if (!label || seen.has(label)) continue;
      const value = stripHtml(cells[1][2]);
      if (!value) continue;
      seen.add(label);
      mapped.push({
        label,
        value: value.length > MAX_VALUE_CHARS ? `${value.slice(0, MAX_VALUE_CHARS).trimEnd()}…` : value,
      });
    }

    // A real summary table maps at least 2 known rows. Anything less is a
    // content table that happens to share a label — leave it in the body
    // and keep scanning.
    if (mapped.length < 2) continue;

    mapped.sort((a, b) => LABEL_ORDER.indexOf(a.label) - LABEL_ORDER.indexOf(b.label));
    const body = bodyEn.slice(0, tableIndex) + bodyEn.slice(tableIndex + tableHtml.length);
    return { facts: mapped.slice(0, MAX_PARSED_ROWS), body };
  }
  return null;
}

export function extractKeyFacts(bodyEn: string, input: KeyFactsInput): KeyFactsResult {
  const facts: KeyFact[] = [];
  let body = bodyEn;

  if (input.isJob) {
    const parsed = parseSummaryTable(bodyEn);
    if (parsed) {
      facts.push(...parsed.facts);
      body = parsed.body;
    }
  } else {
    facts.push({ label: "Section", value: input.categoryLabel });
  }

  if (input.country) {
    facts.push({ label: "Country", value: input.country });
  }

  if (input.isJob) {
    const hasDatesRow = facts.some((f) => f.label === "Application dates" || f.label === "Deadline");
    if (input.deadline && !hasDatesRow) {
      facts.push({ label: "Deadline", value: formatLongDate(input.deadline) });
    }
    if (input.deadline) {
      facts.push({ label: "Status", value: input.closed ? "Closed" : "Open" });
    }
  }

  facts.push({ label: "Published", value: formatShortDate(input.publishedAt) });
  if (!sameDay(input.publishedAt, input.updatedAt)) {
    facts.push({ label: "Last updated", value: formatShortDate(input.updatedAt) });
  }

  if (input.isJob && input.verifiedAt) {
    facts.push({ label: "Verification", value: `Verified ${formatShortDate(input.verifiedAt)}` });
  }

  return { facts: facts.slice(0, MAX_FACTS), bodyWithoutSummaryTable: body };
}
