import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { StaticPage, Section } from "@/components/layout/StaticPage";
import { Card, Badge } from "@/components/ui/primitives";
import { CourseCarousel } from "@/components/courses/CourseCarousel";
import { CourseCard, type CarouselCourse } from "@/components/courses/CourseCard";

export const metadata: Metadata = {
  title: "Sell your course",
  description: "Teach on Growentix: upload unlimited courses, get daily ad promotion, eSewa/Khalti payments and AI-matched students.",
};

export const revalidate = 300;

const FEATURES = [
  { title: "Facebook & Instagram ads every day", text: "We run 1 ad for your course daily for 3 months — you focus on teaching." },
  { title: "Post design for your course", text: "Professional promotional creatives designed for you." },
  { title: "Live support", text: "Real humans to help you and your students, when it matters." },
  { title: "Easy payments", text: "eSewa and Khalti built in. Students pay in seconds." },
  { title: "Unlimited course upload", text: "No caps. Upload as many courses and videos as you want." },
  { title: "Featured on Growentix", text: "Your courses get premium placement across the website." },
  { title: "Pro video editing + Canva Pro", text: "Professional editing for your lessons and 1 year of Canva Pro free." },
  { title: "AI student matching", text: "Our AI suggests your course to the right students automatically." },
];

export default async function CourseLanding() {
  const featured = await db.course
    .findMany({
      where: { status: "PUBLISHED", featured: true },
      take: 6,
      orderBy: { sales: "desc" },
      select: { title: true, slug: true, price: true, category: true, sales: true },
    })
    .catch(() => []);

  const freeCourses: CarouselCourse[] = await db.course
    .findMany({
      where: { status: "PUBLISHED", price: 0 },
      take: 12,
      orderBy: { views: "desc" },
      select: {
        title: true, slug: true, price: true, category: true, sales: true, views: true, thumbnailUrl: true,
        instructor: { select: { isVerified: true, user: { select: { name: true } } } },
      },
    })
    .then((rows) =>
      rows.map((c) => ({
        slug: c.slug, title: c.title, price: c.price, category: c.category, sales: c.sales,
        views: c.views, thumbnailUrl: c.thumbnailUrl, instructorName: c.instructor.user.name,
        isVerified: c.instructor.isVerified,
      })),
    )
    .catch(() => []);

  return (
    <StaticPage
      title="Teach. Earn. Grow."
      subtitle="Sell your courses on Growentix. We handle ads, design, payments and student matching — you just teach."
    >
      <div className="flex flex-wrap gap-3">
        <Link href="/signup?role=INSTRUCTOR" className="inline-flex h-12 items-center rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800">
          Start selling — Rs. 20,000/year
        </Link>
        <Link href="/courses" className="inline-flex h-12 items-center rounded-lg border border-slate-300 px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Browse courses
        </Link>
      </div>

      {freeCourses.length > 0 && (
        <Section title="Free courses — start watching now">
          <CourseCarousel label="Free courses">
            {freeCourses.map((c) => (
              <CourseCard key={c.slug} c={c} />
            ))}
          </CourseCarousel>
          <p className="mt-3">
            <Link href="/courses" className="text-sm font-semibold text-emerald-700 hover:underline">Browse all courses →</Link>
          </p>
        </Section>
      )}

      <Section title="One plan. Everything included.">
        <Card className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">Creator Yearly</h2>
                <Badge tone="green">Most popular</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">For course sellers. Billed once a year.</p>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              NPR 20,000 <span className="text-sm font-medium text-slate-500">/year</span>
            </p>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">✓</span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">{f.title}</span>
                  <span className="mt-0.5 block text-sm text-slate-600">{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/signup?role=INSTRUCTOR" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 sm:w-auto">
            Continue — create your seller account
          </Link>
          <p className="mt-3 text-xs text-slate-500">After signup you'll complete billing (eSewa/Khalti) and land in your course dashboard.</p>
        </Card>
      </Section>

      <Section title="How it works">
        <ol className="grid gap-4 sm:grid-cols-4">
          {[
            ["1. See pricing", "Everything is on this page — one yearly plan, no hidden fees."],
            ["2. Create account", "Sign up as a course seller in under a minute."],
            ["3. Pay yearly", "Your billing details are pre-filled. Scan the QR with eSewa/Khalti (demo)."],
            ["4. Start selling", "Upload videos, track views & sales, and watch AI bring you students."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-bold text-slate-900">{t}</p>
              <p className="mt-1 text-sm text-slate-600">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {featured.length > 0 && (
        <Section title="Featured courses">
          <div className="grid gap-4 sm:grid-cols-3">
            {featured.map((c) => (
              <Link key={c.slug} href={`/courses/${c.slug}`} className="block">
                <Card className="p-5 transition-shadow hover:shadow-md">
                  {c.category && <Badge tone="blue">{c.category}</Badge>}
                  <h3 className="mt-2 font-bold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {c.price === 0 ? "Free" : `NPR ${c.price.toLocaleString()}`} · {c.sales} students
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section title="Seller trust, powered by AI">
        <p className="max-w-3xl text-slate-600">
          Every instructor starts at <strong>Bronze</strong>. Collect 10 student reviews to reach{" "}
          <strong>Silver</strong>. Our AI reads every review — positive or negative — and curates a fair summary for
          your page. Sellers with consistently positive feedback earn automatic verification.
        </p>
      </Section>
    </StaticPage>
  );
}
