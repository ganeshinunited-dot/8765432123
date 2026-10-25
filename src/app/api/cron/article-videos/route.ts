import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { findRelatedVideos } from "@/lib/articleVideos";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ---------------------------------------------------------------------------
// Related-video fill pass. Triggered by Vercel Cron every morning after the
// news batch: finds recent articles with no videos yet, proposes matching
// YouTube course videos, verifies each one live via oEmbed, and stores only
// the verified ones. Never touches the publish path — a failure here only
// means an article shows no videos, never a missing or delayed article.
// Idempotent: articles that already have videos are skipped; articles older
// than 3 days are never revisited, so no-video articles stop being retried.
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.AI_API_KEY) {
    return NextResponse.json({ error: "AI not configured" }, { status: 500 });
  }

  const since = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const recent = await db.article.findMany({
    where: { publishedAt: { gte: since } },
    orderBy: { publishedAt: "desc" },
    take: 20,
    select: { id: true, slug: true, titleEn: true, videos: true },
  });
  const pending = recent
    .filter((a) => !Array.isArray(a.videos) || a.videos.length === 0)
    .slice(0, 8);

  const settled = await Promise.allSettled(
    pending.map(async (a) => {
      const videos = await findRelatedVideos(a.titleEn);
      if (videos.length === 0) return { slug: a.slug, videos: 0 };
      await db.article.update({
        where: { id: a.id },
        data: { videos: JSON.parse(JSON.stringify(videos)) },
      });
      revalidatePath(`/articles/${a.slug}`);
      return { slug: a.slug, videos: videos.length };
    })
  );
  const results = settled.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : { slug: pending[i].slug, videos: 0, error: true }
  );
  const updated = results.filter((r) => r.videos > 0).length;

  revalidatePath("/articles");

  return NextResponse.json({
    ok: true,
    checked: pending.length,
    updated,
    results,
  });
}
