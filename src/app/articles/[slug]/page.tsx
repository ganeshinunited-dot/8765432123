import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ArticleView } from "@/components/articles/ArticleView";
import { CommentSection } from "@/components/articles/CommentSection";
import { articleCategoryLabel, applyByDate, isJobCategory } from "@/lib/articles";
import { extractKeyFacts } from "@/lib/keyFacts";
import { extractFaqs } from "@/lib/faq";
import { buildJobPosting } from "@/lib/jobPosting";
import { AUTHOR } from "@/lib/author";
import { isVisaGuide, topicLinksForArticle, VISA_GUIDES } from "@/lib/topicLinks";

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

  // Key Facts box (GEO Step 2): parsed from the article's own summary
  // table + derived fields only — nothing invented. The parsed table is
  // removed from the body so it never renders twice.
  const keyFacts = extractKeyFacts(a.bodyEn, {
    isJob,
    country: a.country,
    categoryLabel: articleCategoryLabel(a.category),
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    verifiedAt: a.verifiedAt ?? null,
    deadline,
    closed,
  });

  // Per-article FAQ (GEO Step 5): parsed from the FAQ block at the very
  // end of the body — 2–5 genuine Q&A pairs written by the builder from
  // the article's own sources. A malformed or missing block parses to
  // nothing: the body renders untouched and no FAQPage schema is emitted.
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

  // "More in this topic" hub links (GEO Step 8): section + government/
  // private + industry hubs derived from the article itself.
  const topicLinks = topicLinksForArticle({
    category: a.category,
    titleEn: a.titleEn,
    sources: a.sources,
  });

  // Work-visa guide cluster (GEO Step 8): on a guide article, link the
  // sibling guides. Only slugs that still exist in the DB are shown, in
  // curated order; the current article is never listed.
  const visaGuideSlugs = isVisaGuide(slug)
    ? VISA_GUIDES.map((g) => g.slug).filter((s) => s !== slug)
    : [];
  const existingGuideSlugs = new Set(
    visaGuideSlugs.length > 0
      ? (
          await db.article.findMany({
            where: { slug: { in: visaGuideSlugs } },
            select: { slug: true },
          })
        ).map((r) => r.slug)
      : []
  );
  const visaGuides = VISA_GUIDES.filter((g) => existingGuideSlugs.has(g.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.titleEn,
    description: a.excerptEn,
    image: "https://growentix.cloud/icon.svg",
    datePublished: a.publishedAt.toISOString(),
    dateModified: a.updatedAt.toISOString(),
    author: AUTHOR.jsonLd,
    publisher: { "@type": "Organization", "@id": "https://growentix.cloud/#organization", name: "Growentix", logo: { "@type": "ImageObject", url: "https://growentix.cloud/icon.svg" } },
    inLanguage: ["en"],
  };

  // Breadcrumb: Home → section → article. Job categories link to their
  // country/region page (/<slug>); news, pop-music and tech-ai link to
  // their section pages; fact-check articles link to the Fact Check hub
  // at /fact-check (2026-11-22).
  const section =
    a.category === "news"
      ? { name: "News", url: "https://growentix.cloud/articles" }
      : a.category === "pop-music"
        ? { name: "Pop Music", url: "https://growentix.cloud/popmusic" }
        : a.category === "tech-ai"
          ? { name: "Tech & AI", url: "https://growentix.cloud/tech-ai" }
          : a.category === "fact-check"
            ? { name: "Fact Check", url: "https://growentix.cloud/fact-check" }
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
  // GEO Step 7: no JobPosting at all once the vacancy has closed — a
  // closed vacancy is not a genuine active vacancy. hiringOrganization
  // and jobLocation come from the article's own Key Facts (employer row
  // from its summary table, country label mapped to ISO); either is
  // omitted when the article does not state it.
  const jobPostingLd = isJob
    ? buildJobPosting({
        title: a.titleEn,
        description: a.excerptEn,
        datePosted: a.publishedAt.toISOString().split("T")[0],
        deadline,
        closed,
        employer: keyFacts.facts.find((f) => f.label === "Employer")?.value ?? null,
        country: a.country,
      })
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
          verified: isJob,
          verifiedAt: a.verifiedAt?.toISOString() ?? null,
          authorName: a.authorName ?? null,
          country: a.country,
          breadcrumb: { sectionName: section.name, sectionUrl: section.url },
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
          topicLinks,
          visaGuides,
          factCheckVerdict: a.factCheckVerdict ?? null,
          factCheckClaim: a.factCheckClaim ?? null,
          factCheckClaimant: a.factCheckClaimant ?? null,
          factCheckClaimUrl: a.factCheckClaimUrl ?? null,
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

