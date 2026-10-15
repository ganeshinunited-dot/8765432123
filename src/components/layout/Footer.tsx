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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" aria-label="Growentix home">
            <Logo />
          </Link>
          <nav aria-label="Company" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            <Link href="/about" className="hover:text-emerald-300">About</Link>
            <Link href="/privacy" className="hover:text-emerald-300">Privacy policy</Link>
            <Link href="/terms" className="hover:text-emerald-300">Terms of service</Link>
          </nav>
        </div>
        <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-slate-500">
          <p className="mb-2 font-medium text-amber-400">Never pay an employer to apply for or receive a job.</p>
          <p>© {new Date().getFullYear()} Growentix. Job news and vacancy notices — we do not guarantee employment.</p>
        </div>
      </div>
    </footer>
  );
}
