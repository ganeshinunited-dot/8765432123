import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Growentix.",
};

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service" subtitle="The agreement between you and Growentix when you use our site." updated="October 15, 2026">
      <Section title="1. Acceptance of terms">
        <p>
          By using Growentix, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please
          do not use the site. Growentix is a job news and information site; we are not an employer, a recruiter, or a
          placement agency, and we do not guarantee employment.
        </p>
      </Section>

      <Section title="2. Our content">
        <Bullets
          items={[
            "Articles and vacancy notices are published for general information. Details such as deadlines, seats, eligibility, and fees can change — always verify them against the official notice or organisation linked in each article before applying.",
            "We aim for accuracy and correct errors promptly, but we do not warrant that any article is complete, current, or error-free.",
            "Vacancy notices are summaries of official announcements. The official notice is the authoritative source; where our summary differs, the official notice prevails.",
            "We link to third-party websites (government portals, employers, news sources) for reference. We do not control those sites and are not responsible for their content, accuracy, or availability.",
          ]}
        />
      </Section>

      <Section title="3. No employment relationship">
        <p>
          Reading an article or following a link on Growentix does not create any employment relationship between you
          and Growentix, or between you and any employer mentioned. Any application, interview, or hiring decision is
          solely between you and the hiring organisation. Growentix is not a party to employment contracts and is not
          responsible for wages, working conditions, or the conduct of any employer.
        </p>
      </Section>

      <Section title="4. Stay safe">
        <Bullets
          items={[
            <><strong>Never pay anyone to apply for or receive a job.</strong> Any request for payment, gift cards, or &ldquo;training fees&rdquo; before hiring is a strong sign of a scam.</>,
            "Apply only through the official channels named in the notice — never through unofficial agents or middlemen.",
            "Never share passwords, OTPs, or banking credentials with anyone claiming to represent an employer.",
          ]}
        />
      </Section>

      <Section title="5. Prohibited conduct">
        <Bullets
          items={[
            "Scraping, bulk harvesting of content, or attempts to circumvent rate limits and access controls.",
            "Uploading malware, impersonating another person or organisation, or interfering with the site's operation.",
            "Using the site for any unlawful purpose under the laws of Nepal.",
          ]}
        />
      </Section>

      <Section title="6. Intellectual property">
        <p>
          Articles published on Growentix are our original work unless credited otherwise; quoted material and source
          links remain the property of their respective owners. You may share links to our articles freely. Reproducing
          substantial portions of our articles without permission is not permitted.
        </p>
      </Section>

      <Section title="7. Liability">
        <p>
          The site is provided &ldquo;as is&rdquo;. To the maximum extent permitted by law, Growentix is not liable for
          indirect or consequential losses arising from use of the site, from reliance on an article or vacancy notice,
          or from the actions of third parties. Nothing in these terms limits liability that cannot be limited by law.
        </p>
      </Section>

      <Section title="8. Changes and governing law">
        <p>
          We may update these terms; material changes will be posted on this page with a revised date. These terms are
          governed by the laws of Nepal, and disputes will be subject to the jurisdiction of the courts of Nepal.
          Questions? See our <Link href="/support" className="font-semibold text-emerald-700 hover:underline">Support page</Link>.
        </p>
      </Section>
    </StaticPage>
  );
}
