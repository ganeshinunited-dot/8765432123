import { manualAds } from "@/data/manualAds";

// Empty ad slots show a bright "Your Ads Here" card. Tapping it opens
// the owner's WhatsApp inbox with a prefilled ad-enquiry message, so an
// advertiser can contact him directly.
const WHATSAPP_AD_LINK =
  "https://wa.me/9779842902535?text=Hello!%20I%20want%20to%20place%20an%20ad%20on%20Growentix.";

function WhatsAppButton({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#25d366] font-bold text-white shadow-md shadow-black/20 ${
        compact ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      <svg
        className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      </svg>
      Message us on WhatsApp
    </span>
  );
}

export function ManualAdSlot({
  slot,
  className = "",
}: {
  slot: string;
  className?: string;
}) {
  const ad = manualAds[slot];

  // A configured manual ad always wins over the placeholder.
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

  const isBanner = slot === "leaderboard" || slot === "infeed-home";

  return (
    <a
      href={WHATSAPP_AD_LINK}
      target="_blank"
      rel="noopener"
      className={`group block overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white shadow-md transition hover:shadow-lg ${className}`}
    >
      {isBanner ? (
        <span className="flex h-full w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 text-center">
          <span className="font-display text-xl font-extrabold uppercase tracking-wide drop-shadow-sm sm:text-2xl">
            Your Ads Here
          </span>
          <span className="hidden text-xs font-semibold text-white/90 sm:inline">
            Advertise on Growentix
          </span>
          <WhatsAppButton compact />
        </span>
      ) : (
        <span className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-4 text-center">
          <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-wide drop-shadow-sm">
            Your
            <br />
            Ads Here
          </span>
          <span className="text-xs font-semibold text-white/90">
            Advertise on Growentix — reach thousands of job seekers
          </span>
          <WhatsAppButton />
        </span>
      )}
    </a>
  );
}
