import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { JobCard } from "@/components/jobs/JobCard";
import { Badge, Card, EmptyState } from "@/components/ui/primitives";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await db.company.findUnique({ where: { slug }, select: { name: true } });
  return { title: company ? `${company.name} — Jobs | Student Jobs Nepal` : "Company not found" };
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await db.company.findUnique({
    where: { slug },
    include: {
      location: { select: { name: true } },
      jobs: {
        where: { status: "ACTIVE" },
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
        take: 12,
        include: { company: { select: { name: true, verificationStatus: true } }, location: { select: { name: true } } },
      },
    },
  });
  if (!company) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-4 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-emerald-700">Home</Link> ·{" "}
        <Link href="/companies" className="hover:text-emerald-700">Companies</Link>
      </nav>

      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
            <p className="mt-1 text-sm text-slate-500">
              {[company.industry, company.location?.name, company.size].filter(Boolean).join(" · ")}
            </p>
          </div>
          {company.verificationStatus === "VERIFIED" && <Badge tone="green">Verified employer</Badge>}
        </div>
        {company.description && <p className="mt-4 max-w-3xl text-slate-700">{company.description}</p>}
        {company.website && (
          <a href={company.website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline">
            Visit website →
          </a>
        )}
      </Card>

      <h2 className="mb-4 mt-8 text-lg font-bold text-slate-900">
        Open jobs at {company.name} ({company.jobs.length})
      </h2>
      {company.jobs.length === 0 ? (
        <EmptyState title="No open jobs right now." description="Check back soon — new roles are posted regularly." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {company.jobs.map((j) => <JobCard key={j.id} job={j as never} />)}
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            description: company.description || undefined,
            url: company.website || undefined,
          }),
        }}
      />
    </div>
  );
}
