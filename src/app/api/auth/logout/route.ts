import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST(req: Request) {
  await destroySession();
  const url = new URL("/", req.url);
  return NextResponse.redirect(url, { status: 303 });
}
