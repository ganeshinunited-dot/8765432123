import { NextResponse } from "next/server";

function gone() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function GET() {
  return gone();
}

export async function POST() {
  return gone();
}

export async function PUT() {
  return gone();
}

export async function PATCH() {
  return gone();
}

export async function DELETE() {
  return gone();
}
