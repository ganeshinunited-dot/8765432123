import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { z } from "zod";

const planSchema = z.object({
  name: z.string().min(2).max(60),
  description: z.string().max(500).optional().or(z.literal("")),
  priceMonthly: z.number().int().min(0),
  jobPostLimit: z.number().int().min(1).max(1000),
  featuredAllowed: z.boolean(),
  candidateSearch: z.boolean(),
  active: z.boolean(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ error: "Admins have read-only access. Content changes are disabled." }, { status: 403 });
}
