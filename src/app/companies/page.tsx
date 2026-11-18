import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { isBadgeValid } from "@/lib/verification";

export const revalidate = 300;

const PAGE_SIZE = 20;

function monogram(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; page?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const base: Metadata = {
    title: "Companies — Verified Employers",
    description:
      "Verified employers on Growentix — companies whose registration, website and contact details we checked against official sources.",
    alternates: { canonical: "https://growentix.cloud/companies" },
  };
  // Filtered views are noindexed, same convention as the other listings.
  if (params.industry) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; page?: string }>;
}) {
  const params = await searchParams;
  const industry = params.industry?.trim() || "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const all = await db.company.findMany({
    where: { verificationStatus: "VERIFIED" },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      industry: true,
      description: true,
      verificationStatus: true,
      verificationExpiresAt: true,
    },
  });
  const valid = all.filter((c) => isBadgeValid(c));
  const companies = industry ? valid.filter((c) => c.industry === industry) : valid;
  const industries = [...new Set(valid.map((c) => c.industry).filter((x): x is string => !!x))].sort();

  const totalPages = Math.max(1, Math.ceil(companies.length / PAGE_SIZE));
  const pageCompanies = companies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <p className="gx-eyebrow">Companies</p>
      <h1 className="gx-h2 mt-2">Verified employers</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        Every company here passed our verification — registration, website and contact details
        checked against official sources. A Verified badge means the employer behind a vacancy is
        real.
      </p>

      {industries.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/companies"
            className={`rounded-full px-3 py-1 text-xs font-semibold ${!industry ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            All
          </Link>
          {industries.map((ind) => (
            <Link
              key={ind}
              href={`/companies?industry=${encodeURIComponent(ind)}`}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${industry === ind ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            >
              {ind}
            </Link>
          ))}
        </div>
      )}

      {pageCompanies.length === 0 ? (
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-600">
          No verified employers{industry ? ` in ${industry}` : ""} yet. Are you an employer?{" "}
          <Link href="/for-employers" className="font-semibold text-emerald-700 hover:underline">
            Apply for verification — it is free.
          </Link>
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageCompanies.map((c) => (
            <Link
              key={c.id}
              href={`/companies/${c.slug}`}
              className="gx-lift group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-sm font-bold text-white">
                  {monogram(c.name)}
                </span>
                <span>
                  <span className="block font-sans text-lg font-bold leading-snug text-slate-900 group-hover:text-emerald-800">
                    {c.name}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Verified
                  </span>
                </span>
              </div>
              {c.industry && (
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {c.industry}
                </p>
              )}
              {c.description && (
                <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {c.description}
                </p>
              )}
              <p className="mt-3 text-xs font-semibold text-emerald-700">View profile →</p>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4 text-sm">
          {page > 1 && (
            <Link
              href={`/companies?${new URLSearchParams({ ...(industry ? { industry } : {}), page: String(page - 1) }).toString()}`}
              className="font-semibold text-emerald-700 hover:underline"
            >
              ← Previous
            </Link>
          )}
          <span className="text-slate-500">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/companies?${new URLSearchParams({ ...(industry ? { industry } : {}), page: String(page + 1) }).toString()}`}
              className="font-semibold text-emerald-700 hover:underline"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
