interface LogoProps {
  /** Show the wordmark next to the mark. */
  wordmark?: boolean;
  /** Visual size of the mark. */
  size?: "sm" | "md" | "lg";
  /** Render wordmark in white (for dark backgrounds). */
  inverted?: boolean;
}

const SIZES = { sm: 32, md: 38, lg: 46 };

/**
 * Growentix logo — a clean "G" for Growth: open arc with an amber crossbar,
 * on a deep-emerald tile. Pure SVG, no images, scales to any size.
 */
export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Growentix logo" className="shrink-0">
      <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#065F46" />
      <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="none" stroke="#047857" strokeWidth="1" />
      {/* G arc */}
      <path d="M32 14.5 A12.4 12.4 0 1 0 36.1 26.6" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      {/* Crossbar (growth arrow shaft) */}
      <path d="M36.1 26.6 L25.5 26.6" fill="none" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ wordmark = true, size = "md", inverted = false }: LogoProps) {
  const px = SIZES[size];
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={px} />
      {wordmark && (
        <span
          className={`font-extrabold tracking-tight ${inverted ? "text-white" : "text-slate-900"}`}
          style={{ fontSize: Math.round(px * 0.52) }}
        >
          Grow<span className="text-emerald-600">entix</span>
        </span>
      )}
    </span>
  );
}
