import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ArticleView } from "@/components/articles/ArticleView";
import { CommentSection } from "@/components/articles/CommentSection";
import { applyByDate, isJobCategory } from "@/lib/articles";
import { extractKeyFacts } from "@/lib/keyFacts";
import { extractFaqs } from "@/lib/faq";
import { buildJobPosting } from "@/lib/jobPosting";

export const revalidate = 300; // ISR: serve cached HTML, regenerate in background; admin/cron purge on publish

/**
 * Job-detail route (Master Plan Phase 1, Batch 2). Renders the same
 * job-category article as /articles/[slug] under its /jobs URL — the
 * canonical stays /articles/[slug] and the page is noindex, follow, so
 * the duplicate URL never competes in search. Pop-music, tech-ai, news
 * and legacy taylor-swift articles 404 here: they have their own detail URLs.
 */
export async function generateStaticParams() {
  const articles = await db.article.findMany({
    where: { category: { notIn: ["pop-music", "tech-ai", "news", "taylor-swift"] } },
    select: { slug: true },
  });
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
    select: { titleEn: true, excerptEn: true },
  });
  if (!a) return {};
  return {
    title: a.titleEn,
    description: a.excerptEn,
    alternates: { canonical: `https://growentix.cloud/articles/${slug}` },
    robots: { index: false, follow: true },
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

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await db.article.findUnique({ where: { slug } });
  if (!a || !isJobCategory(a.category)) notFound();

  const deadline = applyByDate(a.titleEn, a.excerptEn, a.bodyEn);
  const todayNpt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kathmandu", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const closed = deadline !== null && deadline < todayNpt;

  // Key Facts box (GEO Step 2): parsed from the article's own summary
  // table + derived fields only — nothing invented. The parsed table is
  // removed from the body so it never renders twice. This route is
  // job-category articles only.
  const keyFacts = extractKeyFacts(a.bodyEn, {
    isJob: true,
    country: a.country,
    categoryLabel: a.category,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    verifiedAt: a.verifiedAt ?? null,
    deadline,
    closed,
  });

  // Per-article FAQ (GEO Step 5): same rule as /articles/[slug] — the FAQ
  // block at the very end of the body parses to 2–5 Q&A pairs; anything
  // else leaves the body untouched and emits no FAQPage schema.
  const faqResult = extractFaqs(keyFacts.bodyWithoutSummaryTable);

  // FAQPage schema — only when the article actually carries an FAQ block,
  // and only with the exact questions and answers shown on the page.
  const faqLd =
    faqResult.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqResult.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  // Related stories from the same section — newest first, excluding this
  // article (same rule as /articles/[slug]).
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
    author: { "@type": "Organization", "@id": "https://growentix.cloud/#organization", name: "Growentix", url: "https://growentix.cloud/editorial-team" },
    publisher: { "@type": "Organization", "@id": "https://growentix.cloud/#organization", name: "Growentix", logo: { "@type": "ImageObject", url: "https://growentix.cloud/icon.svg" } },
    inLanguage: ["en"],
  };

  // Breadcrumb: Home → Jobs → article. The article URL in the trail is
  // the canonical /articles/[slug].
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://growentix.cloud/" },
      { "@type": "ListItem", position: 2, name: "Jobs", item: "https://growentix.cloud/jobs" },
      { "@type": "ListItem", position: 3, name: a.titleEn, item: `https://growentix.cloud/articles/${slug}` },
    ],
  };

  // JobPosting — only with facts the article itself verifies. The Article
  // model has no structured employer, salary or location fields, so those
  // are omitted rather than invented; validThrough comes from the same
  // deadline parse as the closed banner.
  // GEO Step 7: no JobPosting at all once the vacancy has closed — a
  // closed vacancy is not a genuine active vacancy. hiringOrganization
  // and jobLocation come from the article's own Key Facts (employer row
  // from its summary table, country label mapped to ISO); either is
  // omitted when the article does not state it.
  const jobPostingLd = buildJobPosting({
    title: a.titleEn,
    description: a.excerptEn,
    datePosted: a.publishedAt.toISOString().split("T")[0],
    deadline,
    closed,
    employer: keyFacts.facts.find((f) => f.label === "Employer")?.value ?? null,
    country: a.country,
  });

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
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <ArticleView
        article={{
          slug: a.slug,
          category: a.category,
          verified: isJobCategory(a.category),
          verifiedAt: a.verifiedAt?.toISOString() ?? null,
          authorName: a.authorName ?? null,
          country: a.country,
          breadcrumb: { sectionName: "Jobs", sectionUrl: "https://growentix.cloud/jobs" },
          titleEn: a.titleEn,
          excerptEn: a.excerptEn,
          bodyEn: faqResult.bodyWithoutFaq,
          keyFacts: keyFacts.facts,
          faqs: faqResult.faqs,
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

