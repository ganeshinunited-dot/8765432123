import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { JobCard } from "@/components/jobs/JobCard";
import { Card } from "@/components/ui/primitives";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobFiltersMobile } from "@/components/jobs/JobFiltersMobile";
import { JobSearchBar } from "@/components/jobs/JobSearchBar";
import { AiJobSearch } from "@/components/jobs/AiJobSearch";
import { Reveal } from "@/components/ui/Reveal";
import { liveSarkariJobs } from "@/data/sarkariJobs";
import { SortDropdown } from "./SortDropdown";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jobs in Nepal for Students & Fresh Talent | Growentix",
  description:
    "Browse part-time jobs, internships and entry-level roles across Nepal. Free for talent — plus current government vacancy notices updated daily.",
  alternates: { canonical: "https://growentix.cloud/jobs" },
};

const PAGE_SIZE = 12;

interface SearchParams {
  q?: string;
  location?: string;
  type?: string;
  arrangement?: string;
  schedule?: string;
  category?: string;
  verified?: string;
  sort?: string;
  page?: string;
  [key: string]: string | undefined;
}

export default async function JobsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);

  const where: Prisma.JobWhereInput = { status: "ACTIVE" };
  const companyFilter: Prisma.CompanyWhereInput = {};
  if (sp.q) {
    where.OR = [
      { title: { contains: sp.q, mode: "insensitive" } },
      { description: { contains: sp.q, mode: "insensitive" } },
      { company: { name: { contains: sp.q, mode: "insensitive" } } },
    ];
  }
  if (sp.type && ["PART_TIME", "FULL_TIME", "INTERNSHIP", "TEMPORARY", "CONTRACT"].includes(sp.type)) {
    where.jobType = sp.type as Prisma.JobWhereInput["jobType"];
  }
  if (sp.arrangement && ["ON_SITE", "REMOTE", "HYBRID"].includes(sp.arrangement)) {
    where.workArrangement = sp.arrangement as Prisma.JobWhereInput["workArrangement"];
  }
  if (sp.schedule && ["MORNING", "AFTERNOON", "EVENING", "WEEKEND"].includes(sp.schedule)) {
    where.schedules = { has: sp.schedule as "MORNING" };
  }
  if (sp.location) {
    where.location = { name: { contains: sp.location, mode: "insensitive" } };
  }
  if (sp.category) {
    where.category = { slug: sp.category };
  }
  if (sp.verified === "1") {
    companyFilter.verificationStatus = "VERIFIED";
    companyFilter.OR = [{ verificationExpiresAt: null }, { verificationExpiresAt: { gt: new Date() } }];
  }
  if (Object.keys(companyFilter).length > 0) {
    where.company = companyFilter;
  }

  let orderBy: Prisma.JobOrderByWithRelationInput | Prisma.JobOrderByWithRelationInput[] = { publishedAt: "desc" };
  if (sp.sort === "salary") orderBy = { salaryMax: "desc" };
  else if (sp.sort === "featured") orderBy = [{ featured: "desc" }, { publishedAt: "desc" }];

  const [total, jobs, categories] = await Promise.all([
    db.job.count({ where }),
    db.job.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { company: { select: { name: true, verificationStatus: true, verificationExpiresAt: true, verifiedAt: true } }, location: { select: { name: true } } },
    }),
    db.jobCategory.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const liveSarkari = liveSarkariJobs().length;

  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) if (k !== "page" && v) qs.set(k, v);

  return (
    <div>
      <JobSearchBar initial={sp} />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <AiJobSearch />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <p className="text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{total}</span> {total === 1 ? "opportunity" : "opportunities"} found
        {sp.q && <> for &ldquo;<span className="font-medium text-slate-900">{sp.q}</span>&rdquo;</>}
        {sp.location && <> in <span className="font-medium text-slate-900">{sp.location}</span></>}
      </p>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <aside className="hidden w-72 shrink-0 lg:block">
          <Card className="sticky top-20 p-5">
            <JobFilters categories={categories} initial={sp} />
          </Card>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center gap-2 lg:hidden">
            <JobFiltersMobile categories={categories} initial={sp} />
            <SortSelect current={sp.sort} qs={qs.toString()} />
          </div>
          <div className="mb-4 hidden items-center justify-end lg:flex">
            <SortSelect current={sp.sort} qs={qs.toString()} />
          </div>

          {jobs.length === 0 ? (
            <NoEmployerJobs categories={categories} liveSarkari={liveSarkari} />
          ) : (
            <Reveal>
              <div className="grid gap-4 md:grid-cols-2">
                {jobs.map((j) => <JobCard key={j.id} job={j} />)}
              </div>
            </Reveal>
          )}

          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
              {page > 1 && <PageLink qs={qs.toString()} page={page - 1} label="‹ Prev" />}
              <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
              {page < totalPages && <PageLink qs={qs.toString()} page={page + 1} label="Next ›" />}
            </nav>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

function NoEmployerJobs({
  categories,
  liveSarkari,
}: {
  categories: { slug: string; name: string }[];
  liveSarkari: number;
}) {
  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="gx-eyebrow">Job board</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          No employer-posted roles at the moment
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          New opportunities from verified employers are on the way. Meanwhile, explore{" "}
          <Link href="/sarkari-jobs" className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2">
            current government vacancy notices
          </Link>{" "}
          or build your skills with free courses.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            href="/sarkari-jobs"
            className="gx-lift group rounded-xl border border-emerald-200 bg-emerald-50 p-5"
          >
            <p className="text-3xl font-extrabold text-emerald-800">{liveSarkari}</p>
            <p className="mt-1 text-sm font-medium text-emerald-900">current government vacancy notices</p>
            <p className="mt-2 text-sm font-semibold text-emerald-700 group-hover:underline">
              Browse notices <span aria-hidden="true">&rarr;</span>
            </p>
          </Link>
          <Link href="/courses" className="gx-lift group rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-3xl font-extrabold text-slate-900">18</p>
            <p className="mt-1 text-sm font-medium text-slate-700">free skill courses with video lessons</p>
            <p className="mt-2 text-sm font-semibold text-emerald-700 group-hover:underline">
              Start learning <span aria-hidden="true">&rarr;</span>
            </p>
          </Link>
          <Link href="/for-employers" className="gx-lift group rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-3xl font-extrabold text-slate-900">Hiring?</p>
            <p className="mt-1 text-sm font-medium text-slate-700">Post your role to verified student talent</p>
            <p className="mt-2 text-sm font-semibold text-emerald-700 group-hover:underline">
              For employers <span aria-hidden="true">&rarr;</span>
            </p>
          </Link>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">Browse by category</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/jobs?category=${encodeURIComponent(c.slug)}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-900">
          Part-time jobs, internships and entry-level roles across Nepal
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
          <p>
            Growentix lists flexible work for students and fresh talent — part-time roles, internships,
            weekend shifts and remote work in Kathmandu, Lalitpur, Bhaktapur, Pokhara and beyond. Every
            employer is verified before posting, so you can apply with confidence and never pay to apply.
          </p>
          <p>
            Alongside employer roles, we track {liveSarkari} current government vacancy notices from
            municipalities, hospitals, schools and public enterprises across Nepal, updated daily with
            deadlines, eligibility and official notice links. Create a free talent profile to get notified
            the moment new roles go live.
          </p>
        </div>
      </div>
    </div>
  );
}

function PageLink({ qs, page, label }: { qs: string; page: number; label: string }) {
  return (
    <Link
      href={`/jobs?${qs}${qs ? "&" : ""}page=${page}`}
      className="inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
    >
      {label}
    </Link>
  );
}

function SortSelect({ current, qs }: { current?: string; qs: string }) {
  return (
    <form action="/jobs" method="get" className="flex items-center gap-2">
      {qs.split("&").filter(Boolean).map((pair) => {
        const [k, v] = pair.split("=");
        if (k === "sort" || k === "page") return null;
        return <input key={k} type="hidden" name={decodeURIComponent(k)} value={decodeURIComponent(v || "")} />;
      })}
      <label htmlFor="sort" className="text-sm text-slate-600">Sort:</label>
      <SortDropdown current={current || "newest"} />
    </form>
  );
}
