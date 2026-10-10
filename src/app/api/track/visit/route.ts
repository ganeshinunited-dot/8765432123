import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/db";

/**
 * First-party visitor tracking — free forever, no third party, no cookies.
 * The browser fires one sendBeacon per page view; the server stores a single
 * row per (day, visitor, path). Raw IPs are never stored: visitors are counted
 * by a salted daily hash, so the same person counts once per page per day.
 *
 * Body: { path: string }
 */

const BOT_RE = /bot|crawl|spider|slurp|mediapartners|baidu|yandex|sogou|exabot|facebot|ia_archiver|ahrefs|semrush|mj12|dotbot|petal/i;

function shouldSkip(path: string): boolean {
  if (path === "/api" || path.startsWith("/api/")) return true;
  if (path === "/_next" || path.startsWith("/_next/")) return true;
  if (path === "/admin" || path.startsWith("/admin/")) return true;
  return ["/favicon.ico", "/robots.txt", "/sitemap.xml", "/icon.svg"].includes(path);
}

function dayBucket(now: Date): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) return NextResponse.json({ ok: true, skipped: true });

  const body = await req.json().catch(() => ({}));
  const rawPath = String(body.path || "/").slice(0, 300);
  const path = rawPath.split("?")[0] || "/";
  if (shouldSkip(path)) return NextResponse.json({ ok: true, skipped: true });

  const now = new Date();
  const day = dayBucket(now);
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const salt = process.env.CRON_SECRET || "growentix";
  const visitorHash = createHash("sha256")
    .update(`${ip}|${day.toISOString()}|${salt}`)
    .digest("hex")
    .slice(0, 32);

  const country = req.headers.get("x-vercel-ip-country")?.slice(0, 2) || null;
  const referer = req.headers.get("referer");
  let referrer: string | null = null;
  if (referer) {
    try {
      const host = new URL(referer).hostname;
      if (host !== req.headers.get("host")) referrer = host.slice(0, 120);
    } catch {
      referrer = null;
    }
  }

  try {
    await db.siteVisit.create({
      data: { path, day, visitorHash, country, referrer },
    });
  } catch {
    // duplicate (day, visitor, path) — already counted, ignore
  }
  return NextResponse.json({ ok: true });
}
