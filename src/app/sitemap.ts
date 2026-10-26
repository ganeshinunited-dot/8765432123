import { db } from "@/lib/db";
import { SARKARI_JOBS, SARKARI_UPDATED, sarkariSlug } from "@/data/sarkariJobs";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://growentix.cloud";

  const staticPages = ["", "/sarkari-jobs", "/articles", "/explore", "/about", "/privacy", "/terms", "/courses", "/support"].map(
    (path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: path === "" ? 1 : 0.8 })
  );

  // City job pages — content changes when the notice data changes.
  const cityPages = ["kathmandu", "biratnagar", "pokhara", "butwal", "janakpur", "nepalgunj", "birgunj"].map((city) => ({
    url: `${base}/jobs-in-${city}`, lastModified: new Date(SARKARI_UPDATED),
    changeFrequency: "weekly" as const, priority: 0.8,
  }));

  const sarkariPages = SARKARI_JOBS.map((j) => ({
    url: `${base}/sarkari-jobs/${sarkariSlug(j)}`, lastModified: new Date(SARKARI_UPDATED),
    changeFrequency: "weekly" as const, priority: 0.8,
  }));

  const articles = await db.article.findMany({
    select: { slug: true, updatedAt: true },
    orderBy: { publishedAt: "desc" },
    take: 2000,
  });
  const articlePages = articles.map((a) => ({
    url: `${base}/articles/${a.slug}`, lastModified: a.updatedAt,
    changeFrequency: "daily" as const, priority: 0.8,
  }));

  return [...staticPages, ...cityPages, ...sarkariPages, ...articlePages];
}
