import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SARKARI_JOBS,
  SARKARI_UPDATED,
  liveSarkariJobs,
  sarkariSlug,
  type SarkariJob,
} from "@/data/sarkariJobs";

export const dynamic = "force-static";

const CATEGORY_LABELS: Record<SarkariJob["category"], string> = {
  psc: "Public Service Commission",
  security: "Security Forces",
  health: "Health",
  education: "Education",
  local: "Local Government",
  bank: "Public Bank",
  enterprise: "Public Enterprise",
  other: "Public Sector",
};

const CATEGORY_BLURB: Record<SarkariJob["category"], string> = {
  psc: "The Public Service Commission (Lok Sewa Aayog) is Nepal's central body for recruiting civil servants. Its notices follow a formal written-exam and interview process — read the official syllabus and instructions carefully.",
  security:
    "Nepal's security forces — Nepal Police, Armed Police Force and the Nepali Army — recruit regularly for both officer and support roles. Physical standards and written tests usually apply; the official notice has the full criteria.",
  health:
    "Public hospitals and health institutions across Nepal hire doctors, nurses, paramedics and support staff throughout the year, often on contract as well as permanent posts.",
  education:
    "Universities, schools and education bodies announce teaching and administrative vacancies periodically. Check the official notice for subject requirements and eligibility.",
  local:
    "Local governments — gaunpalikas, nagarpalikas and metropolitan cities — are among the most active recruiters in Nepal, hiring for health, administration, engineering and support roles at the community level.",
  bank: "Public banks and financial institutions recruit for officer, assistant and support positions through competitive written exams and interviews.",
  enterprise:
    "Nepal's public enterprises — from utilities to trading companies — announce vacancies for technical, administrative and managerial roles.",
  other:
    "Public-sector bodies across Nepal announce vacancies throughout the year. The official notice is the authoritative source for eligibility and deadlines.",
};

function todayNpt(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function daysLeft(deadline: string): number {
  const [y, m, d] = deadline.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / 86400000);
}

function seatsPhrase(j: SarkariJob): string {
  if (j.seats == null) return "";
  return j.seats === 1 ? " for 1 open seat" : ` for ${j.seats} open seats`;
}

function articleTitle(j: SarkariJob): string {
  return `${j.postTitle} at ${j.organization} — Vacancy Notice ${j.deadline.slice(0, 4)}`;
}

/** Two readable intro paragraphs composed from the record — varied by id hash. */
function introParagraphs(j: SarkariJob): [string, string] {
  const deadline = fmtDate(j.deadline);
  const where = j.location ? ` in ${j.location}` : "";
  const seats = seatsPhrase(j);
  const qual = j.minQualification
    ? ` The minimum qualification is ${j.minQualification.charAt(0).toLowerCase() + j.minQualification.slice(1)}.`
    : "";
  const variants: [string, string][] = [
    [
      `${j.organization} has announced an opening for the post of ${j.postTitle}${where}${seats}.${qual} The last date to apply is ${deadline}.`,
      `${CATEGORY_BLURB[j.category]} Always confirm the details in the official notice before applying — this page summarises the notice for easy reading.`,
    ],
    [
      `A new vacancy notice is out: ${j.organization} is hiring a ${j.postTitle}${where}${seats}.${qual} Interested candidates should apply before ${deadline} through the official notice linked below.`,
      `${CATEGORY_BLURB[j.category]} Growentix lists public notices like this one for information only; applications go directly through the official channel.`,
    ],
    [
      `${j.organization} is looking for ${j.seats && j.seats > 1 ? `${j.seats} ` : "a "}${j.postTitle}${j.seats && j.seats > 1 ? "s" : ""}${where}.${qual} Applications close on ${deadline}.`,
      `${CATEGORY_BLURB[j.category]} Read the full vacancy details below, then follow the official notice link to apply — never pay anyone to apply for a government job.`,
    ],
  ];
  let h = 0;
  for (const ch of j.id) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return variants[h % variants.length];
}

function metaDescription(j: SarkariJob): string {
  const base = `${j.organization} vacancy: ${j.postTitle}${seatsPhrase(j)}${j.location ? `, ${j.location}` : ""}. Deadline ${fmtDate(j.deadline)}. Full details + official notice link.`;
  return base.length > 160 ? base.slice(0, 157) + "…" : base;
}

