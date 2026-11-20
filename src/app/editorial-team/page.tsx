import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Editorial Team",
  description: "Who writes and checks Growentix: Ganesh Karki writes every article, and the Growentix editorial process reviews each one against its official source before publication — no article goes live without human review.",
  alternates: { canonical: "https://growentix.cloud/editorial-team" },
};

export default function EditorialTeamPage() {
  return (
    <StaticPage
      title="Editorial Team"
      subtitle="Who writes and checks Growentix — and how every article is reviewed before it is published."
      updated="November 19, 2026"
    >
      <Section title="1. Who we are">
        <p>
          Growentix articles are written by{" "}
          <a href="https://ganeshkarki.info.np/" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:underline">
            Ganesh Karki
          </a>
          , the founder of Growentix — the byline on every article names him and links to his portfolio.
          Each article is then checked through the Growentix editorial review process before publication: a
          human editor verifies the facts against the official source, and no article goes live without
          that review.
        </p>
      </Section>

      <Section title="2. How every article is reviewed">
        <p>
          A human editor reviews every article before it goes live — checking the facts against the source,
          the headline against the story, and the article against our{" "}
          <Link href="/editorial-policy" className="font-semibold text-emerald-700 hover:underline">Editorial Policy</Link>
          . AI may assist our research and editing, but it never publishes on its own. No article is published
          without that review.
        </p>
      </Section>

      <Section title="3. What we check before publishing">
        <p>
          Before any vacancy is published, our editors verify it against the original source. The full list is
          in our{" "}
          <Link href="/verification-policy" className="font-semibold text-emerald-700 hover:underline">Verification Policy</Link>
          :
        </p>
        <Bullets
          items={[
            "The original employer or recruiting organisation behind the vacancy.",
            "The official recruitment notice or announcement — not a copy on another site.",
            "The exact job title and location, and who can apply.",
            "The application deadline and time zone, where the notice states one.",
            "Salary or pay details — only when the notice publishes them; never invented.",
            "The official application link, and that it leads to the employer or its official portal.",
            "Visa and sponsorship claims, checked against the official notice or the employer's own guidance.",
            "The source and the date it was verified — recorded and linked in the article.",
          ]}
        />
        <p>
          Only a vacancy that passes all nine checks may carry the Verified label, with the verification date
          shown in the article.
        </p>
      </Section>

      <Section title="4. Sources and corrections">
        <p>
          Every article lists its official sources so readers can check the facts for themselves. Where a
          source does not state a figure, the article says so plainly instead of filling the gap. Where
          sources disagree, the article states the discrepancy with both numbers. We correct errors as soon
          as we find them, and we update articles when deadlines, dates or official details change. Closed
          vacancies are marked as closed and leave the sitemap. If you spot an error, tell us through the{" "}
          <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">Contact page</Link>
          {" "}and we will re-check it.
        </p>
      </Section>

      <Section title="5. Editorial independence">
        <p>
          Our editorial decisions are independent of advertising and paid placements. Sponsored listings or
          featured announcements, where they exist, are clearly labelled and never change what we write about
          a vacancy or how we verify it.
        </p>
      </Section>
    </StaticPage>
  );
}
