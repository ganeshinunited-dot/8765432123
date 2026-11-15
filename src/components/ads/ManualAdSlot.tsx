import { manualAds } from "@/data/manualAds";

const SLOT_LABELS: Record<string, string> = {
  leaderboard: "728 × 90",
  "sidebar-home": "300 × 250",
  "infeed-home": "728 × 90",
  "sidebar-article-top": "300 × 250",
  "sidebar-article-bottom": "300 × 250",
};

export function ManualAdSlot({
  slot,
  className = "",
}: {
  slot: string;
  className?: string;
}) {
  const ad = manualAds[slot];

  if (ad?.imageUrl) {
    const banner = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={ad.imageUrl}
        alt={ad.alt ?? "Advertisement"}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
    return (
      <div
        className={`overflow-hidden rounded-2xl border border-slate-200 bg-white ${className}`}
      >
        {ad.linkUrl ? (
          <a
            href={ad.linkUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block h-full w-full"
          >
            {banner}
          </a>
        ) : (
          banner
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 text-center ${className}`}
    >
      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
        Advertisement
      </span>
      <span className="mt-1 text-xs text-slate-400">
        {SLOT_LABELS[slot] ?? slot} — timro ad yaha
      </span>
    </div>
  );
}
