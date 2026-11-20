/** Blue Meta-style verified badge (2026-11-20): a blue circle with a
 *  white check, shown next to the site author's name in the byline and
 *  on the author page. The blue is Meta's badge blue (#0866FF) — the only
 *  new colour on the site; everything else keeps the existing palette. */
export function VerifiedBadge({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Verified author"
    >
      <circle cx="12" cy="12" r="12" fill="#0866FF" />
      <path
        d="M17 8.5L10.8 14.7 7.5 11.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
