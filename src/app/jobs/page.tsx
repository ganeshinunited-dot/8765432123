import Link from "next/link";
import { db } from "@/lib/db";
import { JobCard } from "@/components/jobs/JobCard";
import { EmptyState, Card } from "@/components/ui/primitives";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobFiltersMobile } from "@/components/jobs/JobFiltersMobile";
import { JobSearchBar } from "@/components/jobs/JobSearchBar";
import { AiJobSearch } from "@/components/jobs/AiJobSearch";
import { SortDropdown } from "./SortDropdown";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

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
            <EmptyState
              title="We couldn't find jobs matching your filters."
              description="Try expanding your location, removing the salary filter, searching remote jobs, or checking weekend jobs."
              action={
                <Link href="/jobs" className="inline-flex h-11 items-center rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800">
                  Clear Filters
                </Link>
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map((j) => <JobCard key={j.id} job={j} />)}
            </div>
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
