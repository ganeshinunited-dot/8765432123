import Link from "next/link";
import { db } from "@/lib/db";
import { JobCard } from "@/components/jobs/JobCard";
import { EmptyState } from "@/components/ui/primitives";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export interface SeoConfig {
  title: string;
  heading: string;
  intro: string;
  where: Prisma.JobWhereInput;
  faq: [string, string][];
}

export default async function SeoLandingPage({ config }: { config: SeoConfig }) {
  const jobs = await db.job.findMany({
    where: { status: "ACTIVE", ...config.where },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    take: 12,
    include: { company: { select: { name: true, verificationStatus: true } }, location: { select: { name: true } } },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-4 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-emerald-700">Home</Link> · <Link href="/jobs" className="hover:text-emerald-700">Jobs</Link>
      </nav>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{config.heading}</h1>
      <p className="mt-3 max-w-3xl text-slate-600">{config.intro}</p>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Latest openings ({jobs.length})</h2>
        {jobs.length === 0 ? (
          <EmptyState
            title="No openings right now."
            description="New jobs are posted daily — check the full listing."
            action={<Link href="/jobs" className="font-semibold text-emerald-700 hover:underline">Browse all jobs</Link>}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j) => <JobCard key={j.id} job={j as never} />)}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link href="/jobs" className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Browse all jobs
          </Link>
        </div>
      </div>

      {config.faq.length > 0 && (
        <div className="mt-12 max-w-3xl">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Frequently asked questions</h2>
          <div className="space-y-3">
            {config.faq.map(([q, a]) => (
              <details key={q} className="rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">{q}</summary>
                <p className="mt-2 text-sm text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: config.faq.map(([q, a]) => ({
              "@type": "Question", name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
    </div>
  );
}
