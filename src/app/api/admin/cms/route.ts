import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { z } from "zod";

const pageSchema = z.object({
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens."),
  title: z.string().min(2).max(120),
  content: z.string().min(10, "Content is too short."),
});

export async function POST(req: Request) {
  return NextResponse.json({ error: "Admins have read-only access. Content changes are disabled." }, { status: 403 });
}
