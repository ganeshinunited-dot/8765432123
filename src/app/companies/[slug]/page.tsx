import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { isBadgeValid } from "@/lib/verification";
import { articleCategoryLabel } from "@/lib/articles";

export const revalidate = 300;

function monogram(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export async function generateStaticParams() {
  const companies = await db.company.findMany({
    where: { verificationStatus: "VERIFIED" },
    select: { slug: true },
  });
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await db.company.findUnique({
    where: { slug },
    select: { name: true, description: true, industry: true },
  });
  if (!c) return {};
  const desc = c.description
    ? c.description.slice(0, 160)
    : `${c.name} — a verified employer on Growentix.`;
  return {
    title: `${c.name} — Verified Employer`,
    description: desc,
    alternates: { canonical: `https://growentix.cloud/companies/${slug}` },
    openGraph: {
      title: `${c.name} — Verified Employer | Growentix`,
      description: desc,
      url: `https://growentix.cloud/companies/${slug}`,
    },
  };
}

export default async function CompanyProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await db.company.findUnique({
    where: { slug },
    include: {
      verifications: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
  // Only verified companies with a valid (unexpired) badge ever render.
  // Anything else — pending, rejected, needs-info, expired — is a 404.
  if (!company || !isBadgeValid(company)) notFound();

  const info = (company.verifications[0]?.businessInfo ?? {}) as Record<string, unknown>;
  const city = typeof info.city === "string" ? info.city : "";
  const country = typeof info.country === "string" ? info.country : "";
  const hq = [city, country].filter(Boolean).join(", ");

  const jobs = await db.article.findMany({
    where: { companyId: company.id },
    orderBy: { publishedAt: "desc" },
    take: 20,
    select: { slug: true, titleEn: true, excerptEn: true, category: true, publishedAt: true },
  });

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: `https://growentix.cloud/companies/${company.slug}`,
    ...(company.website ? { sameAs: [company.website] } : {}),
    ...(company.description ? { description: company.description } : {}),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-xl font-bold text-white">
            {monogram(company.name)}
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{company.name}</h1>
            <a
              href="/verification-policy"
              title="Verified against official sources — see our Verification Policy"
              className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Verified
            </a>
          </div>
        </div>

        {company.industry && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {company.industry}
          </p>
        )}
        {company.description && (
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{company.description}</p>
        )}

        <dl className="mt-6 space-y-2 text-sm">
          {hq && (
            <div className="flex gap-2">
              <dt className="w-32 shrink-0 font-medium text-slate-500">Headquarters</dt>
              <dd className="text-slate-900">{hq}</dd>
            </div>
          )}
          {company.size && (
            <div className="flex gap-2">
              <dt className="w-32 shrink-0 font-medium text-slate-500">Company size</dt>
              <dd className="text-slate-900">{company.size}</dd>
            </div>
          )}
          {company.website && (
            <div className="flex gap-2">
              <dt className="w-32 shrink-0 font-medium text-slate-500">Website</dt>
              <dd>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  {company.website.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                </a>
              </dd>
            </div>
          )}
          {company.verifiedAt && (
            <div className="flex gap-2">
              <dt className="w-32 shrink-0 font-medium text-slate-500">Verified on</dt>
              <dd className="text-slate-900">{formatDate(company.verifiedAt.toISOString())}</dd>
            </div>
          )}
        </dl>

        <section className="mt-10 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-slate-900">Jobs from this employer</h2>
          {jobs.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              No vacancies from this employer on Growentix yet. New vacancies appear here when we
              publish them.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {jobs.map((j) => (
                <Link
                  key={j.slug}
                  href={`/articles/${j.slug}`}
                  className="block rounded-xl border border-slate-200 p-4 transition hover:border-emerald-600 hover:shadow-sm"
                >
                  <span className="text-xs text-slate-500">
                    {articleCategoryLabel(j.category)} · {formatDate(j.publishedAt.toISOString())}
                  </span>
                  <p className="mt-1 font-semibold leading-snug text-slate-900">{j.titleEn}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{j.excerptEn}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <p className="mt-10 text-sm text-slate-500">
          <Link href="/companies" className="font-semibold text-emerald-700 hover:underline">
            ← All verified employers
          </Link>{" "}
          ·{" "}
          <Link href="/for-employers" className="font-semibold text-emerald-700 hover:underline">
            Are you an employer? Apply for verification
          </Link>
        </p>
      </div>
    </div>
  );
}
