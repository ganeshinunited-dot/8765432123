/**
 * ChatGPT domain-verification challenge endpoint.
 *
 * OpenAI's plugin portal issues a verification token at submission time.
 * Set it as the Vercel environment variable OPENAI_APPS_VERIFICATION_TOKEN
 * (no code change needed) and this route serves the exact token as plain
 * text at /.well-known/openai-apps-challenge, which is what the portal
 * checks. Until the token is set, the route returns 404.
 *
 * If the portal issues a different challenge path instead (some guides cite
 * /.well-known/openai-apps), add a sibling route with the same body.
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.OPENAI_APPS_VERIFICATION_TOKEN;
  if (!token) {
    return new NextResponse("Verification token not configured.", {
      status: 404,
    });
  }
  return new NextResponse(token, {
    headers: { "Content-Type": "text/plain" },
  });
}
