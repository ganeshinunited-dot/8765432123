"use client";

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
  /** True when a job post's apply-by date has passed (SEO audit fix). */
  closed?: boolean;
  /** ISO apply-by date (YYYY-MM-DD) when closed, else null. */
  closedDeadline?: string | null;
  /** Same-section stories, newest first (SEO audit fix). */
  related?: { slug: string; titleEn: string; excerptEn: string; publishedAt: string }[];
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

      {article.closed && (
        <div className="mt-6 rounded-xl border border-slate-300 bg-slate-100 p-4 text-sm text-slate-700">
          This vacancy has closed — the application deadline
          {article.closedDeadline ? ` (${formatDate(article.closedDeadline)})` : ""} has passed.
          The details below are kept for reference.{" "}
          <a href="/jobs" className="font-semibold text-emerald-700 hover:underline">
            Browse current jobs →
          </a>
        </div>
      )}

      <div
        lang="en"
        className="gx-article mt-6 max-w-none text-slate-700"
      >
        <div dangerouslySetInnerHTML={{ __html: article.bodyEn }} />
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

      {article.related && article.related.length > 0 && (
        <section className="mt-10 border-t border-slate-200 pt-8">
          <h2 className="gx-h2 mt-0">Related stories</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {article.related.map((r) => (
              <a
                key={r.slug}
                href={`/articles/${r.slug}`}
                className="block rounded-xl border border-slate-200 p-4 transition hover:border-emerald-600 hover:shadow-sm"
              >
                <span className="text-xs text-slate-500">{formatDate(r.publishedAt)}</span>
                <p className="mt-1 font-semibold leading-snug text-slate-900">{r.titleEn}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{r.excerptEn}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
