import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Growentix — Have Talent? Find Work That Fits",
    template: "%s | Growentix",
  },
  description:
    "Discover part-time, evening, weekend, remote and entry-level opportunities from verified employers across Nepal. Free for talent, forever.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
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
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
