import { NextRequest, NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { aiComplete } from "@/lib/ai";

export const maxDuration = 60;

const PLATFORM_GUIDE = `You are the Growentix Support Assistant for growentix.cloud — a daily job news and vacancy notices site for Nepal and abroad. Answer ONLY from the guide below. Be friendly, clear and concise (2-6 short sentences or a short numbered list of steps). If something is not in the guide, say you are not sure and suggest emailing support@growentix.cloud. Reply in the same language style the user used (English or Romanized Nepali mix).

WHAT GROWENTIX IS:
- Growentix publishes daily job news and vacancy notices: government vacancies in Nepal, Gulf jobs, Korea & Japan (EPS), USA/UK/Canada/Australia/Europe jobs, remote work and work-abroad updates. Every article links its source.
- There are no accounts, no logins and no job applications on Growentix — you read the news here, then apply through the official link in the article (government portal, employer site or recruitment board).

FINDING NEWS:
- Home (/) shows the latest job news and live government vacancy notices.
- News (/articles) lists all job news articles, newest first.
- Search (/search) is the only search box — search by keyword or filter by category.
- Explore (/explore) shows international jobs only (USA, UK, Canada, Australia, Europe, Asia, Gulf, Korea & Japan, Remote, Work Abroad).
- Government notices (/sarkari-jobs) lists live Nepal government vacancies with deadlines, seats and official notice links. Expired notices show as Closed.
- Articles open in English or Nepali — use the language picker at the top of the article page.
- Free video courses (/courses) — real YouTube courses matched to job topics, free to watch.

APPLYING FOR A JOB:
- Open the article or notice, read the deadline, eligibility and documents, then tap the official link (Apply / official notice) — applications happen on the official site, never on Growentix.
- Deadlines are shown as exact dates. If a fee, seat count or date is not stated, the article says it has not been announced — never guess.
- Safety: NEVER pay anyone to apply or get a job — genuine recruiters never charge applicants. Beware of agents asking for money; apply only through official portals.

GENERAL:
- New articles publish daily, plus fresh job news through the day.
- Contact: support@growentix.cloud.`;

// Keyword fallbacks used until an AI key is configured (or if the AI is unreachable).
const FALLBACKS: Array<{ match: RegExp; answer: string }> = [
  { match: /apply|application/i, answer: "To apply: open the article or notice, read the deadline and eligibility, then tap the official link (Apply / official notice). Applications happen on the official site — Growentix itself takes no applications." },
  { match: /deadline|date|last date/i, answer: "Deadlines are shown as exact dates on each article and government notice. If a date is not stated, the article says it has not been announced." },
  { match: /search|find/i, answer: "Use Search (/search) — it is the only search box. Search by keyword or filter by category. Explore (/explore) shows international jobs only." },
  { match: /government|sarkari/i, answer: "Live Nepal government vacancies are on /sarkari-jobs, with deadlines, seats and official notice links. Expired notices show as Closed." },
  { match: /course|video|learn/i, answer: "Free video courses are on /courses — real YouTube courses matched to job topics, free to watch, no account needed." },
  { match: /language|nepali|english/i, answer: "Articles open in English or Nepali — use the language picker at the top of the article page." },
  { match: /safe|scam|fraud|pay.*(fee|money)|report/i, answer: "Safety first: NEVER pay anyone to apply or receive a job — genuine recruiters never charge applicants. Apply only through official portals." },
  { match: /human|person|email|phone|contact/i, answer: "You can reach the Growentix team at support@growentix.cloud. We usually reply within one working day." },
];

export async function POST(req: NextRequest) {
  if (!rateLimit(clientKey("ai-support", req), 15, 60_000)) {
    return NextResponse.json({ error: "Too many questions. Wait a minute and try again." }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  const question = String(body.question || "").trim().slice(0, 500);
  if (question.length < 2) return NextResponse.json({ error: "Type your question first." }, { status: 400 });

  const llm = await aiComplete(
    [
      { role: "system", content: PLATFORM_GUIDE },
      { role: "user", content: question },
    ],
    { maxTokens: 450 }
  );
  if (llm) {
    // Plain-text chat UI: strip markdown the model may add.
    const clean = llm.replace(/\*\*/g, "").replace(/__/g, "").replace(/`/g, "").replace(/^#{1,6}\s+/gm, "").trim();
    return NextResponse.json({ source: "ai", answer: clean });
  }

  const hit = FALLBACKS.find((f) => f.match.test(question));
  return NextResponse.json({
    source: "smart",
    answer: hit?.answer ?? "I can help with finding job news, government notices, deadlines, courses and safety. Try asking, for example, \"How do I apply for a job?\" — or email support@growentix.cloud for anything else.",
  });
}
