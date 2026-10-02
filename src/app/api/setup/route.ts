import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// One-time production setup endpoint. Inert (404) unless SETUP_SECRET is set
// in the environment AND the caller presents it in the x-setup-secret header.
// Remove this route (and the env var) after initial setup is complete.

const LOCATIONS = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Butwal", "Dharan", "Nepalgunj"];
const CATEGORIES: [string, string][] = [
  ["Hospitality", "hospitality"], ["Retail & Sales", "retail-sales"], ["Delivery & Logistics", "delivery-logistics"],
  ["Tutoring & Education", "tutoring-education"], ["Digital Marketing", "digital-marketing"],
  ["Customer Service", "customer-service"], ["Data Entry & Admin", "data-entry-admin"],
  ["Design & Creative", "design-creative"], ["IT & Tech Support", "it-tech-support"], ["Events & Promotion", "events-promotion"],
];
const SKILLS = ["Communication", "Customer Service", "MS Excel", "Data Entry", "Canva", "Social Media", "English", "Nepali Typing", "Driving (2-wheeler)", "Cooking", "Cash Handling", "Photography", "Video Editing", "Teaching", "Sales"];
const PLANS = [
  { name: "Free", slug: "free", priceMonthly: 0, jobPostLimit: 1, featuredAllowed: false, candidateSearch: false, active: true, description: "1 active job post. Good for trying out." },
  { name: "Basic", slug: "basic", priceMonthly: 999, jobPostLimit: 5, featuredAllowed: true, candidateSearch: false, active: true, description: "5 active jobs + featured slot." },
  { name: "Premium", slug: "premium", priceMonthly: 2499, jobPostLimit: 20, featuredAllowed: true, candidateSearch: true, active: true, description: "20 active jobs + featured slots + candidate search + priority support." },
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function authorized(req: NextRequest): boolean {
  const secret = process.env.SETUP_SECRET;
  if (!secret) return false;
  return req.headers.get("x-setup-secret") === secret;
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  let body: { action?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.action === "seed") {
    for (const name of LOCATIONS) {
      await db.location.upsert({ where: { slug: slugify(name) }, update: {}, create: { name, slug: slugify(name) } });
    }
    for (const [name, slug] of CATEGORIES) {
      await db.jobCategory.upsert({ where: { slug }, update: {}, create: { name, slug } });
    }
    for (const name of SKILLS) {
      await db.skill.upsert({ where: { name }, update: {}, create: { name } });
    }
    for (const p of PLANS) {
      await db.subscriptionPlan.upsert({ where: { slug: p.slug }, update: {}, create: p });
    }
    return NextResponse.json({ ok: true, seeded: { locations: LOCATIONS.length, categories: CATEGORIES.length, skills: SKILLS.length, plans: PLANS.length } });
  }

  if (body.action === "promote") {
    const email = (body.email || "").trim().toLowerCase();
    if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "No account found for that email. Sign up first." }, { status: 404 });
    await db.user.update({ where: { id: user.id }, data: { role: "ADMIN", emailVerified: true } });
    return NextResponse.json({ ok: true, promoted: email });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
