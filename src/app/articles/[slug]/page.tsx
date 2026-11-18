import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ArticleView } from "@/components/articles/ArticleView";
import { CommentSection } from "@/components/articles/CommentSection";
import { articleCategoryLabel, applyByDate, isJobCategory } from "@/lib/articles";

export const revalidate = 300; // ISR: serve cached HTML, regenerate in background; admin/cron purge on publish

export async function generateStaticParams() {
  const articles = await db.article.findMany({ select: { slug: true } });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await db.article.findUnique({
    where: { slug },
    select: { titleEn: true, excerptEn: true, updatedAt: true },
  });
  if (!a) return {};
  return {
    title: a.titleEn,
    description: a.excerptEn,
    alternates: { canonical: `https://growentix.cloud/articles/${slug}` },
    openGraph: {
      title: a.titleEn,
      description: a.excerptEn,
      type: "article",
      url: `https://growentix.cloud/articles/${slug}`,
      images: ["https://growentix.cloud/icon.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title: a.titleEn,
      description: a.excerptEn,
      images: ["https://growentix.cloud/icon.svg"],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await db.article.findUnique({ where: { slug } });
  if (!a) notFound();

  const isJob = isJobCategory(a.category);
  const deadline = isJob ? applyByDate(a.titleEn, a.excerptEn, a.bodyEn) : null;
  const todayNpt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kathmandu", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const closed = deadline !== null && deadline < todayNpt;

  // Related stories from the same section — newest first, excluding this
  // article (SEO audit fix, 2026-11-17). Server-side so the client
  // ArticleView only receives plain data. NOTE: the exclusion is done in
  // JS, not with `slug: { not }` in the where clause — the where clause
  // keeps exactly the shape CategoryListing uses (plain category equality),
  // which is proven to work in production.
  const candidates = await db.article.findMany({
    where: { category: a.category },
    orderBy: { publishedAt: "desc" },
    take: 5,
    select: { slug: true, titleEn: true, excerptEn: true, publishedAt: true },
  });
  const related = candidates.filter((r) => r.slug !== slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.titleEn,
    description: a.excerptEn,
    image: "https://growentix.cloud/icon.svg",
    datePublished: a.publishedAt.toISOString(),
    dateModified: a.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "Growentix" },
    publisher: { "@type": "Organization", name: "Growentix", logo: { "@type": "ImageObject", url: "https://growentix.cloud/icon.svg" } },
    inLanguage: ["en"],
  };

  // Breadcrumb: Home → section → article. Job categories link to their
  // country/region page (/<slug>); news, pop-music and tech-ai link to
  // their section pages.
  const section =
    a.category === "news"
      ? { name: "News", url: "https://growentix.cloud/articles" }
      : a.category === "pop-music"
        ? { name: "Pop Music", url: "https://growentix.cloud/popmusic" }
        : a.category === "tech-ai"
          ? { name: "Tech & AI", url: "https://growentix.cloud/tech-ai" }
          : { name: articleCategoryLabel(a.category), url: `https://growentix.cloud/${a.category}` };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://growentix.cloud/" },
      { "@type": "ListItem", position: 2, name: section.name, item: section.url },
      { "@type": "ListItem", position: 3, name: a.titleEn, item: `https://growentix.cloud/articles/${slug}` },
    ],
  };

  // JobPosting — job-category articles only, and only with facts the
  // article itself verifies. The Article model has no structured employer,
  // salary or location fields, so those are omitted rather than invented;
  // validThrough comes from the same deadline parse as the closed banner.
  const jobPostingLd = isJob
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: a.titleEn,
        description: a.excerptEn,
        datePosted: a.publishedAt.toISOString().split("T")[0],
        ...(deadline ? { validThrough: deadline } : {}),
      }
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div>
        <div className="mx-auto w-full max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {jobPostingLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd) }}
        />
      )}
      <ArticleView
        article={{
          slug: a.slug,
          category: a.category,
          verified: isJob,
          country: a.country,
          titleEn: a.titleEn,
          excerptEn: a.excerptEn,
          bodyEn: a.bodyEn,
          sources: a.sources,
          videos: Array.isArray(a.videos)
            ? (a.videos as unknown as {
                title: string;
                url: string;
                videoId: string;
              }[])
            : [],
          publishedAt: a.publishedAt.toISOString(),
          closed,
          closedDeadline: deadline,
          related: related.map((r) => ({
            slug: r.slug,
            titleEn: r.titleEn,
            excerptEn: r.excerptEn,
            publishedAt: r.publishedAt.toISOString(),
          })),
        }}
      />
      <CommentSection slug={a.slug} />
        </div>
      </div>
    </div>
  );
}
