import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/auth";
import { detectUrl, findCacheMatch } from "@/lib/factCheck";
import { runFactCheckWaterfall } from "@/lib/factCheckWaterfall";

// Fact-check claim flow (2026-11-22; Spec 2 waterfall in
// src/lib/factCheckWaterfall.ts; one-box redesign 2026-11-22: the input is
// a claim OR a link).
// POST { claim?, url? } -> { assertions, match, externalMatch, preliminary,
//                          wayback, linkedPage, fetchFailed, waterfall }.
// A bare link is detected (detectUrl) and fetched server-side — the page's
// title + readable text are checked like any other claim. A link that will
// not open returns fetchFailed: true and no invented content.
// Cache-first $0 waterfall: Google Fact Check Tools claims.search, then our
// own verified verdicts (Postgres keyword cache). On a miss, and ONLY when
// the optional API keys are configured, Groq extraction -> Tavily basic
// (Serper backup) -> Wayback timestamp -> Groq 70B / Gemini synthesis
// (OpenRouter :free only on 429/failure) produces a PRELIMINARY,
// AI-assisted assessment with citations — clearly labelled, never a
// published verdict. With NO keys set, the run degrades to cache + the
// human-review queue (POST /api/fact-check/submit): an unmatched claim
// gets NO automated verdict at all.
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
  const claimRaw = typeof (data as { claim?: unknown })?.claim === "string"
    ? ((data as { claim: string }).claim ?? "").trim()
    : "";
  const urlRaw = typeof (data as { url?: unknown })?.url === "string"
    ? ((data as { url: string }).url ?? "").trim()
    : "";
  // One search box: the input is claim text OR a link. A link pasted into
  // the claim field (or sent on its own) is detected here too, so direct
  // API callers get the same behaviour as the form.
  let claim = claimRaw;
  let claimUrl: string | undefined;
  if (urlRaw) {
    try {
      const parsed = new URL(urlRaw);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") claimUrl = parsed.href;
    } catch {
      claimUrl = undefined;
    }
  }
  if (!claimUrl && claim) {
    const detected = detectUrl(claim);
    if (detected) {
      claimUrl = detected;
      claim = "";
    }
  }
  if (claim && (claim.length < 10 || claim.length > 1000)) {
    return NextResponse.json(
      { error: "Please paste a claim between 10 and 1000 characters." },
      { status: 400 }
    );
  }
  if (claimUrl && claimUrl.length > 1000) {
    return NextResponse.json({ error: "That link is too long to check." }, { status: 400 });
  }
  if (!claim && !claimUrl) {
    return NextResponse.json(
      { error: "Paste a claim or a link to check." },
      { status: 400 }
    );
  }

  const result = await runFactCheckWaterfall({
    claim,
    claimUrl,
    findOwnCache: async (checkableText: string) => {
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
      return findCacheMatch(checkableText, rows);
    },
  });

  return NextResponse.json({
    assertions: result.assertions,
    match: result.match,
    externalMatch: result.externalMatch,
    preliminary: result.preliminary,
    wayback: result.wayback,
    linkedPage: result.linkedPage,
    fetchFailed: result.fetchFailed,
    waterfall: { enabled: result.automatedEnabled, steps: result.steps },
  });
}
