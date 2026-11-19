import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LogoIntro } from "@/components/layout/LogoIntro";
import { BottomNav } from "@/components/layout/BottomNav";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://growentix.cloud";

export const metadata: Metadata = {
  title: {
    default: "Growentix – Global Jobs. Trusted Opportunities.",
    template: "%s | Growentix",
  },
  description:
    "Global job news and trusted opportunities from around the world — international recruitment, remote jobs, government and private sector vacancies, and career news, verified against official sources.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Growentix",
    title: "Growentix – Global Jobs. Trusted Opportunities.",
    description:
      "Global job news and trusted opportunities from around the world — international recruitment, remote jobs, government and private sector vacancies, and career news.",
    url: "/",
    images: ["https://growentix.cloud/icon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growentix – Global Jobs. Trusted Opportunities.",
    description:
      "Global job news and trusted opportunities from around the world — international recruitment, remote jobs, government and private sector vacancies, and career news.",
    images: ["https://growentix.cloud/icon.svg"],
  },
  robots: { index: true, follow: true },
  other: { "google-adsense-account": "ca-pub-4375599901125250" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <GoogleAnalytics />
        {/* Google AdSense - site-wide verification script (ca-pub-4375599901125250).
            lazyOnload (like GA): the 204 KB third-party script used to load
            afterInteractive AND get preloaded in <head>, competing with the
            page's own CSS/JS on slow phones and pushing mobile LCP to 3.3 s.
            It still loads on every page, just after load — the verification
            meta tag above is untouched and no ad slots render on the site. */}
        <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4375599901125250"
          crossOrigin="anonymous"
        />
        {/* Site-wide Organization + WebSite schema. A plain <script> tag
            (not next/script): next/script only injects inline JSON-LD
            after hydration, so crawlers that do not run JavaScript never
            saw the site's identity at all. The "@id" lets article pages
            reference this same Organization entity. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://growentix.cloud/#organization",
                  name: "Growentix",
                  url: "https://growentix.cloud",
                  logo: "https://growentix.cloud/icon.svg",
                  description:
                    "Global job news and trusted opportunities from around the world.",
                },
                {
                  "@type": "WebSite",
                  name: "Growentix",
                  url: "https://growentix.cloud",
                },
              ],
            }),
          }}
        />
        <ToastProvider>
          <LogoIntro />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BottomNav />
          {/* Spacer so the fixed mobile tab bar never covers footer content. */}
          <div className="h-[68px] md:hidden" aria-hidden="true" />
        </ToastProvider>
      </body>
    </html>
  );
}
