import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const SEO_PAGES = [
  "part-time-jobs", "student-jobs", "remote-jobs", "evening-jobs",
  "weekend-jobs", "internships", "jobs-in-kathmandu",
];

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://growentix.cloud";

  const staticPages = ["", "/jobs", "/sarkari-jobs", "/courses", "/course", "/companies", "/signup", "/login", ...SEO_PAGES.map((p) => `/${p}`)].map(
    (path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: path === "" ? 1 : 0.8 })
  );

  const jobs = await db.job.findMany({
    where: { status: "ACTIVE" },
    select: { slug: true, updatedAt: true },
    take: 2000,
  });
  const jobPages = jobs.map((j) => ({
    url: `${base}/jobs/${j.slug}`, lastModified: j.updatedAt,
    changeFrequency: "daily" as const, priority: 0.9,
  }));

  const companies = await db.company.findMany({ select: { slug: true, updatedAt: true }, take: 500 });
  const companyPages = companies.map((c) => ({
    url: `${base}/companies/${c.slug}`, lastModified: c.updatedAt,
    changeFrequency: "weekly" as const, priority: 0.6,
  }));

  return [...staticPages, ...jobPages, ...companyPages];
}
