import { NextResponse } from "next/server";

// Signups are disabled for now — Growentix is a news-only site at the moment.
// The full registration handler is kept in git history (commit before this
// change); re-enable by restoring it and the /signup form.
export async function POST(_req: Request) {
  return NextResponse.json({ error: "Signups are currently disabled." }, { status: 403 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
