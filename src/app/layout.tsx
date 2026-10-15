import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LogoIntro } from "@/components/layout/LogoIntro";
import { BottomNav } from "@/components/layout/BottomNav";
import { TrackVisit } from "@/components/analytics/TrackVisit";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], weight: ["600", "700", "800"] });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://growentix.cloud";

export const metadata: Metadata = {
  title: {
    default: "Growentix — Daily Job News & Vacancy Notices | Nepal & Abroad",
    template: "%s | Growentix",
  },
  description:
    "Daily job news and vacancy notices from Nepal and around the world — sarkari vacancies, Gulf jobs, Korea & Japan, remote work and work-abroad updates, in English and Nepali.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Growentix",
    title: "Growentix — Daily Job News & Vacancy Notices | Nepal & Abroad",
    description:
      "Daily job news and vacancy notices from Nepal and around the world — sarkari vacancies, Gulf jobs, Korea & Japan, remote work and work-abroad updates.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growentix — Daily Job News & Vacancy Notices | Nepal & Abroad",
    description:
      "Daily job news and vacancy notices from Nepal and around the world — sarkari vacancies, Gulf jobs, Korea & Japan, remote work and work-abroad updates.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        {/* Pre-paint chrome hint: hide the public top bar/footer instantly for
            signed-in app users (gx_chrome=app cookie set at login). Runs before
            hydration so there is no flash of the public navbar after login. */}
        <Script
          id="gx-chrome-hint"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var m=document.cookie.match(/(?:^|;\\s*)gx_chrome=([^;]*)/);if(m&&decodeURIComponent(m[1])==="app")document.documentElement.setAttribute("data-chrome","app")}catch(e){}`,
          }}
        />
        <ToastProvider>
          <TrackVisit />
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
