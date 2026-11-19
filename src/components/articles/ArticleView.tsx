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
  /** True for job-category articles — the vacancy was verified against
   *  its official source before publish (see /verification-policy). */
  verified?: boolean;
  /** ISO verification date — badge shows "Verified {date}" when set. */
  verifiedAt?: string | null;
  /** Named author when set; null renders "Growentix Editorial Team". */
  authorName?: string | null;
  /** True when a job post's apply-by date has passed (SEO audit fix). */
  closed?: boolean;
  /** ISO apply-by date (YYYY-MM-DD) when closed, else null. */
  closedDeadline?: string | null;
  /** Same-section stories, newest first (SEO audit fix). */
  related?: { slug: string; titleEn: string; excerptEn: string; publishedAt: string }[];
  /** Key Facts rows derived server-side (GEO Step 2) — only fields the
   *  article itself states; never invented. Empty/missing renders no box. */
  keyFacts?: { label: string; value: string }[];
  /** Per-article FAQs parsed server-side (GEO Step 5) — the builder writes
   *  them from the article's own sources; empty/missing renders no section
   *  and no FAQPage schema. */
  faqs?: { question: string; answer: string; answerHtml: string }[];
  /** Visible breadcrumb trail (GEO Step 7) — mirrors the BreadcrumbList
   *  schema exactly: schema must match visible page content, so the trail
   *  the schema describes is rendered, not just declared. */
  breadcrumb?: { sectionName: string; sectionUrl: string };
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
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
      {article.breadcrumb && (
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <a href="/" className="hover:text-emerald-700 hover:underline">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href={article.breadcrumb.sectionUrl} className="hover:text-emerald-700 hover:underline">
                {article.breadcrumb.sectionName}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="min-w-0 flex-1 truncate text-slate-700">
              {article.titleEn}
            </li>
          </ol>
        </nav>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {articleCategoryLabel(article.category)}
        </span>
        {article.verified && (
          <a
            href="/verification-policy"
            title="Verified against the official source — see our Verification Policy"
            className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {article.verifiedAt ? `Verified ${formatShortDate(article.verifiedAt)}` : "Verified"}
          </a>
        )}
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

      <p className="mt-3 text-sm text-slate-500">
        By{" "}
        <a href="/editorial-team" className="font-medium text-emerald-700 hover:underline">
          {article.authorName ?? "Growentix Editorial Team"}
        </a>
      </p>

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

      {article.keyFacts && article.keyFacts.length > 0 && (
        <section aria-label="Key facts" className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="gx-h2 mt-0">Key facts</h2>
          <dl className="mt-4 space-y-2.5">
            {article.keyFacts.map((f) => (
              <div key={f.label} className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm">
                <dt className="w-32 shrink-0 font-semibold text-slate-900">{f.label}</dt>
                <dd className="min-w-0 flex-1 text-slate-700">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div
        lang="en"
        className="gx-article mt-6 max-w-none text-slate-700"
      >
        <div dangerouslySetInnerHTML={{ __html: article.bodyEn }} />
      </div>

      {article.faqs && article.faqs.length > 0 && (
        <section aria-label="Frequently asked questions" className="mt-10 border-t border-slate-200 pt-8">
          <h2 className="gx-h2 mt-0">Frequently asked questions</h2>
          <div className="mt-5 space-y-5">
            {article.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-base font-semibold leading-snug text-slate-900">{f.question}</h3>
                <div
                  className="mt-1 text-sm leading-relaxed text-slate-700"
                  dangerouslySetInnerHTML={{ __html: f.answerHtml }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {article.sources.length > 0 && (
        <section aria-label="Sources and references" className="mt-10 border-t border-slate-200 pt-8">
          <h2 className="gx-h2 mt-0">Sources and references</h2>
          <p className="mt-3 text-sm text-slate-500">
            Information checked: {formatDate(article.verifiedAt ?? article.publishedAt)}
          </p>
          <ul className="mt-4 space-y-2">
            {article.sources.map((s) => {
              let host = s;
              let valid = true;
              try {
                host = new URL(s).hostname.replace(/^www\./, "");
              } catch {
                valid = false;
              }
              return (
                <li key={s} className="text-sm">
                  {valid ? (
                    <a
                      href={s}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-700 hover:underline"
                    >
                      {host}
                    </a>
                  ) : (
                    <span className="text-slate-700">{s}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
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

