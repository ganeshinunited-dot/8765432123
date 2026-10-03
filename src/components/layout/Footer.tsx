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
    <footer className="gx-public-chrome border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Part-time, evening, weekend and remote job opportunities for students across Nepal — from verified employers.
            </p>
          </div>
          <nav aria-label="Job seekers">
            <h3 className="text-sm font-semibold text-slate-900">Job Seekers</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/jobs" className="hover:text-emerald-700">Find jobs</Link></li>
              <li><Link href="/jobs?type=PART_TIME" className="hover:text-emerald-700">Part-time jobs</Link></li>
              <li><Link href="/jobs?arrangement=REMOTE" className="hover:text-emerald-700">Remote jobs</Link></li>
              <li><Link href="/jobs?type=INTERNSHIP" className="hover:text-emerald-700">Internships</Link></li>
              <li><Link href="/safety" className="hover:text-emerald-700">Job seeker safety</Link></li>
            </ul>
          </nav>
          <nav aria-label="Employers">
            <h3 className="text-sm font-semibold text-slate-900">Employers</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/for-employers" className="hover:text-emerald-700">Post a job</Link></li>
              <li><Link href="/companies" className="hover:text-emerald-700">Companies</Link></li>
              <li><Link href="/employer-guidelines" className="hover:text-emerald-700">Employer guidelines</Link></li>
            </ul>
          </nav>
          <nav aria-label="Company">
            <h3 className="text-sm font-semibold text-slate-900">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-emerald-700">About</Link></li>
              <li><Link href="/support" className="hover:text-emerald-700">Help &amp; Support</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-700">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-700">Terms of service</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-700">Privacy policy</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p className="mb-2 font-medium text-amber-700">Never pay an employer to apply for or receive a job.</p>
          <p>© {new Date().getFullYear()} Growentix. A job marketplace — we do not guarantee employment.</p>
          <p className="mt-2 text-xs">
            <Link href="/course" className="text-slate-400 hover:text-emerald-700">Course</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
