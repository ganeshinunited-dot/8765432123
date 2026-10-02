import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Badge, Card, Alert } from "@/components/ui/primitives";
import { formatSalary, timeAgo, JOB_TYPE_LABELS, SCHEDULE_LABELS, ARRANGEMENT_LABELS } from "@/lib/format";
import { ApplyPanel, MobileApplyBar } from "@/components/jobs/ApplyPanel";
import { isBadgeValid } from "@/lib/verification";
import { ReportButton } from "@/components/jobs/ReportButton";
import { ViewTracker } from "@/components/analytics/ViewTracker";

export const revalidate = 300;

export async function generateStaticParams() {
  const jobs = await db.job.findMany({ where: { status: "ACTIVE" }, select: { slug: true }, take: 500 });
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await db.job.findUnique({
    where: { slug },
    include: { company: { select: { name: true } }, location: { select: { name: true } } },
  });
  if (!job || job.status !== "ACTIVE") return { title: "Job not found" };
  const title = `${job.title} at ${job.company.name}${job.location ? ` — ${job.location.name}` : ""}`;
  const description = job.description.slice(0, 160);
  const url = `/jobs/${job.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

function JsonLd({ job }: {
  job: {
    title: string; description: string; publishedAt: Date | null; deadline: Date | null;
    jobType: string; company: { name: string }; location: { name: string } | null;
  };
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.publishedAt,
    validThrough: job.deadline,
    employmentType: job.jobType,
    hiringOrganization: { "@type": "Organization", name: job.company.name },
    jobLocation: job.location ? { "@type": "Place", address: job.location.name } : undefined,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await db.job.findUnique({
    where: { slug },
    include: {
      company: true,
      location: true,
      category: true,
      skills: { include: { skill: true } },
    },
  });
  if (!job || job.status !== "ACTIVE") notFound();

  // Per-user apply/save state loads client-side (see /api/jobs/[id]/my-state)
  // so this page can be served from the edge cache.
  const application = null;
  const saved = false;
  const applicantCount = await db.application.count({ where: { jobId: job.id } });

  // increment views (fire-and-forget, runs on cache regeneration)
  db.job.update({ where: { id: job.id }, data: { views: { increment: 1 } } }).catch(() => {});

  const verified = isBadgeValid(job.company);
  const verifiedSince = job.company.verifiedAt ? new Date(job.company.verifiedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd job={job} />
      {/* Server-side Klaviyo "Viewed Job" via our own API (page stays ISR-cached). */}
      <ViewTracker kind="job" slug={job.slug} />
      <Link href="/jobs" className="text-sm font-medium text-emerald-700 hover:underline">← Back to jobs</Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{job.title}</h1>
            {job.featured && <Badge tone="amber">Featured</Badge>}
            {job.urgentHiring && <Badge tone="rose">Urgent hiring</Badge>}
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-slate-600">
            <Link href={`/companies/${job.company.slug}`} className="font-semibold text-slate-900 hover:text-emerald-700 hover:underline">
              {job.company.name}
            </Link>
            {verified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 14.5 4.5 18 4l.5 3.5L22 9l-2 3 2 3-3.5 1.5L18 20l-3.5-.5L12 22l-2.5-2.5L6 20l-.5-3.5L2 15l2-3-2-3 3.5-1.5L6 4l3.5.5z" /></svg>
                Verified Employer{verifiedSince ? ` · since ${verifiedSince}` : ""}
              </span>
            )}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {[
              ["Location", job.workArrangement === "REMOTE" ? "Remote" : job.location?.name || "—"],
              ["Job type", JOB_TYPE_LABELS[job.jobType]],
              ["Arrangement", ARRANGEMENT_LABELS[job.workArrangement]],
              ["Salary", formatSalary(job.salaryMin, job.salaryMax, job.salaryType)],
              ["Schedule", job.schedules.map((s) => SCHEDULE_LABELS[s]).join(", ") || "—"],
              ["Openings", String(job.openings)],
              ["Posted", job.publishedAt ? timeAgo(job.publishedAt) : "—"],
              ["Deadline", job.deadline ? new Date(job.deadline).toLocaleDateString() : "—"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-slate-50 px-3 py-2.5">
                <dt className="text-xs text-slate-500">{k}</dt>
                <dd className="mt-0.5 font-medium text-slate-900">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="prose-slate mt-6 space-y-6 text-[15px] leading-relaxed text-slate-700">
            <section>
              <h2 className="text-lg font-semibold text-slate-900">About this role</h2>
              <p className="mt-2 whitespace-pre-line">{job.description}</p>
            </section>
            {job.responsibilities && (
              <section><h2 className="text-lg font-semibold text-slate-900">Responsibilities</h2><p className="mt-2 whitespace-pre-line">{job.responsibilities}</p></section>
            )}
            {job.requirements && (
              <section><h2 className="text-lg font-semibold text-slate-900">Requirements</h2><p className="mt-2 whitespace-pre-line">{job.requirements}</p></section>
            )}
            {job.benefits && (
              <section><h2 className="text-lg font-semibold text-slate-900">Benefits</h2><p className="mt-2 whitespace-pre-line">{job.benefits}</p></section>
            )}
            {job.skills.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-slate-900">Skills</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.skills.map((js) => <Badge key={js.skillId}>{js.skill.name}</Badge>)}
                </div>
              </section>
            )}
            <section>
              <h2 className="text-lg font-semibold text-slate-900">About {job.company.name}</h2>
              <p className="mt-2 whitespace-pre-line">{job.company.description || "This employer hasn't added a company description yet."}</p>
            </section>
          </div>

          <div className="mt-8">
            <Alert tone="amber" title="Stay safe">
              Never pay an employer to apply for or receive a job. Report suspicious listings immediately.
            </Alert>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <ApplyPanel jobId={job.id} jobSlug={job.slug} application={application} saved={saved} userRole={null} deadline={job.deadline} applicantCount={applicantCount} />
          <div className="mt-3 text-center">
            <ReportButton targetType="JOB" targetId={job.id} />
          </div>
        </aside>
      </div>

      {/* Sticky mobile apply */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white p-3 lg:hidden">
        <MobileApplyBar jobId={job.id} jobSlug={job.slug} application={application} saved={saved} userRole={null} />
      </div>
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </div>
  );
}
