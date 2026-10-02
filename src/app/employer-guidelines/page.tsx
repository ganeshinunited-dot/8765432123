import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Employer Guidelines",
  description: "Rules and best practices for employers posting jobs on Growentix.",
};

export default function EmployerGuidelinesPage() {
  return (
    <StaticPage
      title="Employer guidelines"
      subtitle="Growentix exists to give students fair access to flexible work. These rules keep the marketplace trustworthy for everyone."
    >
      <Section title="Posting a job">
        <Bullets
          items={[
            "Post only real, current vacancies at your organization.",
            "State the pay (or pay range), schedule, location, and duties honestly in every post.",
            "Write clear titles students understand — avoid clickbait, excessive punctuation, or ALL CAPS.",
            "One post per vacancy. Don't duplicate the same job across multiple posts to gain visibility.",
            "Mark internships, part-time, evening, weekend, or remote arrangements accurately so students can filter correctly.",
          ]}
        />
      </Section>

      <Section title="Verification">
        <Bullets
          items={[
            "Complete your company profile with accurate business information.",
            "Submit the documents requested for verification (such as business registration). We review submissions and may ask for clarifications.",
            "Keep your verification documents current; expired or misleading documents can lead to badge removal or suspension.",
          ]}
        />
      </Section>

      <Section title="Treating candidates fairly">
        <Bullets
          items={[
            <><strong>Never charge applicants any fee</strong> — not for applying, interviewing, training, uniforms, or &lsquo;registration&rsquo;. Accounts that do this are permanently banned.</>,
            "Use applicant CVs and contact details only to evaluate them for the role they applied to.",
            "Respond to applicants in a reasonable time; use shortlisting and rejection states so students aren't left waiting.",
            "Do not discriminate on the basis of gender, caste, ethnicity, religion, disability, or other protected characteristics.",
            "Schedule interviews at reasonable times and places, and respect students' exam periods where possible.",
          ]}
        />
      </Section>

      <Section title="Communication">
        <Bullets
          items={[
            "Keep conversations professional. Harassment of any kind leads to immediate suspension.",
            "Use Growentix messaging for early contact so we can help resolve disputes and investigate reports.",
            "Never request passwords, banking credentials, or unnecessary identity documents from candidates.",
          ]}
        />
      </Section>

      <Section title="Moderation and enforcement">
        <p>
          New posts enter a moderation queue. We may approve, pause, or reject posts that breach these guidelines, and
          repeat or serious breaches — especially charging applicants or fraudulent postings — result in suspension
          without refund. Students can report any listing; every report is reviewed by our admin team. If you believe a
          moderation decision was made in error, reply to the notification you received and we will re-check it.
        </p>
      </Section>

      <Section title="See also">
        <p>
          <Link href="/pricing" className="font-semibold text-emerald-700 hover:underline">Pricing plans</Link> ·{" "}
          <Link href="/for-employers" className="font-semibold text-emerald-700 hover:underline">For Employers</Link> ·{" "}
          <Link href="/terms" className="font-semibold text-emerald-700 hover:underline">Terms of Service</Link>
        </p>
      </Section>
    </StaticPage>
  );
}
