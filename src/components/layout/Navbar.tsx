"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavAuth } from "./NavAuth";
import { Logo } from "./Logo";
import { readChromeCookie, writeChromeCookie, syncChromeAttr } from "@/lib/chrome-cookie";

interface SessionState {
  loggedIn: boolean;
  isAdmin: boolean;
}

export function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    // Instant: the readable chrome-hint cookie (set at login) already tells us
    // the truth — this covers client-side navigations right after login/logout
    // with no reload and no waiting for the fetch below.
    syncChromeAttr();
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        const s = { loggedIn: !!d.user, isAdmin: !!d.user?.isAdmin };
        setSession(s);
        // Reconcile the hint cookie with the server truth (heals sessions
        // created before this change, expiry drift, etc.).
        const want = s.loggedIn ? (s.isAdmin ? "admin" : "app") : "";
        if (readChromeCookie() !== want) {
          writeChromeCookie(want);
          syncChromeAttr();
        }
      })
      .catch(() => setSession({ loggedIn: false, isAdmin: false }));
    // Re-run on every navigation: the layout persists across client-side
    // route changes, so without this the chrome would stay stale after login.
  }, [pathname]);

  // Logged-in non-admins (talent / employers / sellers) live in their
  // dashboard app — no public chrome at all, anywhere.
  // (Also hidden instantly via CSS from the pre-paint script; this removes it
  // from the DOM once the session is confirmed.)
  if (session && session.loggedIn && !session.isAdmin) return null;

  // Admins keep a compact top bar (it carries the Admin/Employer view switcher).
  if (session && session.loggedIn && session.isAdmin) {
    return (
      <header className="gx-public-chrome sticky top-0 z-40 border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center" aria-label="Growentix home">
            <Logo />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <NavAuth />
          </div>
        </div>
      </header>
    );
  }

  // Visitors: no top bar at all — one floating Sign up button that suggests
  // itself from the top-center only after the visitor scrolls to the bottom
  // (behavior-based CTA: they've seen the content, now invite them in).
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = document.documentElement;
      const distanceToBottom = el.scrollHeight - (window.innerHeight + window.scrollY);
      setShowCta((prev) => {
        if (distanceToBottom <= 200) return true; // reached the bottom → suggest
        if (distanceToBottom > 600) return false; // scrolled back up → hide (hysteresis)
        return prev;
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  if (pathname === "/signup") return null;
  return (
    <Link
      href="/signup"
      aria-hidden={!showCta}
      tabIndex={showCta ? 0 : -1}
      className={`gx-public-chrome gx-btn gx-btn-primary gx-cta-float inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold${
        showCta ? " gx-cta-show" : ""
      }`}
    >
      Sign up
    </Link>
  );
}
