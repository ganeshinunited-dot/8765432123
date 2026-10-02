"use client";

import { useEffect, useRef } from "react";

/**
 * Pings our own /api/track/view once per page view so the server can fire a
 * Klaviyo "Viewed Job" event. Used on ISR-cached pages (job detail) where the
 * server component cannot see the session. The browser never calls Klaviyo.
 */
export function ViewTracker({ kind, slug }: { kind: "job" | "course"; slug: string }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    fetch("/api/track/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, slug }),
      keepalive: true,
    }).catch(() => {});
  }, [kind, slug]);
  return null;
}
