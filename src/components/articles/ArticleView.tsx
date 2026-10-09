"use client";

import { useState } from "react";
import Link from "next/link";
import { articleCategoryLabel } from "@/lib/articles";

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

export function ArticleView({ article }: { article: ArticleData }) {
  const [lang, setLang] = useState<"en" | "ne">("en");
  const title = lang === "en" ? article.titleEn : article.titleNe;
  const excerpt = lang === "en" ? article.excerptEn : article.excerptNe;
  const body = lang === "en" ? article.bodyEn : article.bodyNe;

  return (
    <article>
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

      <div className="mt-5 inline-flex rounded-full border border-slate-200 bg-white p-1">
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            lang === "en" ? "bg-emerald-600 text-white" : "text-slate-600 hover:text-slate-900"
          }`}
          aria-pressed={lang === "en"}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLang("ne")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            lang === "ne" ? "bg-emerald-600 text-white" : "text-slate-600 hover:text-slate-900"
          }`}
          aria-pressed={lang === "ne"}
        >
          नेपाली
        </button>
      </div>

      {excerpt && (
        <p
          lang={lang === "ne" ? "ne" : "en"}
          className="mt-6 border-l-4 border-emerald-500 bg-emerald-50/60 py-1 pl-4 text-lg font-medium leading-relaxed text-emerald-950"
        >
          {excerpt}
        </p>
      )}

      <div
        lang={lang === "ne" ? "ne" : "en"}
        className="gx-article mt-6 max-w-none text-slate-700"
        dangerouslySetInnerHTML={{ __html: body }}
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
