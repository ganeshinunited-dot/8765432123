"use client";

import Image from "next/image";
import { articleImagesFor } from "@/data/articleImages";
import { articleCategoryLabel } from "@/lib/articles";

export interface ArticleData {
  slug: string;
  category: string;
  country: string | null;
  titleEn: string;
  excerptEn: string;
  bodyEn: string;
  sources: string[];
  videos: { title: string; url: string; videoId: string }[];
  publishedAt: string;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function readingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

type BodySegment = { kind: "html"; html: string } | { kind: "image"; src: string };

/**
 * Splits the article HTML at ~1/3 and ~2/3 depth and returns renderable
 * segments: contiguous HTML runs plus the two inline images. The HTML runs
 * rejoin to the original body exactly, so paragraph order and markup are
 * unchanged; the only difference from the previous string version is that
 * the stray </p> it left after each figure is gone.
 *
 * Segments (rather than an HTML string) are what let the inline images use
 * next/image: a component cannot be rendered inside dangerouslySetInnerHTML.
 * The .gx-article rules are descendant selectors, so wrapping each HTML run
 * in a <div> does not change styling.
 */
function withInlineImages(html: string, images: [string, string, string]): BodySegment[] {
  const parts = html.split(/<\/p>/i);
  if (parts.length < 5 || images.length < 3) return [{ kind: "html", html }];
  const i1 = Math.max(1, Math.floor(parts.length / 3));
  const i2 = Math.max(i1 + 2, Math.floor((parts.length * 2) / 3));
  const run = (from: number, to: number) =>
    parts.slice(from, to).join("</p>") + (to < parts.length ? "</p>" : "");
  const segments: BodySegment[] = [];
  const pushRun = (from: number, to: number) => {
    const chunk = run(from, to);
    if (chunk) segments.push({ kind: "html", html: chunk });
  };
  pushRun(0, i1);
  segments.push({ kind: "image", src: images[1] });
  pushRun(i1, i2);
  segments.push({ kind: "image", src: images[2] });
  pushRun(i2, parts.length);
  return segments;
}

export function ArticleView({ article }: { article: ArticleData }) {
  const images = articleImagesFor(article.slug);
  const segments: BodySegment[] = images
    ? withInlineImages(article.bodyEn, images)
    : [{ kind: "html", html: article.bodyEn }];

  return (
    <article>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {articleCategoryLabel(article.category)}
        </span>
        {article.country && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {article.country}
          </span>
        )}
        <span className="text-xs text-slate-500">{formatDate(article.publishedAt)}</span>
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {readingTime(article.bodyEn)} min read
        </span>
      </div>

      <h1
        lang="en"
        className="gx-article-title mt-4 text-slate-900"
      >
        {article.titleEn}
      </h1>

      {images && (
        <figure className="mt-6">
          <Image
            src={images[0]}
            alt={article.titleEn}
            width={1024}
            height={576}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 800px"
            className="aspect-video w-full rounded-2xl border border-slate-200 object-cover"
          />
        </figure>
      )}

      <div
        lang="en"
        className="gx-article mt-6 max-w-none text-slate-700"
      >
        {segments.map((seg, i) =>
          seg.kind === "image" ? (
            <figure key={i} className="gx-article-figure">
              <Image
                src={seg.src}
                alt={article.titleEn}
                width={1024}
                height={576}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </figure>
          ) : (
            <div key={i} dangerouslySetInnerHTML={{ __html: seg.html }} />
          )
        )}
      </div>

      {article.sources.length > 0 && (
        <p className="mt-10 text-sm text-slate-500">
          Sources:{" "}
          {article.sources.map((s, i) => {
            let host = s;
            try {
              host = new URL(s).hostname.replace(/^www\./, "");
            } catch {
              /* keep raw */
            }
            return (
              <span key={s}>
                {i > 0 && " · "}
                <a
                  href={s}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-700 hover:underline"
                >
                  {host}
                </a>
              </span>
            );
          })}
        </p>
      )}
    </article>
  );
}
