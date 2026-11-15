import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const MAX_NAME = 50;
const MAX_BODY = 1000;

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: RouteParams) {
  const { slug } = await params;
  const article = await db.article.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const comments = await db.articleComment.findMany({
    where: { articleId: article.id, status: "published" },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: { id: true, name: true, body: true, createdAt: true },
  });
  return NextResponse.json({ comments });
}

export async function POST(req: Request, { params }: RouteParams) {
  const { slug } = await params;
  const article = await db.article.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const name =
    typeof (data as { name?: unknown })?.name === "string"
      ? (data as { name: string }).name.trim()
      : "";
  const body =
    typeof (data as { body?: unknown })?.body === "string"
      ? (data as { body: string }).body.trim()
      : "";
  if (!name || name.length > MAX_NAME) {
    return NextResponse.json(
      { error: "Name is required (max 50 characters)." },
      { status: 400 }
    );
  }
  if (!body || body.length > MAX_BODY) {
    return NextResponse.json(
      { error: "Comment is required (max 1000 characters)." },
      { status: 400 }
    );
  }

  const comment = await db.articleComment.create({
    data: { articleId: article.id, name, body },
    select: { id: true, name: true, body: true, createdAt: true },
  });
  return NextResponse.json({ comment }, { status: 201 });
}
