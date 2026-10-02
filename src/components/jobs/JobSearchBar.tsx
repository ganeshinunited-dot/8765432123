import Link from "next/link";

interface SearchBarProps {
  initial: { [key: string]: string | undefined };
}

const QUICK_FILTERS = [
  { label: "Part-time", param: "type", value: "PART_TIME" },
  { label: "Internships", param: "type", value: "INTERNSHIP" },
  { label: "Remote", param: "arrangement", value: "REMOTE" },
  { label: "Evening", param: "schedule", value: "EVENING" },
  { label: "Weekend", param: "schedule", value: "WEEKEND" },
  { label: "Verified employers", param: "verified", value: "1" },
] as const;

const PRESERVED = ["type", "arrangement", "schedule", "category", "verified", "sort"] as const;

export function JobSearchBar({ initial }: SearchBarProps) {
  const buildHref = (param: string, value: string) => {
    const qs = new URLSearchParams();
    for (const k of PRESERVED) if (initial[k]) qs.set(k, initial[k]!);
    if (initial.q) qs.set("q", initial.q);
    if (initial.location) qs.set("location", initial.location);
    qs.set(param, value);
    return `/jobs?${qs.toString()}`;
  };

  return (
    <div className="bg-emerald-800">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Find your next job</h1>
        <p className="mt-1.5 text-sm text-emerald-100 sm:text-base">
          Part-time, evening, weekend and remote roles that fit your student life.
        </p>

        <form action="/jobs" method="get" role="search" className="mt-6">
          {PRESERVED.map((k) =>
            initial[k] ? <input key={k} type="hidden" name={k} value={initial[k]} /> : null
          )}
          <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-lg sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 px-2">
              <svg className="h-5 w-5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <label htmlFor="jobs-q" className="sr-only">What job are you looking for?</label>
              <input
                id="jobs-q"
                name="q"
                type="search"
                defaultValue={initial.q || ""}
                placeholder="Job title, company, or skill…"
                className="h-12 w-full bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2 border-t border-slate-100 px-2 pt-2 sm:border-t-0 sm:pt-0">
              <svg className="h-5 w-5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <label htmlFor="jobs-location" className="sr-only">Where?</label>
              <input
                id="jobs-location"
                name="location"
                type="text"
                defaultValue={initial.location || ""}
                placeholder="Where? e.g. Kathmandu"
                className="h-12 w-full bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none sm:w-48"
              />
            </div>
            <button
              type="submit"
              className="h-12 shrink-0 rounded-xl bg-emerald-700 px-7 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
            >
              Search Jobs
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-emerald-200">Popular:</span>
          {QUICK_FILTERS.map((f) => {
            const active = initial[f.param] === f.value;
            return (
              <Link
                key={f.label}
                href={buildHref(f.param, f.value)}
                aria-current={active ? "true" : undefined}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  active
                    ? "border-white bg-white text-emerald-800"
                    : "border-emerald-400/50 text-white hover:border-white hover:bg-emerald-700"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
