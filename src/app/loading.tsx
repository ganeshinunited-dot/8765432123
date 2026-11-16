/**
 * Instant feedback on tab clicks: while a dynamic listing page renders on
 * the server, show this light skeleton instead of a stuck-looking page.
 * Server component — no JavaScript.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6" aria-busy="true">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-8 w-56 animate-pulse rounded bg-slate-200" />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
        ))}
      </div>
    </div>
  );
}
