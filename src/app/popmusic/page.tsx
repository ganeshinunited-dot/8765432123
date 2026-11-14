import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES } from "@/lib/articles";
import { ArticleCards } from "@/components/articles/ArticleCards";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Pop Music | Growentix",
  description:
    "Pop music news — Taylor Swift, chart hits, award shows and the biggest pop moments, with the newest stories first.",
  alternates: { canonical: "https://growentix.cloud/popmusic" },
  openGraph: {
    title: "Pop Music | Growentix",
    description:
      "Pop music news — Taylor Swift, chart hits, award shows and the biggest pop moments.",
    url: "https://growentix.cloud/popmusic",
  },
};

export default async function PopMusicPage() {
  const rows = await db.article.findMany({
    where: { category: "pop-music" },
    orderBy: { publishedAt: "desc" },
    take: 20,
    select: {
      slug: true,
      category: true,
      country: true,
      titleEn: true,
      excerptEn: true,
      publishedAt: true,
    },
  });
  const total = await db.article.count({ where: { category: "pop-music" } });
  const articles = rows.map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));
  const totalPages = Math.max(1, Math.ceil(total / 20));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Pop Music</p>
      <h1 className="gx-h2 mt-2">Pop Music</h1>
      <p className="gx-sub mt-2 max-w-2xl">Taylor Swift, chart hits and the biggest pop moments — newest first.</p>
      <ArticleCards
        articles={articles}
        categories={ARTICLE_CATEGORIES}
        basePath="/popmusic"
        allLabel="All"
        variant="grid"
        active="pop-music"
        page={1}
        totalPages={totalPages}
      />
    </div>
  );
}
