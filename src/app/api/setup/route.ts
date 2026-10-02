import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

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

  if (body.action === "demo-content") {
    // Sample launch content: demo employers + public job listings.
    // Listings are labelled as demo content in their descriptions.
    const companiesSeed = [
      { name: "Himalayan Cafe & Bakery", industry: "Hospitality", description: "Cozy cafe in Thamel serving fresh bakery and coffee since 2015.", location: "kathmandu", verified: true },
      { name: "SwiftKart Delivery", industry: "Logistics", description: "Same-day delivery service operating across the Kathmandu valley.", location: "lalitpur", verified: true },
      { name: "Bright Minds Tuition Center", industry: "Education", description: "After-school tuition center for SEE and +2 students.", location: "kathmandu", verified: false },
    ];
    const jobsSeed: Array<Record<string, unknown>> = [
      { company: 0, title: "Weekend Barista (Part-time)", category: "hospitality", jobType: "PART_TIME", arrangement: "ON_SITE", schedules: ["WEEKEND"], salaryMin: 15000, salaryMax: 18000, salaryType: "MONTHLY", location: "kathmandu", skills: ["Communication", "Customer Service"], urgent: true, desc: "Serve coffee and pastries on Saturdays and Sundays. Training provided — perfect for students new to hospitality." },
      { company: 0, title: "Evening Cashier", category: "hospitality", jobType: "PART_TIME", arrangement: "ON_SITE", schedules: ["EVENING"], salaryMin: 120, salaryMax: 150, salaryType: "HOURLY", location: "kathmandu", skills: ["Cash Handling", "Communication"], desc: "Handle billing and customer queries during evening shifts (5 PM – 9 PM)." },
      { company: 1, title: "Delivery Rider (Flexible hours)", category: "delivery-logistics", jobType: "PART_TIME", arrangement: "ON_SITE", schedules: ["MORNING", "AFTERNOON", "EVENING"], salaryMin: 20000, salaryMax: 30000, salaryType: "MONTHLY", location: "lalitpur", skills: ["Driving (2-wheeler)"], desc: "Deliver parcels across Lalitpur. Choose your own 4-hour shifts. Fuel allowance included." },
      { company: 1, title: "Customer Support Intern (Remote)", category: "customer-service", jobType: "INTERNSHIP", arrangement: "REMOTE", schedules: ["AFTERNOON", "EVENING"], salaryMin: 10000, salaryMax: 12000, salaryType: "MONTHLY", location: "kathmandu", skills: ["Communication", "English"], desc: "Reply to customer chats and calls from home. Laptop and training provided." },
      { company: 2, title: "Math Tutor (Evenings)", category: "tutoring-education", jobType: "PART_TIME", arrangement: "ON_SITE", schedules: ["EVENING"], salaryMin: 300, salaryMax: 400, salaryType: "HOURLY", location: "kathmandu", skills: ["Teaching", "Communication"], desc: "Teach SEE-level mathematics, 2 hours each evening, Monday to Friday." },
      { company: 2, title: "Social Media Assistant", category: "digital-marketing", jobType: "PART_TIME", arrangement: "HYBRID", schedules: ["AFTERNOON"], salaryMin: 12000, salaryMax: 15000, salaryType: "MONTHLY", location: "kathmandu", skills: ["Social Media", "Canva"], featured: true, desc: "Create posts and reels for our tuition center. 3 days a week, mix of office and home." },
      { company: 0, title: "Data Entry Assistant (Weekends)", category: "data-entry-admin", jobType: "TEMPORARY", arrangement: "ON_SITE", schedules: ["WEEKEND"], salaryMin: 8000, salaryMax: 10000, salaryType: "MONTHLY", location: "bhaktapur", skills: ["Data Entry", "MS Excel"], desc: "One-month project digitizing supplier records. Weekends only." },
      { company: 1, title: "Event Promotion Staff", category: "events-promotion", jobType: "TEMPORARY", arrangement: "ON_SITE", schedules: ["WEEKEND"], salaryMin: 1500, salaryMax: 2000, salaryType: "DAILY", location: "pokhara", skills: ["Communication", "Sales"], desc: "Promote our delivery app at weekend events in Pokhara. Daily pay." },
    ];

    const createdCompanies = [];
    for (let i = 0; i < companiesSeed.length; i++) {
      const c = companiesSeed[i];
      const ownerEmail = `demo.employer${i + 1}@growentix.local`;
      const owner = await db.user.upsert({
        where: { email: ownerEmail },
        update: {},
        create: {
          email: ownerEmail,
          name: `${c.name} (Demo)`,
          role: "EMPLOYER",
          passwordHash: await hashPassword(crypto.randomBytes(24).toString("hex")),
          emailVerified: true,
        },
      });
      const loc = await db.location.findUnique({ where: { slug: c.location } });
      const company = await db.company.upsert({
        where: { slug: slugify(c.name) },
        update: {},
        create: {
          ownerId: owner.id, name: c.name, slug: slugify(c.name),
          industry: c.industry, description: c.description, locationId: loc?.id,
          verificationStatus: c.verified ? "VERIFIED" : "PENDING",
          verifiedAt: c.verified ? new Date() : null,
        },
      });
      createdCompanies.push(company);
    }

    let jobsCreated = 0;
    for (const j of jobsSeed) {
      const company = createdCompanies[j.company as number];
      const cat = await db.jobCategory.findUnique({ where: { slug: j.category as string } });
      const loc = await db.location.findUnique({ where: { slug: j.location as string } });
      const slug = slugify(`${j.title as string}-${company.slug}`);
      const existing = await db.job.findUnique({ where: { slug } });
      if (existing) continue;
      const job = await db.job.create({
        data: {
          slug, companyId: company.id, title: j.title as string,
          description: `**About this role**\n\n${j.desc as string}\n\n**What we offer**\n\n- Flexible hours that fit around your classes\n- Friendly team and on-the-job training\n- Timely monthly payment\n\n*Sample listing — posted by the Growentix team to demonstrate the marketplace. Employers can remove or replace these from the admin panel.*`,
          categoryId: cat?.id, jobType: j.jobType as "PART_TIME", workArrangement: j.arrangement as "ON_SITE",
          schedules: j.schedules as ("MORNING")[], locationId: loc?.id,
          salaryMin: j.salaryMin as number, salaryMax: j.salaryMax as number, salaryType: j.salaryType as "MONTHLY",
          openings: 2, status: "ACTIVE", featured: (j.featured as boolean) || false,
          urgentHiring: (j.urgent as boolean) || false, publishedAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 86400000),
        },
      });
      for (const s of j.skills as string[]) {
        const skill = await db.skill.findUnique({ where: { name: s } });
        if (skill) await db.jobSkill.create({ data: { jobId: job.id, skillId: skill.id } });
      }
      jobsCreated++;
    }
    return NextResponse.json({ ok: true, companies: createdCompanies.length, jobsCreated });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
