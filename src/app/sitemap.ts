import { db } from "@/lib/db";
import { INDUSTRIES } from "@/lib/articles";
import { SARKARI_JOBS, SARKARI_UPDATED, sarkariSlug } from "@/data/sarkariJobs";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://growentix.cloud";

  // /remote-jobs is intentionally NOT in the sitemap: it is a byte-identical
  // duplicate of /remote (noindex + canonical to /remote, GEO Step 10).
  const staticPages = ["", "/jobs", "/sarkari-jobs", "/articles", "/explore", "/countries", "/government-jobs", "/private-jobs", "/industries", "/companies", "/for-employers", "/about", "/privacy", "/terms", "/courses", "/support", "/contact", "/editorial-policy", "/verification-policy", "/editorial-team", "/authors/ganesh-karki", "/faq", "/safety", "/tech-ai", "/popmusic", "/nepal", "/gulf", "/korea-japan", "/usa", "/uk", "/canada", "/australia", "/europe", "/asia", "/work-abroad", "/remote", "/global", "/career"].map(
    (path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: path === "" ? 1 : 0.8 })
  );

  // Industry pages — one per industry with 5+ job articles (Batch 2).
  // /jobs/[slug] is intentionally NOT in the sitemap: it is a duplicate
  // of /articles/[slug] (canonical + noindex).
  const industryPages = INDUSTRIES.map((i) => ({
    url: `${base}/industries/${i.slug}`, lastModified: new Date(),
    changeFrequency: "daily" as const, priority: 0.8,
  }));

  // City job pages — content changes when the notice data changes.
  const cityPages = ["kathmandu", "biratnagar", "pokhara", "butwal", "janakpur", "nepalgunj", "birgunj"].map((city) => ({
    url: `${base}/jobs-in-${city}`, lastModified: new Date(SARKARI_UPDATED),
    changeFrequency: "weekly" as const, priority: 0.8,
  }));

  // Expired legacy notices leave the sitemap (same deadline rule as the
  // homepage live count, Asia/Kathmandu date). sj-112/sj-113 are two
  // distinct posts (5th vs 4th level facilitator, same deadline) — both
  // expire out through this filter, so no separate dedupe is needed.
  const todayNpt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kathmandu", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const liveSarkariJobs = SARKARI_JOBS.filter((j) => j.deadline >= todayNpt);
  const sarkariPages = liveSarkariJobs.map((j) => ({
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

  // Verified company profiles only — pending/rejected/expired companies
  // never appear (their profile pages are 404 by design).
  const verifiedCompanies = await db.company.findMany({
    where: { verificationStatus: "VERIFIED" },
    select: { slug: true, updatedAt: true, verificationExpiresAt: true },
  });
  const companyPages = verifiedCompanies
    .filter((c) => !c.verificationExpiresAt || new Date(c.verificationExpiresAt).getTime() > Date.now())
    .map((c) => ({
      url: `${base}/companies/${c.slug}`, lastModified: c.updatedAt,
      changeFrequency: "daily" as const, priority: 0.8,
    }));

  return [...staticPages, ...industryPages, ...cityPages, ...sarkariPages, ...articlePages, ...companyPages];
}
