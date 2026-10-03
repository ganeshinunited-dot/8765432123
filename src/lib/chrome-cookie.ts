/**
 * Client-safe helpers for the readable chrome-hint cookie (`gx_chrome`).
 * Set server-side by createSession()/destroySession() in lib/auth.ts.
 * Lets Navbar/Footer hide the public chrome INSTANTLY (synchronously from
 * document.cookie, plus a pre-paint inline script in the root layout)
 * instead of flashing the public top bar after login.
 */
export const CHROME_COOKIE = "gx_chrome";
export type ChromeMode = "app" | "admin" | "";

const MAX_AGE = 30 * 24 * 3600; // 30 days, matches the session lifetime

export function readChromeCookie(): ChromeMode {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(/(?:^|;\s*)gx_chrome=([^;]*)/);
  const v = m ? decodeURIComponent(m[1]) : "";
  return v === "app" || v === "admin" ? v : "";
}

export function writeChromeCookie(v: ChromeMode): void {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  if (v) {
    document.cookie = `${CHROME_COOKIE}=${v}; path=/; max-age=${MAX_AGE}; samesite=lax${secure}`;
  } else {
    document.cookie = `${CHROME_COOKIE}=; path=/; max-age=0; samesite=lax${secure}`;
  }
}

/**
 * Apply/remove the pre-paint hiding hook on <html> immediately.
 * Mirrors the inline head script so client-side navigations (no page reload)
 * also hide the public chrome without waiting for /api/auth/me.
 */
export function syncChromeAttr(): void {
  if (typeof document === "undefined") return;
  if (readChromeCookie() === "app") {
    document.documentElement.setAttribute("data-chrome", "app");
  } else {
    document.documentElement.removeAttribute("data-chrome");
  }
}
