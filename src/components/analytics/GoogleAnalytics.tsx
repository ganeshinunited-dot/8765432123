import Script from "next/script";

/**
 * Google Analytics 4, gated on NEXT_PUBLIC_GA_MEASUREMENT_ID.
 * Renders nothing until the measurement ID is set as a Vercel env var,
 * so no tracking fires before the property exists and the privacy
 * page discloses analytics.
 *
 * Strategy is lazyOnload (browser idle time) rather than afterInteractive:
 * GA's ~180 KB gzip payload no longer competes with the page load on
 * phones. Trade-off: pageviews that bounce within ~1-2 s may not be
 * recorded. GA is NOT removed — per-article view counts still work.
 */
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
      <Script id="gx-ga-config" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