export async function generateStaticParams() {
  return SARKARI_JOBS.map((j) => ({ slug: sarkariSlug(j) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = SARKARI_JOBS.find((j) => sarkariSlug(j) === slug);
  if (!job) return { title: "Vacancy not found" };
  const title = articleTitle(job);
  const description = metaDescription(job);
  const url = `/sarkari-jobs/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary", title, description },
  };
}

function JsonLd({ job }: { job: SarkariJob }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${job.postTitle} — ${job.organization}`,
    description: introParagraphs(job).join(" "),
    datePosted: SARKARI_UPDATED,
    validThrough: job.deadline,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.organization,
      sameAs: job.noticeUrl,
    },
    jobLocation:
      job.location != null
        ? { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "NP" } }
        : { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "NP" } },
    directApply: true,
    applicationContact: { "@type": "ContactPoint", url: job.noticeUrl },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function SarkariArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = SARKARI_JOBS.find((j) => sarkariSlug(j) === slug);
  if (!job) notFound();

  const today = todayNpt();
  const expired = job.deadline < today;
  const n = daysLeft(job.deadline);
  const [p1, p2] = introParagraphs(job);
  const related = liveSarkariJobs(today)
    .filter((j) => j.id !== job.id && j.category === job.category)
    .slice(0, 4);
  const relatedFallback = liveSarkariJobs(today)
    .filter((j) => j.id !== job.id && j.category !== job.category)
    .slice(0, 4 - related.length);
  const relatedAll = [...related, ...relatedFallback];

  const details: [string, string | null][] = [
    ["Organisation", job.organization],
    ["Post", job.postTitle + (job.level ? ` (${job.level})` : "")],
    ["Open seats", job.seats != null ? String(job.seats) : null],
    ["Minimum qualification", job.minQualification],
    ["Location", job.location],
    ["Category", CATEGORY_LABELS[job.category]],
    ["Application deadline", fmtDate(job.deadline)],
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd job={job} />
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700 hover:underline">Home</Link>
        <span className="mx-2" aria-hidden="true">›</span>
        <Link href="/sarkari-jobs" className="hover:text-emerald-700 hover:underline">Sarkari Jobs</Link>
        <span className="mx-2" aria-hidden="true">›</span>
        <span className="text-slate-700">{job.postTitle}</span>
      </nav>

      <article className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900">
            {CATEGORY_LABELS[job.category]}
          </span>
          {expired ? (
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
              Closed
            </span>
          ) : n <= 0 ? (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-800">
              Last day today
            </span>
          ) : (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
              {n} {n === 1 ? "day" : "days"} left
            </span>
          )}
        </div>

        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {articleTitle(job)}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Published {fmtDate(SARKARI_UPDATED)} · Deadline {fmtDate(job.deadline)}
        </p>

        {expired && (
          <div className="mt-6 rounded-xl border border-slate-300 bg-slate-100 p-4 text-sm text-slate-700">
            This vacancy notice has closed — the application deadline ({fmtDate(job.deadline)}) has passed.
            The details below are kept for reference.{" "}
            <Link href="/sarkari-jobs" className="font-semibold text-emerald-700 hover:underline">
              Browse current notices →
            </Link>
          </div>
        )}

        <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-slate-700">
          <p>{p1}</p>
          <p>{p2}</p>
        </div>

        <h2 className="mt-10 font-display text-xl font-extrabold tracking-tight text-slate-900">
          Vacancy details
        </h2>
        <dl className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          {details.map(([k, v]) =>
            v == null ? null : (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-3 border-b border-slate-100 px-4 py-3 text-sm last:border-0 sm:grid-cols-[200px_1fr]">
                <dt className="font-semibold text-slate-500">{k}</dt>
                <dd className="text-slate-900">{v}</dd>
              </div>
            )
          )}
        </dl>

        <h2 className="mt-10 font-display text-xl font-extrabold tracking-tight text-slate-900">
          Important dates
        </h2>
        <ul className="mt-4 space-y-2 text-[1.05rem] text-slate-700">
          <li className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">Application deadline:</span> {fmtDate(job.deadline)}
            {!expired && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                {n <= 0 ? "Last day today" : `${n} ${n === 1 ? "day" : "days"} left`}
              </span>
            )}
          </li>
        </ul>

        <h2 className="mt-10 font-display text-xl font-extrabold tracking-tight text-slate-900">
          How to apply
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-[1.05rem] leading-relaxed text-slate-700">
          <li>Open the official vacancy notice using the button below and read it in full.</li>
          <li>Check that you meet the eligibility and qualification requirements.</li>
          <li>Submit your application exactly as instructed in the notice, before {fmtDate(job.deadline)}.</li>
          <li>Keep a copy of your submitted application and the notice for your records.</li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={job.noticeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gx-btn gx-btn-primary inline-flex items-center rounded-xl px-6 py-3 text-sm font-bold text-white"
          >
            Read the official notice ↗
          </a>
          {job.sourceUrl !== job.noticeUrl && (
            <a
              href={job.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-800"
            >
              Source page ↗
            </a>
          )}
        </div>

        <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          This is an informational summary of a public vacancy notice — Growentix did not post this job and does
          not accept applications for it. Always apply through the official notice. Never pay anyone to apply for
          or receive a government job.
        </div>

        {relatedAll.length > 0 && (
          <>
            <h2 className="mt-10 font-display text-xl font-extrabold tracking-tight text-slate-900">
              Related vacancy notices
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedAll.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/sarkari-jobs/${sarkariSlug(r)}`}
                    className="gx-lift block h-full rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{r.organization}</p>
                    <p className="mt-1 font-display text-[15px] font-bold text-slate-900">{r.postTitle}</p>
                    <p className="mt-1 text-xs text-slate-500">Deadline {fmtDate(r.deadline)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-10">
          <Link href="/sarkari-jobs" className="text-sm font-semibold text-emerald-700 hover:underline">
            ← All sarkari vacancy notices
          </Link>
        </div>
      </article>
    </main>
  );
}
