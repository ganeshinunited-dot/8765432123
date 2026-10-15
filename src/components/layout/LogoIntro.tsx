"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gx-intro-seen";

/**
 * Logo intro — plays once per browser session on first visit.
 * The Growentix "G" draws itself (arc, then red crossbar), the wordmark
 * fades up, then the overlay lifts away to reveal the site.
 * Skipped for logged-in app users, reduced-motion users, and repeat
 * navigations in the same session. Pure CSS keyframes; the overlay
 * removes itself even if an animation event never fires.
 */
export function LogoIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (document.cookie.includes("gx_chrome=app")) return; // dashboard users
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      return;
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="gx-intro fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white" aria-hidden="true">
      <svg width="88" height="88" viewBox="0 0 48 48" className="gx-intro-tile">
        <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#2A2A2A" />
        <path
          d="M32 14.5 A12.4 12.4 0 1 0 36.1 26.6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={100}
          className="gx-intro-arc"
        />
        <path
          d="M36.1 26.6 L25.5 26.6"
          fill="none"
          stroke="#E10600"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={100}
          className="gx-intro-bar"
        />
      </svg>
      <p className="gx-intro-word mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-900">
        Grow<span className="text-[#E10600]">entix</span>
      </p>
    </div>
  );
}
