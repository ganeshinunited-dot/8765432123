import Link from "next/link";
import type { CountryGuide } from "@/lib/countryGuides";

/**
 * Country guidance panel for country listing pages (GEO Step 6).
 * Rendered between the subtitle and the search box, page 1 only.
 * James Clear look: system fonts, slate colours, no new colours, no images.
 */
export function CountryIntro({ guide }: { guide: CountryGuide }) {
  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm leading-relaxed text-slate-700">{guide.guidance}</p>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Official resources
      </p>
      <ul className="mt-2 space-y-1.5">
        {guide.officialLinks.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              {l.label} ↗
            </a>
          </li>
        ))}
      </ul>

      {guide.guides.length > 0 && (
        <>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Guides on Growentix
          </p>
          <ul className="mt-2 space-y-1.5">
            {guide.guides.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Also on Growentix
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        {guide.related.map((r, i) => (
          <span key={r.href}>
            {i > 0 && <span className="mx-1 text-slate-400">·</span>}
            <Link href={r.href} className="font-medium text-emerald-700 hover:underline">
              {r.label}
            </Link>
          </span>
        ))}
      </p>
    </div>
  );
}
