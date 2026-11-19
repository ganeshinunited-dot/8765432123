// ---------------------------------------------------------------------------
// Per-article FAQ (GEO Step 5, plan §6). The daily builder writes a short
// FAQ block (2–5 genuine questions) at the very end of an article body,
// after the closing "Sources:" paragraph. This module extracts it at render
// time so the page can show it as its own section and emit FAQPage schema
// from exactly the same questions and answers — the schema always matches
// the visible content.
//
// Strict by design: the block must be the LAST content in the body and
// consist of exactly 2–5 <h3>question</h3><p>answer</p> pairs, one paragraph
// per answer. Anything else after the H2 (another heading, a table, a
// stray paragraph, a question without "?") means the block is NOT parsed —
// the body renders untouched and no FAQ schema is emitted. Answers are
// never invented here: the builder writes them from the article's own
// sources at publish time. Old articles simply have no FAQ block, so they
// show no FAQ section and no FAQPage schema.
// ---------------------------------------------------------------------------

export interface FaqItem {
  /** Plain-text question (ends with "?"). */
  question: string;
  /** Plain-text answer, for FAQPage schema. */
  answer: string;
  /** Answer HTML as written in the body, for rendering (may hold a link). */
  answerHtml: string;
}

export interface FaqResult {
  faqs: FaqItem[];
  /** Body with the FAQ block removed (unchanged when nothing parsed). */
  bodyWithoutFaq: string;
}

const MIN_FAQS = 2;
const MAX_FAQS = 5;
const MAX_QUESTION_CHARS = 200;
const MAX_ANSWER_CHARS = 600;

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
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

export function extractFaqs(bodyEn: string): FaqResult {
  const none: FaqResult = { faqs: [], bodyWithoutFaq: bodyEn };

  const h2Match = bodyEn.match(/<h2[^>]*>\s*frequently asked questions\s*<\/h2>/i);
  if (!h2Match || h2Match.index === undefined) return none;
  const start = h2Match.index;
  const rest = bodyEn.slice(start + h2Match[0].length);

  // Everything after the H2 must be 2–5 h3+p pairs and nothing else.
  // Any gap between pairs, or any trailing content, rejects the block.
  const pairRe = /\s*<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  const faqs: FaqItem[] = [];
  let consumed = 0;
  let m: RegExpExecArray | null;
  while ((m = pairRe.exec(rest)) !== null) {
    if (m.index !== consumed) return none;
    const question = stripHtml(m[1]);
    const answer = stripHtml(m[2]);
    if (!question.endsWith("?") || question.length > MAX_QUESTION_CHARS) return none;
    if (!answer || answer.length > MAX_ANSWER_CHARS) return none;
    faqs.push({ question, answer, answerHtml: m[2].trim() });
    consumed = pairRe.lastIndex;
  }

  if (faqs.length < MIN_FAQS || faqs.length > MAX_FAQS) return none;
  if (rest.slice(consumed).trim() !== "") return none;

  return { faqs, bodyWithoutFaq: bodyEn.slice(0, start) };
}
