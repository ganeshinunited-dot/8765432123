import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How Growentix writes and checks its job news: original and accurate content, no fake vacancies, no misleading headlines, and human editorial review on every article.",
  alternates: { canonical: "https://growentix.cloud/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <StaticPage
      title="Editorial Policy"
      subtitle="How Growentix writes, checks and corrects its job news — and what we will never publish."
      updated="November 18, 2026"
    >
      <Section title="1. Our promise">
        <p>
          Growentix publishes global job news and employment information that readers can trust. Every article
          must be original, accurate and useful — written in natural, professional English, and checked against
          the official source before it is published. We would rather publish fewer articles than publish one
          we cannot stand behind.
        </p>
      </Section>

      <Section title="2. What we publish">
        <p>
          Global recruitment news, country-specific vacancies, remote jobs, government and private sector
          recruitment, banking and finance jobs, healthcare recruitment, technology jobs, international
          organisations, career news and employment trends. Every article must provide meaningful information
          beyond simply rewriting another website&apos;s content — deadline context, eligibility, what the
          opportunity means for applicants, or what the source does not say.
        </p>
      </Section>

      <Section title="3. What we never publish">
        <Bullets
          items={[
            "Copied or spun articles — every piece is written originally for Growentix.",
            "Fake vacancies or opportunities that do not exist.",
            "Misleading headlines that promise more than the article delivers.",
            "Fabricated salary, sponsorship or visa information.",
            "Expired vacancies presented as if they were still open.",
          ]}
        />
      </Section>

      <Section title="4. Accuracy and sources">
        <p>
          Every fact in an article — post counts, pay, deadlines, fees, age limits, eligibility — must come
          from the official recruitment notice or a reputable source, and the source is linked in the article.
          Where a source does not state a figure, the article says so plainly instead of filling the gap.
          Where sources disagree, the article states the discrepancy with both numbers. See our{" "}
          <Link href="/verification-policy" className="font-semibold text-emerald-700 hover:underline">Verification Policy</Link>
          {" "}for the nine checks every vacancy must pass before publication.
        </p>
      </Section>

      <Section title="5. AI assistance and human review">
        <p>
          AI may assist our research and editing, but it never publishes on its own. A human editor reviews
          every article before it goes live — checking the facts against the source, the headline against the
          story, and the article against this policy. No article is published without that review.
        </p>
      </Section>

      <Section title="6. Author attribution">
        <p>
          Growentix articles are published under the Growentix name, and every article lists its official
          sources so readers can check the facts for themselves. Individual authors are credited where an
          article carries a named byline.
        </p>
      </Section>

      <Section title="7. Corrections and updates">
        <p>
          We correct errors as soon as we find them, and we update articles when deadlines, dates or official
          details change. Closed vacancies are marked as closed and leave the sitemap. If you spot an error,
          tell us through the{" "}
          <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">Contact page</Link>
          {" "}and we will correct it.
        </p>
      </Section>

      <Section title="8. Editorial independence">
        <p>
          Our editorial decisions are independent of advertising and paid placements. Sponsored listings or
          featured announcements, where they exist, are clearly labelled and never change what we write about
          a vacancy or how we verify it.
        </p>
      </Section>
    </StaticPage>
  );
}
