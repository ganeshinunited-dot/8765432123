// One-time idempotent seed for the platform's own FREE YouTube-based AI courses.
// Run: npx tsx prisma/seedFreeCourses.ts   (DATABASE_URL must be set)
// Safe to re-run: upserts on email + course slug.
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomBytes } from "crypto";

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const COURSES = [
  {
    slug: "build-apps-with-ai-beginners",
    title: "Build an App with AI as a Beginner (Vibe Coding + No Code)",
    description:
      "Free course: learn how to build your own app using AI — vibe coding and no-code tools explained for absolute beginners. No prior coding needed.",
    youtubeId: "VaOYvUFtq5Q",
    category: "AI & Tech",
  },
  {
    slug: "genai-essentials-beginners",
    title: "GenAI Essentials — Full Course for Beginners",
    description:
      "Free course: a complete beginner-friendly introduction to generative AI — what it is, how it works, and how to use it in real life and work.",
    youtubeId: "nJ25yl34Uqw",
    category: "AI & Tech",
  },
  {
    slug: "prompt-engineering-full-course-2026",
    title: "Prompt Engineering Full Course 2026",
    description:
      "Free course: master prompt engineering from zero — write better prompts, get better answers, and use AI like a pro in 2026.",
    youtubeId: "SpazTFm-e_8",
    category: "AI & Tech",
  },
  {
    slug: "n8n-ai-automation-zero-to-hero",
    title: "n8n AI Automation — Zero to Hero",
    description:
      "Free course: build powerful AI workflows with n8n — automate tasks, connect apps, and go from zero to hero in AI automation.",
    youtubeId: "NlKDQcf2mtI",
    category: "AI & Tech",
  },
  {
    slug: "vibe-coding-nepali-ai-app",
    title: "Create Your First App in Nepali Using AI (Vibe Coding)",
    description:
      "Free course IN NEPALI: create your first app step by step using AI — a full vibe coding tutorial explained in simple Nepali.",
    youtubeId: "tiAwsYh7dPY",
    category: "AI & Tech",
  },
];

export async function seedFreeCourses(client: PrismaClient = db) {
  const academy = await client.user.upsert({
    where: { email: "academy@growentix.cloud" },
    update: {},
    create: {
      email: "academy@growentix.cloud",
      name: "Growentix Academy",
      passwordHash: "disabled-" + randomBytes(16).toString("hex"),
      role: "INSTRUCTOR",
      emailVerified: true,
    },
  });
  const profile = await client.instructorProfile.upsert({
    where: { userId: academy.id },
    update: { isPaid: true, isVerified: true, tier: "GOLD" },
    create: {
      userId: academy.id,
      bio: "Growentix's own free learning channel — hand-picked AI and tech courses for Nepali students.",
      expertise: "AI, No-code, Automation",
      isPaid: true,
      isVerified: true,
      tier: "GOLD",
      planName: "Growentix Academy",
    },
  });

  for (const c of COURSES) {
    const course = await client.course.upsert({
      where: { slug: c.slug },
      update: {
        title: c.title,
        description: c.description,
        price: 0,
        status: "PUBLISHED",
        category: c.category,
        thumbnailUrl: `https://i.ytimg.com/vi/${c.youtubeId}/hqdefault.jpg`,
      },
      create: {
        instructorId: profile.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        price: 0,
        status: "PUBLISHED",
        category: c.category,
        thumbnailUrl: `https://i.ytimg.com/vi/${c.youtubeId}/hqdefault.jpg`,
        videos: {
          create: { title: c.title, youtubeId: c.youtubeId, position: 0 },
        },
      },
    });
    // ensure the video exists even if the course already did
    const existing = await client.courseVideo.findFirst({ where: { courseId: course.id, youtubeId: c.youtubeId } });
    if (!existing) {
      await client.courseVideo.create({ data: { courseId: course.id, title: c.title, youtubeId: c.youtubeId, position: 0 } });
    }
    console.log("seeded:", c.slug);
  }
}

if (require.main === module) {
  seedFreeCourses()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
