import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { articleSlug, titlesAreDuplicates } from "@/lib/articles";
import {
  writeGuide,
  writeRoundup,
  GUIDE_SPECS,
  type ArticleJson,
  type RoundupItem,
} from "@/lib/articleWriter";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ---------------------------------------------------------------------------
// Daily evergreen guides + Saturday weekly roundup.
// Split out of /api/cron/daily-articles: guides and the roundup are bigger
// AI jobs (800-1000 words x 2 languages) and were starved when sharing one
// 60s Hobby function budget with the news batch — the news jobs (smaller)
// always finished while the bigger jobs hit the AI timeout / token cap.
// This route gets its own 60s budget at 06:30 NPT, after the news batch.
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

  const existing = await db.article.findMany({
    select: { titleEn: true },
    orderBy: { publishedAt: "desc" },
    take: 400,
  });
  const seenTitles = existing.map((e) => e.titleEn.toLowerCase());

  // Two evergreen guides a day — first two long-tail keywords not yet published.
  // Self-healing: a missed day is picked up by the next run.
  const nextGuides = GUIDE_SPECS.filter(
    (g) => !seenTitles.some((t) => t.includes(g.keyword.toLowerCase()))
  ).slice(0, 2);

  // Saturday weekly roundup: digest of the last 7 days' articles.
  // Deterministic slug so a retry never publishes a second roundup.
  const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const roundupSlug = `weekly-job-roundup-${todayStr}`;
  let roundupItems: RoundupItem[] = [];
  if (new Date().getDay() === 6) {
    const existingRoundup = await db.article.findUnique({ where: { slug: roundupSlug }, select: { id: true } });
    if (!existingRoundup) {
      const week = await db.article.findMany({
        where: { publishedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
        orderBy: { publishedAt: "desc" },
        take: 12,
        select: { titleEn: true, excerptEn: true, slug: true, category: true },
      });
      roundupItems = week.filter((a) => !a.slug.startsWith("weekly-job-roundup-"));
    }
  }

  // Write: one AI call per guide + roundup (parallel).
  const written = await Promise.allSettled([
    ...nextGuides.map((g) => writeGuide(g).then((d) => ({ guide: true as const, spec: g, data: d }))),
    ...(roundupItems.length >= 4
      ? [writeRoundup(roundupItems).then((d) => ({ roundup: true as const, data: d }))]
      : []),
  ]);

  // Publish.
  const dateStr = todayStr;
  let published = 0;
  const titles: string[] = [];
  let guidesPublished = 0;
  let roundupsPublished = 0;
  for (let idx = 0; idx < written.length; idx++) {
    const r = written[idx];
    if (r.status !== "fulfilled" || !r.value) continue;
    const v = r.value as
      | { guide: true; spec: (typeof GUIDE_SPECS)[number]; data: ArticleJson | null }
      | { roundup: true; data: ArticleJson | null };
    const isGuide = typeof v === "object" && v !== null && "guide" in v;
    const isRoundup = typeof v === "object" && v !== null && "roundup" in v;
    const data = (v as { data: ArticleJson | null }).data;
    if (!data) continue;
    // Belt-and-suspenders: the AI rewrites titles, so re-check the FINAL
    // title against existing titles and this batch's own titles before
    // publishing — catches duplicates the keyword check missed.
    // Roundups and guides are exempt from the news title dedupe: every
    // roundup shares the "Weekly Job Roundup" title stem by design (the
    // deterministic weekly slug + existence check already guard it), and
    // guide topics are pre-filtered by keyword above. The trigram rule
    // would otherwise flag every future roundup and same-family guide
    // (e.g. "data entry jobs from home") as a duplicate forever.
    const skipDedupe = isRoundup || isGuide;
    if (
      !skipDedupe &&
      (seenTitles.some((t) => titlesAreDuplicates(data.titleEn, t)) ||
        titles.some((t) => titlesAreDuplicates(data.titleEn, t)))
    ) {
      continue;
    }
    const category = isGuide
      ? (v as { spec: (typeof GUIDE_SPECS)[number] }).spec.category
      : "global";
    let slug = `${articleSlug(data.titleEn) || "job-news"}-${dateStr}`;
    if (isRoundup) slug = roundupSlug;
    let n = 2;
    while (await db.article.findUnique({ where: { slug }, select: { id: true } })) {
      slug = `${articleSlug(data.titleEn) || "job-news"}-${dateStr}-${n++}`;
    }
    await db.article.create({
      data: {
        slug,
        category,
        country: data.country || null,
        titleEn: data.titleEn.slice(0, 200),
        titleNe: data.titleNe || data.titleEn,
        excerptEn: (data.excerptEn || "").slice(0, 500),
        excerptNe: data.excerptNe || data.excerptEn || "",
        bodyEn: data.bodyEn,
        bodyNe: data.bodyNe,
        sources: isGuide
          ? (v as { spec: (typeof GUIDE_SPECS)[number] }).spec.referenceUrls
          : roundupItems.map((a) => `https://growentix.cloud/articles/${a.slug}`),
        publishedAt: new Date(),
      },
    });
    published++;
    if (isGuide) guidesPublished++;
    if (isRoundup) roundupsPublished++;
    titles.push(data.titleEn);
  }

  // Purge ISR cache so the new guides / roundup show immediately.
  if (published > 0) {
    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath("/explore");
  }

  return NextResponse.json({
    ok: true,
    published,
    guidesPublished,
    roundupsPublished,
    titles,
  });
}
