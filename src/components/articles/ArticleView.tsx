"use client";

import { useState } from "react";
import Link from "next/link";
import { articleCategoryLabel } from "@/lib/articles";
import { articleImagesFor } from "@/data/articleImages";
import { LanguagePicker } from "./LanguagePicker";

export interface ArticleData {
  slug: string;
  category: string;
  country: string | null;
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  bodyEn: string;
  bodyNe: string;
  sources: string[];
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

/** Inserts the two inline images into the article HTML at ~1/3 and ~2/3 depth. */
function withInlineImages(
  html: string,
  images: [string, string, string],
  alt: string
): string {
  const safeAlt = alt.replace(/"/g, "&quot;");
  const parts = html.split(/<\/p>/i);
  if (parts.length < 5) return html;
  const fig = (src: string) =>
    `<figure class="gx-article-figure"><img src="${src}" alt="${safeAlt}" loading="lazy" /></figure>`;
  const i1 = Math.max(1, Math.floor(parts.length / 3));
  const i2 = Math.max(i1 + 2, Math.floor((parts.length * 2) / 3));
  parts.splice(i2, 0, fig(images[2]));
  parts.splice(i1, 0, fig(images[1]));
  return parts.join("</p>");
}

export function ArticleView({ article }: { article: ArticleData }) {
  const [lang, setLang] = useState<"en" | "ne">("en");
  const title = lang === "en" ? article.titleEn : article.titleNe;
  const excerpt = lang === "en" ? article.excerptEn : article.excerptNe;
  const body = lang === "en" ? article.bodyEn : article.bodyNe;
  const images = articleImagesFor(article.slug);
  const bodyHtml = images ? withInlineImages(body, images, title) : body;

  return (
    <article>
      {/* Language picker — top of the article, jw.org style */}
      <div className="mb-4 flex justify-end">
        <LanguagePicker lang={lang} onChange={setLang} />
      </div>

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link href="/articles" className="hover:text-emerald-700">Articles</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-slate-700">{articleCategoryLabel(article.category)}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-2">
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {readingTime(body)} min read
        </span>
      </div>

      <h1
        lang={lang === "ne" ? "ne" : "en"}
        className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
      >
        {title}
      </h1>

      {excerpt && (
        <p
          lang={lang === "ne" ? "ne" : "en"}
          className="mt-6 border-l-4 border-emerald-500 bg-emerald-50/60 py-1 pl-4 text-lg font-medium leading-relaxed text-emerald-950"
        >
          {excerpt}
        </p>
      )}

      {images && (
        <figure className="mt-6">
          <img
            src={images[0]}
            alt={title}
            className="aspect-video w-full rounded-2xl border border-slate-200 object-cover"
          />
        </figure>
      )}

      <div
        lang={lang === "ne" ? "ne" : "en"}
        className="gx-article mt-6 max-w-none text-slate-700"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      {article.sources.length > 0 && (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Sources</h2>
          <ul className="mt-3 space-y-2">
            {article.sources.map((s) => {
              let host = s;
              try {
                host = new URL(s).hostname.replace(/^www\./, "");
              } catch {
                /* keep raw */
              }
              return (
                <li key={s}>
                  <a
                    href={s}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-emerald-700 hover:underline"
                  >
                    {host} <span aria-hidden="true">&rarr;</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
}
