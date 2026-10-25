import { aiComplete, parseAiJson } from "@/lib/ai";

// ---------------------------------------------------------------------------
// Related video courses for articles. Discovery proposes candidates with the
// AI, but NOTHING is stored unless the YouTube oEmbed endpoint confirms the
// video really exists — hallucinated URLs are dropped, never embedded.
// Fail-soft by design: any failure returns [] and the article simply shows
// no videos. Used by /api/cron/article-videos, never by the publish path,
// so video lookup can never block or delay a news batch.
// ---------------------------------------------------------------------------

export interface RelatedVideo {
  title: string;
  url: string;
  videoId: string;
}

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (u.hostname === "youtube.com" || u.hostname.endsWith(".youtube.com")) {
      const id = u.searchParams.get("v");
      return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }
    return null;
  } catch {
    return null;
  }
}

/** Returns the video's real title from YouTube, or null if it doesn't exist. */
async function verifyVideo(videoId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${videoId}`
      )}&format=json`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; GrowentixBot/1.0)" },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { title?: unknown };
    return typeof data.title === "string" && data.title ? data.title : null;
  } catch {
    return null;
  }
}

/**
 * Finds up to 3 real YouTube tutorial/course videos matching an article
 * headline. Returns [] when none verify — never a guessed or dead link.
 */
export async function findRelatedVideos(
  articleTitleEn: string
): Promise<RelatedVideo[]> {
  try {
    const raw = await aiComplete(
      [
        {
          role: "system",
          content:
            "You are a research assistant for Growentix. You never invent URLs. Output JSON only.",
        },
        {
          role: "user",
          content: `List up to 3 real, publicly available YouTube tutorial or course videos that directly teach or explain the topic of this job-news headline. Prefer well-known courses and channels. If no genuinely relevant course video exists, return []. Never invent a URL or video ID — only include videos you are confident exist.\n\nHeadline: ${articleTitleEn}\n\nReturn a JSON array with exactly these keys per item: "title", "url".`,
        },
      ],
      { json: true, maxTokens: 800, timeoutMs: 25000 }
    );
    const candidates = parseAiJson<{ title: string; url: string }[]>(raw);
    if (!Array.isArray(candidates)) return [];
    const seen = new Set<string>();
    const verified = await Promise.all(
      candidates.slice(0, 5).map(async (c) => {
        if (!c?.url) return null;
        const videoId = extractVideoId(c.url);
        if (!videoId || seen.has(videoId)) return null;
        seen.add(videoId);
        const title = await verifyVideo(videoId);
        if (!title) return null;
        return {
          title,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          videoId,
        } satisfies RelatedVideo;
      })
    );
    const out: RelatedVideo[] = [];
    for (const v of verified) {
      if (v && out.length < 3) out.push(v);
    }
    return out;
  } catch {
    return [];
  }
}
