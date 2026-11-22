import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

// Human-review queue for fact-check requests (MVP, 2026-11-22).
// POST { claim, url?, website2? } — a claim with no verified verdict is
// emailed to support@growentix.cloud for an editor to check against
// primary sources. No verdict is ever generated here: the queue IS the
// human-in-the-loop step from the spec. Email failures never fail the
// request (the claim is still accepted; the failure is logged).
export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field; humans never see it.
  // Accept silently and create nothing — never tell a bot it was caught.
  if (typeof (data as { website2?: unknown })?.website2 === "string" && (data as { website2: string }).website2.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  // Soft rate limit (in-memory, per process — see lib/rate-limit.ts).
  if (!rateLimit(clientKey("fact-check-submit", req), 3, 3_600_000)) {
    return NextResponse.json(
      { error: "Too many requests from this address. Please try again in an hour." },
      { status: 429 }
    );
  }

  const claim = typeof (data as { claim?: unknown })?.claim === "string"
    ? ((data as { claim: string }).claim ?? "").trim()
    : "";
  const urlRaw = typeof (data as { url?: unknown })?.url === "string"
    ? ((data as { url: string }).url ?? "").trim()
    : "";
  if (claim.length < 10 || claim.length > 1000) {
    return NextResponse.json(
      { error: "Please paste a claim between 10 and 1000 characters." },
      { status: 400 }
    );
  }
  let url = "";
  if (urlRaw) {
    try {
      const parsed = new URL(urlRaw);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") url = parsed.href;
    } catch {
      url = "";
    }
  }

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  try {
    await sendEmail({
      to: "support@growentix.cloud",
      subject: `Fact-check request: ${claim.slice(0, 80)}${claim.length > 80 ? "…" : ""}`,
      html: `<p>A reader asked Growentix to check this claim:</p><blockquote>${escapeHtml(claim)}</blockquote>${
        url ? `<p>Seen at: <a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p>` : "<p>No source link was given.</p>"
      }<p>Check it against primary sources and publish the verdict as a fact-check article if it verifies.</p>`,
    });
  } catch (e) {
    console.error("[fact-check-submit] email failed:", e);
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
