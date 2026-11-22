import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/auth";
import { extractAssertions, findCacheMatch } from "@/lib/factCheck";

// Fact-check cache lookup (MVP, 2026-11-22).
// POST { claim, url? } -> { assertions, match | null }.
// The lookup searches ONLY our own verified fact-check articles (the
// semantic cache). There is no live web search in v1 (no search API key),
// so an unmatched claim gets NO automated verdict — the client offers to
// queue it for human review via POST /api/fact-check/submit.
export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  if (!rateLimit(clientKey("fact-check", req), 10, 60_000)) {
    return NextResponse.json(
      { error: "Too many checks from this address. Please try again in a minute." },
      { status: 429 }
    );
  }
  const claim = typeof (data as { claim?: unknown })?.claim === "string"
    ? ((data as { claim: string }).claim ?? "").trim()
    : "";
  if (claim.length < 10 || claim.length > 1000) {
    return NextResponse.json(
      { error: "Please paste a claim between 10 and 1000 characters." },
      { status: 400 }
    );
  }

  const assertions = extractAssertions(claim);
  const checkable = assertions.filter((a) => a.checkable);
  if (checkable.length === 0) {
    return NextResponse.json({ assertions, match: null });
  }

  const rows = await db.article.findMany({
    where: { category: "fact-check" },
    orderBy: { publishedAt: "desc" },
    take: 200,
    select: {
      slug: true,
      titleEn: true,
      excerptEn: true,
      factCheckClaim: true,
      factCheckVerdict: true,
      verifiedAt: true,
    },
  });
  const match = findCacheMatch(checkable.map((a) => a.text).join(" "), rows);
  return NextResponse.json({ assertions, match });
}
