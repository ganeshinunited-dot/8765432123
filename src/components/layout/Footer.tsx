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
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Part-time, evening, weekend and remote job opportunities for students across Nepal — from verified employers. Free for talent, forever.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/sarkari-jobs" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10">Sarkari Jobs</Link>
              <Link href="/course" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10">Courses</Link>
            </div>
          </div>
          <nav aria-label="Talent">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Talent</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/jobs" className="hover:text-emerald-300">Find jobs</Link></li>
              <li><Link href="/jobs?type=PART_TIME" className="hover:text-emerald-300">Part-time jobs</Link></li>
              <li><Link href="/jobs?arrangement=REMOTE" className="hover:text-emerald-300">Remote jobs</Link></li>
              <li><Link href="/jobs?type=INTERNSHIP" className="hover:text-emerald-300">Internships</Link></li>
              <li><Link href="/safety" className="hover:text-emerald-300">Job seeker safety</Link></li>
            </ul>
          </nav>
          <nav aria-label="Employers">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Employers</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/for-employers" className="hover:text-emerald-300">Post a job</Link></li>
              <li><Link href="/companies" className="hover:text-emerald-300">Companies</Link></li>
              <li><Link href="/employer-guidelines" className="hover:text-emerald-300">Employer guidelines</Link></li>
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
          <p>© {new Date().getFullYear()} Growentix. A job marketplace — we do not guarantee employment.</p>
        </div>
      </div>
    </footer>
  );
}
