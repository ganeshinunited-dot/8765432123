/**
 * One-time cleanup of fake seed content from production.
 *
 * Removes:
 *  1. Demo jobs (seeded with the "*Demo listing — created by the development
 *     seed script.*" marker in their description)
 *  2. Demo companies left with no remaining jobs
 *  3. The "DELETE ME Test" user (test.delete@growentix.local)
 *
 * Idempotent — safe to run on every build; no-ops when nothing is left.
 * Run at Vercel build time (see vercel.json) where DATABASE_URL is available.
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const DEMO_JOB_MARKER = "Demo listing — created by the development seed script.";
const DEMO_COMPANY_NAMES = [
  "Himalayan Cafe & Bakery",
  "SwiftKart Delivery",
  "Bright Minds Tuition Center",
];
const DEMO_USER_EMAIL = "test.delete@growentix.local";

async function main() {
  // 1. Demo jobs — matched by the seed marker OR by demo company name
  //    (robust: prod demo jobs were seeded before the marker text was final).
  const demoCompanyIds = (
    await db.company.findMany({
      where: { name: { in: DEMO_COMPANY_NAMES } },
      select: { id: true },
    })
  ).map((c) => c.id);
  const demoJobs = await db.job.findMany({
    where: {
      OR: [
        { description: { contains: DEMO_JOB_MARKER } },
        { companyId: { in: demoCompanyIds } },
      ],
    },
    select: { id: true },
  });
  if (demoJobs.length > 0) {
    await db.job.deleteMany({ where: { id: { in: demoJobs.map((j) => j.id) } } });
  }
  console.log(`[cleanup] deleted ${demoJobs.length} demo job(s)`);

  // 2. Demo companies with no remaining jobs (fake company pages).
  for (const name of DEMO_COMPANY_NAMES) {
    const company = await db.company.findFirst({
      where: { name },
      include: { _count: { select: { jobs: true } } },
    });
    if (company && company._count.jobs === 0) {
      await db.company.delete({ where: { id: company.id } });
      console.log(`[cleanup] deleted demo company: ${name}`);
    } else if (company) {
      console.log(`[cleanup] kept ${name}: still has ${company._count.jobs} job(s)`);
    }
  }

  // 3. Test user.
  const testUser = await db.user.findUnique({ where: { email: DEMO_USER_EMAIL } });
  if (testUser) {
    await db.user.delete({ where: { id: testUser.id } });
    console.log(`[cleanup] deleted test user: ${DEMO_USER_EMAIL}`);
  } else {
    console.log("[cleanup] test user already gone");
  }
}

main()
  .catch((e) => {
    console.error("[cleanup] failed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
