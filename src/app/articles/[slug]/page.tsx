import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ArticleView } from "@/components/articles/ArticleView";
import { CommentSection } from "@/components/articles/CommentSection";

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

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** Best-effort apply-by date for job posts, e.g. "Apply by 30 November 2026"
 *  in the excerpt or body. Returns ISO date (YYYY-MM-DD) or null. Year is
 *  taken from the text when present, else the current year. Only used for
 *  job-category articles — news/pop/tech never get a closed banner. */
function applyByDate(excerptEn: string, bodyEn: string): string | null {
  const text = `${excerptEn} ${bodyEn.replace(/<[^>]+>/g, " ")}`;
  const monthPat = MONTHS.join("|");
  const m =
    text.match(new RegExp(`apply by\\s+(\\d{1,2})\\s+(${monthPat})(?:\\s+(\\d{4}))?`, "i")) ??
    text.match(new RegExp(`applications?\\s+close[sd]?\\s+(?:on\\s+)?(\\d{1,2})\\s+(${monthPat})(?:\\s+(\\d{4}))?`, "i"));
  if (!m) return null;
  const year = m[3] ? parseInt(m[3], 10) : new Date().getFullYear();
  const month = MONTHS.indexOf(m[2].toLowerCase()) + 1;
  return `${year}-${String(month).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await db.article.findUnique({ where: { slug } });
  if (!a) notFound();

  const isJob = !["pop-music", "tech-ai", "news"].includes(a.category);
  const deadline = isJob ? applyByDate(a.excerptEn, a.bodyEn) : null;
  const todayNpt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kathmandu", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const closed = deadline !== null && deadline < todayNpt;

  // Related stories from the same section — newest first, excluding this
  // article (SEO audit fix, 2026-11-17). Server-side so the client
  // ArticleView only receives plain data.
  const related = await db.article.findMany({
    where: { category: a.category, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 4,
    select: { slug: true, titleEn: true, excerptEn: true, publishedAt: true },
  });

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div>
        <div className="mx-auto w-full max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleView
        article={{
          slug: a.slug,
          category: a.category,
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
