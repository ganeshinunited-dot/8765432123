import Link from "next/link";
import { Logo } from "./Logo";

// Public footer — renders on every public page, articles included, for
// every visitor: logged out, admin, and signed-in employers alike.
//
// It used to hide for signed-in non-admin users (dashboard-app chrome
// hiding: the gx_chrome cookie + /api/auth/me fetch + the
// html[data-chrome="app"] .gx-public-chrome CSS rule). That chain is
// fragile on flaky mobile data — a stale "app" cookie plus a failed or
// slow reconcile fetch left the footer hidden for the admin too, on
// article pages, while the homepage (seen logged out) still showed it.
// The footer belongs on every public page, so it no longer takes part
// in chrome hiding: no session fetch, no gx-public-chrome class, so
// neither the React guard nor the CSS rule can hide it.
// (The Navbar keeps its own session-aware header; the CSS rule now only
// affects it.)
export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" aria-label="Growentix home">
            <Logo />
          </Link>
          <nav aria-label="Company" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            <Link href="/about" className="hover:text-emerald-300">About</Link>
            <Link href="/countries" className="hover:text-emerald-300">Countries</Link>
            <Link href="/government-jobs" className="hover:text-emerald-300">Government Jobs</Link>
            <Link href="/private-jobs" className="hover:text-emerald-300">Private Jobs</Link>
            <Link href="/industries" className="hover:text-emerald-300">Industries</Link>
            <Link href="/companies" className="hover:text-emerald-300">Companies</Link>
            <Link href="/for-employers" className="hover:text-emerald-300">For Employers</Link>
            <Link href="/editorial-policy" className="hover:text-emerald-300">Editorial policy</Link>
            <Link href="/editorial-team" className="hover:text-emerald-300">Editorial team</Link>
            <Link href="/verification-policy" className="hover:text-emerald-300">Verification policy</Link>
            <Link href="/contact" className="hover:text-emerald-300">Contact</Link>
            <Link href="/privacy" className="hover:text-emerald-300">Privacy policy</Link>
            <Link href="/terms" className="hover:text-emerald-300">Terms of service</Link>
            <a href="https://www.facebook.com/MysticVibes123" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">Mystic Vibes on Facebook</a>
          </nav>
        </div>
        <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-slate-500">
          <p>Growentix – Global Jobs. Trusted Opportunities.</p>
          <p className="mt-1">© 2026 Growentix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
