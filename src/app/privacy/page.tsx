import type { Metadata } from "next";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Growentix collects, uses, and protects your personal information.",
  alternates: { canonical: "https://growentix.cloud/privacy" },
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" subtitle="How Growentix collects, uses, and protects your information." updated="November 23, 2026">
      <Section title="1. Who we are">
        <p>
          Growentix (&ldquo;we&rdquo;, &ldquo;us&rdquo;) publishes daily job news and vacancy notices from Nepal and
          around the world, and provides accounts for job seekers and employers. This policy explains what
          personal information we collect, why we collect it, and the choices you have. You can read articles
          without an account. You only need an account to save jobs, apply for a job, message an employer,
          or post jobs as an employer.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <Bullets
          items={[
            <><strong>Account information:</strong> your name, email address, and phone number if you give one. Your password is stored as a one-way hash — we never store it in plain text and we cannot see it. We also record your account type (job seeker or employer) and whether your email is verified.</>,
            <><strong>Job seeker profiles and CVs:</strong> if you are a job seeker, your profile can include a headline, bio, education, college, languages, availability, salary expectations, portfolio links and a photo, plus the CV file you upload.</>,
            <><strong>Employer and company information:</strong> if you are an employer, we collect your company name, business registration number, registered address, website, and your contact person&apos;s name, email and phone number, plus any documents you provide for verification and the job posts you create.</>,
            <><strong>Applications and messages:</strong> your cover messages, answers to employer questions, application status, and messages and interview details connected to your applications.</>,
            <><strong>Payments:</strong> if you pay for an employer posting plan, the payment is handled by the payment provider you choose (eSewa or Khalti) on their own checkout page. We receive the payment confirmation, amount and provider reference. We do not see or store your card or wallet details.</>,
            <><strong>Analytics:</strong> We use Google Analytics 4 to understand which pages readers visit, so we can improve the site. Google Analytics 4 uses cookies and collects anonymised usage data, such as pages viewed and approximate location. It does not identify you personally to us.</>,
            <><strong>Weekly job news email:</strong> if you subscribe, we collect your email address and store it with our email provider, Klaviyo, so we can send you one email a week. We send a confirmation email first — you only start receiving it after you click the link in it. You can unsubscribe at any time.</>,
            <><strong>Contact messages:</strong> if you contact us, we keep the message and any contact details you choose to share so we can reply.</>,
          ]}
        />
      </Section>

      <Section title="3. How we use your information">
        <Bullets
          items={[
            "To run your account and keep you signed in.",
            "To verify employers, review job posts, and keep the platform safe.",
            "To show your application and CV to the employer you applied to.",
            "To count page views and unique visitors so we can see which news readers find useful.",
            "To send service emails, such as verification links, application updates and password resets.",
            "To send the Weekly job news email to readers who asked for it.",
            "To respond to messages you send us.",
            "To improve the site, fix problems, and measure overall usage in aggregate form.",
          ]}
        />
      </Section>

      <Section title="4. When we share information">
        <p>
          We do not sell your personal information. We share limited information as follows: your application
          and CV go to the employer you applied to, and to no one else — CVs are never public and never sold.
          Company profiles are public, so a verified company&apos;s name, description, jobs and verification
          badge are visible to everyone. Google Analytics 4 receives anonymised usage data, and Klaviyo
          receives subscriber email addresses for the weekly email. Google AdSense and its advertising
          partners may receive anonymised usage data and cookie identifiers so they can serve and measure
          advertisements. We may disclose information when required by law, to protect the safety of
          our users, or with service providers (such as hosting) who process it on our behalf under appropriate
          safeguards.
        </p>
      </Section>

      <Section title="5. Cookies">
        <p>
          We use three kinds of cookies. Essential cookies keep you signed in to your account — without them,
          accounts cannot work. Google Analytics 4 sets cookies to measure site usage, as described in
          section 2. You can control cookies in your browser settings, but blocking essential cookies will
          sign you out.
        </p>
        <p>
          <strong>Advertising:</strong> We may show advertisements on Growentix through Google AdSense. Google and
          its advertising partners may use cookies to show ads based on your previous visits to this site or other
          websites. You can opt out of personalised advertising at any time by visiting Google Ads Settings
          (https://www.google.com/settings/ads) or www.aboutads.info/choices. We do not control the cookies set by
          advertisers. For how Google uses information from sites that use its services, see Google&apos;s Privacy
          &amp; Terms (https://policies.google.com/technologies/partner-sites).
        </p>
      </Section>

      <Section title="6. Data retention">
        <p>
          Anonymous visit analytics are kept in aggregate form. Account information is kept while your account
          is active. Your CV and applications are kept while your account exists and for as long as needed to
          run the service. Contact messages are kept for as long as needed to respond. Subscriber email
          addresses are kept until you unsubscribe. You may ask us to delete your account and the information
          in it; we will delete it except for records we must keep by law, such as payment confirmations and
          verification decisions.
        </p>
      </Section>

      <Section title="7. Your rights">
        <Bullets
          items={[
            "Request a copy of the personal information we hold about you.",
            "Request correction or deletion of your information, subject to legal retention requirements.",
            "Ask us to delete your account and the information in it.",
            "Withdraw consent for optional communications.",
          ]}
        />
      </Section>

      <Section title="8. Security">
        <p>
          We use appropriate safeguards to protect the information we hold. No system is completely secure, so please
          tell us immediately if you suspect unauthorised access.
        </p>
      </Section>

      <Section title="9. Children">
        <p>
          Growentix publishes general job news for a general audience. The site is not directed at children under 13,
          and we do not knowingly collect personal information from children.
        </p>
      </Section>

      <Section title="10. Changes to this policy">
        <p>
          We may update this policy from time to time. Material changes will be announced on this page with a revised
          &ldquo;last updated&rdquo; date. Continuing to use Growentix after a change takes effect means you accept the updated policy.
        </p>
      </Section>

      <Section title="11. Contact us">
        <p>
          For privacy questions or requests, email support@growentix.cloud or contact us through the Support page. We aim to respond to privacy requests within 30 days.
        </p>
      </Section>
    </StaticPage>
  );
}
