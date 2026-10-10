"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires one first-party page-view beacon per navigation to /api/track/visit.
 * Uses sendBeacon (fire-and-forget, never blocks rendering). No cookies.
 */
export function TrackVisit() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    try {
      const payload = JSON.stringify({ path: pathname });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track/visit", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/track/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // tracking must never break the page
    }
  }, [pathname]);

  return null;
}
