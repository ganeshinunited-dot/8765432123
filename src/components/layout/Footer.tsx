"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "./Logo";
import { readChromeCookie, writeChromeCookie, syncChromeAttr } from "@/lib/chrome-cookie";

interface SessionState {
  loggedIn: boolean;
  isAdmin: boolean;
}

export function Footer() {
  const pathname = usePathname();
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    // Instant hide from the readable chrome-hint cookie (set at login) —
    // covers client-side navigations with no reload.
    syncChromeAttr();
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        const s = { loggedIn: !!d.user, isAdmin: !!d.user?.isAdmin };
        setSession(s);
        // Reconcile the hint cookie with the server truth.
        const want = s.loggedIn ? (s.isAdmin ? "admin" : "app") : "";
        if (readChromeCookie() !== want) {
          writeChromeCookie(want);
          syncChromeAttr();
        }
      })
      .catch(() => setSession({ loggedIn: false, isAdmin: false }));
    // Re-run on every navigation: the layout persists across client-side
    // route changes, so without this the footer would stay stale after login.
  }, [pathname]);

  // Logged-in non-admins live in their dashboard app — the public footer is
  // hidden for them everywhere. Admins keep the public chrome as before.
  // (Also hidden instantly via CSS from the pre-paint script; this removes it
  // from the DOM once the session is confirmed.)
  if (session && session.loggedIn && !session.isAdmin) return null;

  return (
    <footer className="gx-public-chrome bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Daily job news and vacancy notices — from Nepal and around the world.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/sarkari-jobs" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10">Sarkari Jobs</Link>
              <Link href="/articles" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10">Articles</Link>
            </div>
          </div>
          <nav aria-label="Explore">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/sarkari-jobs" className="hover:text-emerald-300">Sarkari Jobs</Link></li>
              <li><Link href="/articles" className="hover:text-emerald-300">Articles</Link></li>
              <li><Link href="/articles?category=gulf" className="hover:text-emerald-300">Gulf Jobs</Link></li>
              <li><Link href="/articles?category=korea-japan" className="hover:text-emerald-300">Korea &amp; Japan</Link></li>
              <li><Link href="/articles?category=remote" className="hover:text-emerald-300">Remote Work</Link></li>
              <li><Link href="/safety" className="hover:text-emerald-300">Job seeker safety</Link></li>
            </ul>
          </nav>
          <nav aria-label="Company">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-emerald-300">About</Link></li>
              <li><Link href="/support" className="hover:text-emerald-300">Help &amp; Support</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-300">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-300">Terms of service</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-300">Privacy policy</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          <p className="mb-2 font-medium text-amber-400">Never pay an employer to apply for or receive a job.</p>
          <p>© {new Date().getFullYear()} Growentix. Job news and vacancy notices — we do not guarantee employment.</p>
        </div>
      </div>
    </footer>
  );
}
