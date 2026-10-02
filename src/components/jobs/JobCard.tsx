import Link from "next/link";
import { Badge } from "@/components/ui/primitives";
import { formatSalary, timeAgo, JOB_TYPE_LABELS, SCHEDULE_LABELS } from "@/lib/format";

export interface JobCardData {
  id: string;
  slug: string;
  title: string;
  jobType: string;
  workArrangement: string;
  schedules: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  salaryType: string | null;
  publishedAt: Date | null;
  featured?: boolean;
  urgentHiring?: boolean;
  company: { name: string; verificationStatus: string };
  location: { name: string } | null;
  saved?: boolean;
}

export function JobCard({ job }: { job: JobCardData }) {
  const verified = job.company.verificationStatus === "VERIFIED";
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-emerald-300 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/jobs/${job.slug}`} className="text-base font-semibold text-slate-900 hover:text-emerald-700 hover:underline">
              {job.title}
            </Link>
            {job.featured && <Badge tone="amber">Featured</Badge>}
            {job.urgentHiring && <Badge tone="rose">Urgent</Badge>}
          </div>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-600">
            <span className="truncate font-medium">{job.company.name}</span>
            {verified && (
              <span className="inline-flex shrink-0 items-center gap-0.5 text-xs font-medium text-emerald-700" title="Verified employer">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 14.5 4.5 18 4l.5 3.5L22 9l-2 3 2 3-3.5 1.5L18 20l-3.5-.5L12 22l-2.5-2.5L6 20l-.5-3.5L2 15l2-3-2-3 3.5-1.5L6 4l3.5.5z" /><path d="m9.5 12.2 1.8 1.8 3.4-3.6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>
                Verified
              </span>
            )}
          </p>
        </div>
      </div>
      <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-600">
        {job.location && <div className="flex items-center gap-1"><dt className="sr-only">Location</dt><dd>{job.location.name}</dd></div>}
        <div className="flex items-center gap-1"><dt className="sr-only">Job type</dt><dd>{JOB_TYPE_LABELS[job.jobType] ?? job.jobType}</dd></div>
        <div className="flex items-center gap-1"><dt className="sr-only">Salary</dt><dd className="font-medium text-slate-800">{formatSalary(job.salaryMin, job.salaryMax, job.salaryType)}</dd></div>
        {job.schedules.slice(0, 2).map((s) => (
          <div key={s} className="flex items-center gap-1"><dt className="sr-only">Schedule</dt><dd>{SCHEDULE_LABELS[s] ?? s}</dd></div>
        ))}
      </dl>
      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          View Job
        </Link>
        <SaveButton jobId={job.id} saved={!!job.saved} />
      </div>
      {job.publishedAt && <p className="mt-2.5 text-xs text-slate-500">Posted {timeAgo(job.publishedAt)}</p>}
    </article>
  );
}

export function SaveButton({ jobId, saved }: { jobId: string; saved: boolean }) {
  return (
    <form action={`/api/jobs/${jobId}/save`} method="post">
      <button
        type="submit"
        aria-label={saved ? "Unsave job" : "Save job"}
        aria-pressed={saved}
        title={saved ? "Unsave job" : "Save job"}
        className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${
          saved ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-300 text-slate-500 hover:bg-slate-50"
        }`}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      </button>
    </form>
  );
}
