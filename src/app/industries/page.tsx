import type { Metadata } from "next";
import Link from "next/link";
import { getIndustryCounts } from "@/lib/jobListings";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Industries — Jobs by Industry",
  description: "Browse job news and vacancies by industry — engineering, technology, banking & finance, education, healthcare, and defence & security. Verified vacancies and job news, newest first.",
  alternates: { canonical: "https://growentix.cloud/industries" },
  openGraph: {
    title: "Industries — Jobs by Industry | Growentix",
    description: "Browse job news and vacancies by industry — engineering, technology, banking & finance, education, healthcare, and defence & security.",
    url: "https://growentix.cloud/industries",
  },
};

export default async function IndustriesPage() {
  const industries = await getIndustryCounts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <p className="gx-eyebrow">Industries</p>
      <h1 className="gx-h2 mt-2">Jobs by industry</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        Verified vacancies and job news from around the world, grouped by industry, newest first.
        Choose an industry to see its latest jobs — every article links to its official source.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            className="gx-lift group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-sans text-lg font-bold leading-snug text-slate-900 group-hover:text-emerald-800">
              {ind.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{ind.description}</p>
            <p className="mt-3 text-xs font-semibold text-emerald-700">
              {ind.count} {ind.count === 1 ? "article" : "articles"} →
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-600">
        An industry appears here once it has five or more articles. Looking for everything at once?{" "}
        <Link href="/jobs" className="font-semibold text-emerald-700 hover:underline">
          All jobs
        </Link>{" "}
        lists every vacancy, and{" "}
        <Link href="/government-jobs" className="font-semibold text-emerald-700 hover:underline">
          government jobs
        </Link>{" "}
        and{" "}
        <Link href="/private-jobs" className="font-semibold text-emerald-700 hover:underline">
          private jobs
        </Link>{" "}
        split them by sector.
      </p>
    </div>
  );
}
