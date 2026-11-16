import { articleCategoryLabel } from "@/lib/articles";

/** Placeholder per search scope — each section's box says what it searches. */
const SCOPE_PLACEHOLDERS: Record<string, string> = {
  all: "Search stories…",
  jobs: "Search jobs…",
  stories: "Search stories…",
  "tech-ai": "Search tech news…",
  "pop-music": "Search pop music…",
};

/**
 * Small search bar — submits to the Stories (/stories) page with the
 * section's scope, so a search from Jobs searches jobs, from Tech searches
 * tech, and so on. Used on Jobs, News, Tech and category pages.
 * Scope values: "all" (everything), "jobs" (job categories only),
 * "stories" (pop-music + tech-ai only), or a single category slug.
 */
export function SmallSearch({ scope = "all", placeholder, defaultValue = "" }: { scope?: string; placeholder?: string; defaultValue?: string }) {
  const ph = placeholder ?? SCOPE_PLACEHOLDERS[scope] ?? `Search ${articleCategoryLabel(scope)} jobs…`;
  return (
    <form
      action="/stories"
      method="get"
      role="search"
      className="flex max-w-md items-center rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200"
    >
      <label htmlFor="small-search" className="sr-only">
        Search
      </label>
      <input type="hidden" name="scope" value={scope} />
      <input
        id="small-search"
        name="search"
        type="search"
        defaultValue={defaultValue}
        placeholder={ph}
        className="h-9 w-full flex-1 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.8-3.8" />
        </svg>
      </button>
    </form>
  );
}
