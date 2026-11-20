/** Blue Meta-style verified badge (2026-11-20): Meta's scalloped seal —
 *  a blue rosette with a white check — shown next to the site author's
 *  name in the byline and on the author page. The blue is Meta's badge
 *  blue (#0866FF), the only new colour on the site. The seal is a
 *  12-lobe rosette (r = 10.9 + 0.9·cos(12θ)); at small sizes it reads as
 *  a crisp round badge, at larger sizes the scallops show. */
export function VerifiedBadge({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Verified author"
    >
      <path d="M23.8 12.0 L23.31 12.99 L22.29 13.81 L21.66 14.59 L21.82 15.57 L22.29 16.8 L22.22 17.9 L21.3 18.51 L20.01 18.72 L19.07 19.07 L18.72 20.01 L18.51 21.3 L17.9 22.22 L16.8 22.29 L15.57 21.82 L14.59 21.66 L13.81 22.29 L12.99 23.31 L12.0 23.8 L11.01 23.31 L10.19 22.29 L9.41 21.66 L8.43 21.82 L7.2 22.29 L6.1 22.22 L5.49 21.3 L5.28 20.01 L4.93 19.07 L3.99 18.72 L2.7 18.51 L1.78 17.9 L1.71 16.8 L2.18 15.57 L2.34 14.59 L1.71 13.81 L0.69 12.99 L0.2 12.0 L0.69 11.01 L1.71 10.19 L2.34 9.41 L2.18 8.43 L1.71 7.2 L1.78 6.1 L2.7 5.49 L3.99 5.28 L4.93 4.93 L5.28 3.99 L5.49 2.7 L6.1 1.78 L7.2 1.71 L8.43 2.18 L9.41 2.34 L10.19 1.71 L11.01 0.69 L12.0 0.2 L12.99 0.69 L13.81 1.71 L14.59 2.34 L15.57 2.18 L16.8 1.71 L17.9 1.78 L18.51 2.7 L18.72 3.99 L19.07 4.93 L20.01 5.28 L21.3 5.49 L22.22 6.1 L22.29 7.2 L21.82 8.43 L21.66 9.41 L22.29 10.19 L23.31 11.01 Z" fill="#0866FF" />
      <path
        d="M17 8.5L10.8 14.7 7.5 11.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
