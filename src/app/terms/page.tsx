import type { Metadata } from "next";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Growentix.",
};

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service" subtitle="The agreement between you and Growentix when you use our platform." updated="October 2, 2026">
      <Section title="1. Acceptance of terms">
        <p>
          By creating an account or using Growentix, you agree to these Terms of Service and our Privacy Policy.
          If you do not agree, please do not use the platform. Growentix is a job marketplace for students in Nepal;
          we connect students and employers but we are not an employer and we do not guarantee employment.
        </p>
      </Section>

      <Section title="2. Eligibility and accounts">
        <Bullets
          items={[
            "You must provide accurate information when registering and keep it up to date.",
            "You are responsible for activity on your account and for keeping your password confidential.",
            "Student accounts are free. Employer accounts may require a paid subscription plan to post jobs beyond the free plan's limits.",
            "One person or organization may not maintain multiple accounts to evade limits, moderation, or suspension.",
            "We may suspend or terminate accounts that violate these terms or that we reasonably believe pose a risk to other users.",
          ]}
        />
      </Section>

      <Section title="3. Students">
        <Bullets
          items={[
            "Your profile, CV, and application materials must be truthful and your own work.",
            "Applying to a job shares your profile and CV with that employer for that application.",
            "You agree to communicate professionally with employers through and outside the platform.",
            <><strong>Never pay an employer, recruiter, or intermediary to apply for or receive a job.</strong> Any request for payment, gift cards, or &ldquo;training fees&rdquo; before hiring is a strong sign of a scam — report it to us immediately.</>,
          ]}
        />
      </Section>

      <Section title="4. Employers">
        <Bullets
          items={[
            "Job postings must describe a real, current vacancy at your organization, with accurate pay, schedule, and location information.",
            "Companies may be asked to complete verification before or after posting; we may request registration or identity documents.",
            "You must not charge applicants any fee at any stage of recruitment, request unnecessary personal documents, or discriminate unlawfully.",
            "You may only use applicant information to evaluate candidates for the role they applied to.",
            "Job postings are reviewed by our moderation team and may be approved, edited for clarity, paused, or removed at our discretion.",
          ]}
        />
      </Section>

      <Section title="5. Subscriptions and payments">
        <Bullets
          items={[
            "Paid employer plans are billed monthly in Nepalese Rupees (NPR) through our payment providers (eSewa/Khalti or successors).",
            "Plan limits (number of active job posts, featured placement, candidate search) apply as described on the Pricing page at the time of purchase.",
            "Fees are non-refundable except where a payment was taken in error or the law requires a refund.",
            "Subscriptions renew according to the terms shown at checkout; you can stop renewal at any time and keep access until the end of the paid period.",
          ]}
        />
      </Section>

      <Section title="6. Prohibited conduct">
        <Bullets
          items={[
            "Posting fraudulent, misleading, or non-existent jobs, or jobs that require applicants to pay fees.",
            "Harassment, hate speech, or discrimination against any user.",
            "Scraping, bulk harvesting of profiles or contact details, or attempts to circumvent rate limits and access controls.",
            "Uploading malware, impersonating another person or organization, or interfering with the platform's operation.",
            "Using the platform for any unlawful purpose under the laws of Nepal.",
          ]}
        />
      </Section>

      <Section title="7. Content and moderation">
        <p>
          You retain ownership of content you submit. By posting it on Growentix you grant us a licence to display and
          distribute it as part of operating the marketplace. We may remove content, pause listings, or restrict
          features when we believe these terms have been breached. Users can report jobs, messages, and profiles; we
          review reports and act on them in a timely manner.
        </p>
      </Section>

      <Section title="8. Interviews and hiring">
        <p>
          Interviews arranged through Growentix are between the student and the employer. Any employment relationship
          formed is solely between those parties. Growentix is not a party to employment contracts and is not
          responsible for wages, working conditions, or the conduct of any employer or candidate.
        </p>
      </Section>

      <Section title="9. Liability">
        <p>
          The platform is provided &ldquo;as is&rdquo;. To the maximum extent permitted by law, Growentix is not liable for
          indirect or consequential losses arising from use of the platform, from reliance on a job posting, or from
          the actions of other users. Nothing in these terms limits liability that cannot be limited by law.
        </p>
      </Section>

      <Section title="10. Changes and governing law">
        <p>
          We may update these terms; material changes will be posted on this page with a revised date. These terms are
          governed by the laws of Nepal, and disputes will be subject to the jurisdiction of the courts of Nepal.
        </p>
      </Section>
    </StaticPage>
  );
}
