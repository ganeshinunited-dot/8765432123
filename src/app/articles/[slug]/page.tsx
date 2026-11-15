import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ArticleView } from "@/components/articles/ArticleView";
import { CommentSection } from "@/components/articles/CommentSection";
import { ManualAdSlot } from "@/components/ads/ManualAdSlot";
import { articleImagesFor } from "@/data/articleImages";

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
  const ogImage = articleImagesFor(slug)?.[0];
  return {
    title: a.titleEn,
    description: a.excerptEn,
    alternates: { canonical: `https://growentix.cloud/articles/${slug}` },
    openGraph: {
      title: a.titleEn,
      description: a.excerptEn,
      type: "article",
      url: `https://growentix.cloud/articles/${slug}`,
      ...(ogImage ? { images: [{ url: `https://growentix.cloud${ogImage}` }] } : {}),
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.titleEn,
    description: a.excerptEn,
    datePublished: a.publishedAt.toISOString(),
    dateModified: a.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "Growentix" },
    publisher: { "@type": "Organization", name: "Growentix" },
    inLanguage: ["en"],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
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
        }}
      />
      <CommentSection slug={a.slug} />
        </div>

        {/* Sidebar — manual ad space (sticky on desktop) */}
        <aside className="mx-auto mt-10 w-full max-w-3xl lg:mt-0 lg:max-w-none">
          <div className="space-y-6 lg:sticky lg:top-6">
            <ManualAdSlot slot="sidebar-article-top" className="h-[250px] w-full" />
            <ManualAdSlot slot="sidebar-article-bottom" className="h-[250px] w-full" />
          </div>
        </aside>
      </div>
    </div>
  );
}
