"use client";

import Link from "next/link";

// Last-resort error boundary: if anything crashes during render, show this
// friendly page instead of a blank white screen.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Growentix</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          The page hit an unexpected error. Try again — if it keeps happening, let us know.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => reset()}
            className="gx-btn gx-btn-primary inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold"
          >
            Try again
          </button>
          <Link
            href="/"
            className="gx-btn gx-btn-frost inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold"
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
