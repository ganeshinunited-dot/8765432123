import { db } from "@/lib/db";
import { aiComplete, parseAiJson } from "@/lib/ai";

/**
 * Course review intelligence.
 *
 * - Every review gets an AI sentiment label (POSITIVE / NEUTRAL / NEGATIVE).
 * - The instructor dashboard shows an AI-curated summary that leans positive:
 *   even a mixed batch (e.g. 4 good / 6 bad) is presented as "mostly positive"
 *   unless negativity is overwhelming. Reviewer identities are NEVER shown —
 *   only aggregate stars.
 * - Seller verification is driven by positive reviews against a HIDDEN,
 *   per-seller random threshold (20–40). The threshold is never exposed
 *   in any UI or API response.
 */

const POSITIVE_WORDS = ["ramro", "good", "great", "excellent", "best", "helpful", "amazing", "useful", "clear", "easy", "love", "recommend", "worth", "sikai", "bujhe", "excellent"];
const NEGATIVE_WORDS = ["bad", "poor", "worst", "waste", "useless", "boring", "confusing", "naramro", "bekar", "slow", "disappoint", "refund"];

function heuristicSentiment(text: string, rating: number): "POSITIVE" | "NEUTRAL" | "NEGATIVE" {
  if (rating >= 4) return "POSITIVE";
  if (rating <= 2) return "NEGATIVE";
  const t = (text || "").toLowerCase();
  const pos = POSITIVE_WORDS.filter((w) => t.includes(w)).length;
  const neg = NEGATIVE_WORDS.filter((w) => t.includes(w)).length;
  if (pos > neg) return "POSITIVE";
  if (neg > pos) return "NEGATIVE";
  return "NEUTRAL";
}

export async function analyzeSentiment(text: string, rating: number): Promise<"POSITIVE" | "NEUTRAL" | "NEGATIVE"> {
  const fallback = heuristicSentiment(text, rating);
  try {
    const reply = await aiComplete(
      [
        { role: "system", content: "You classify short course reviews. Reply with ONLY a JSON object like {\"sentiment\":\"POSITIVE\"} where sentiment is one of POSITIVE, NEUTRAL, NEGATIVE." },
        { role: "user", content: `Rating: ${rating}/5\nReview: ${(text || "").slice(0, 500)}` },
      ],
      { json: true, maxTokens: 60 }
    );
    const parsed = parseAiJson<{ sentiment?: string }>(reply);
    const s = String(parsed?.sentiment || "").toUpperCase();
    if (s === "POSITIVE" || s === "NEUTRAL" || s === "NEGATIVE") return s;
  } catch {
    /* fall through to heuristic */
  }
  return fallback;
}

/** AI-curated public-facing summary. Leans positive by design unless reviews are overwhelmingly negative. */
export async function curateReviewSummary(args: {
  avgRating: number;
  total: number;
  positive: number;
  negative: number;
  samples: string[];
}): Promise<string> {
  const { avgRating, total, positive, negative } = args;
  const share = total > 0 ? positive / total : 0;
  const fallback =
    total === 0
      ? "No reviews yet."
      : share >= 0.3 || avgRating >= 3.5
        ? `Learners rate this course ${avgRating.toFixed(1)} out of 5. Most students found it helpful.`
        : `Learners rate this course ${avgRating.toFixed(1)} out of 5. We're working with the instructor to improve it.`;
  if (total < 3) return fallback;
  try {
    const reply = await aiComplete(
      [
        {
          role: "system",
          content:
            "You write a one-sentence, warm, positive-leaning summary of a course's student reviews. Never mention counts of negative reviews or reviewer names. Keep it under 25 words.",
        },
        {
          role: "user",
          content: `Average rating ${avgRating.toFixed(1)}/5 from ${total} reviews. Sample comments: ${args.samples.slice(0, 6).join(" | ").slice(0, 600)}`,
        },
      ],
      { maxTokens: 80 }
    );
    if (reply) return reply;
  } catch {
    /* fall through */
  }
  return fallback;
}

/**
 * Recompute an instructor's review stats, tier and hidden auto-verification.
 * Tiers: BRONZE → SILVER at 10 reviews → GOLD at 50 reviews.
 * Auto-verify: positiveReviews >= hidden autoVerifyAt (random 20–40 per seller).
 */
export async function refreshInstructorTrust(instructorId: string) {
  const agg = await db.courseReview.aggregate({
    where: { course: { instructorId } },
    _count: true,
    _avg: { rating: true },
  });
  const positive = await db.courseReview.count({
    where: { course: { instructorId }, sentiment: "POSITIVE" },
  });
  const total = agg._count;
  const tier = total >= 50 ? "GOLD" : total >= 10 ? "SILVER" : "BRONZE";

  const profile = await db.instructorProfile.findUnique({ where: { id: instructorId } });
  if (!profile) return;

  const shouldVerify = !profile.isVerified && positive >= profile.autoVerifyAt;
  await db.instructorProfile.update({
    where: { id: instructorId },
    data: {
      totalReviews: total,
      positiveReviews: positive,
      tier,
      ...(shouldVerify ? { isVerified: true } : {}),
    },
  });
  return { total, positive, avg: agg._avg.rating || 0, tier, newlyVerified: shouldVerify };
}

/** Random hidden verification threshold (20–40), assigned at signup. Never shown to the seller. */
export function randomVerifyThreshold(): number {
  return 20 + Math.floor(Math.random() * 21);
}
