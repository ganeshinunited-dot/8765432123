import type { Metadata } from "next";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Growentix collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" subtitle="How Growentix collects, uses, and protects your information." updated="October 2, 2026">
      <Section title="1. Who we are">
        <p>
          Growentix (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates a job marketplace that connects students in Nepal with
          employers offering part-time, evening, weekend, remote, and internship opportunities. This policy explains what
          personal information we collect, why we collect it, and the choices you have.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <Bullets
          items={[
            <><strong>Account information:</strong> your name, email address, phone number, and a securely hashed password when you register.</>,
            <><strong>Student profiles:</strong> education history, skills, work preferences, availability, and documents you choose to upload, such as your CV.</>,
            <><strong>Employer information:</strong> company name, description, location, and verification documents submitted for review.</>,
            <><strong>Activity:</strong> jobs you view, save, or apply to; messages you exchange on the platform; interview invitations and responses; and reports you submit.</>,
            <><strong>Payment records:</strong> for employer subscriptions we store the plan, amount, provider, and transaction status. Card and wallet credentials are processed by the payment provider (eSewa/Khalti) and are never stored on our servers.</>,
            <><strong>Technical data:</strong> device, browser, and usage information collected through cookies and similar technologies to keep you signed in and to understand how the platform is used.</>,
          ]}
        />
      </Section>

      <Section title="3. How we use your information">
        <Bullets
          items={[
            "To create and secure your account and to provide the marketplace services.",
            "To match students with relevant jobs and to show employers the applications they receive.",
            "To send notifications about applications, messages, interviews, and account activity.",
            "To verify employers, moderate job postings, investigate reports, and prevent fraud and abuse.",
            "To process employer subscription payments and maintain billing records.",
            "To improve the platform, fix problems, and measure overall usage in aggregate form.",
          ]}
        />
      </Section>

      <Section title="4. When we share information">
        <p>
          Your CV and profile details are shared with an employer <strong>only when you apply to that employer&rsquo;s job</strong>.
          Employers can view applications submitted to their own postings. We do not sell your personal information.
          We may disclose information when required by law, to protect the safety of our users, or with service providers
          (such as hosting, email, and payment processors) who process it on our behalf under appropriate safeguards.
        </p>
      </Section>

      <Section title="5. Cookies">
        <p>
          We use a small number of cookies: an essential session cookie that keeps you signed in, and limited analytics
          cookies that help us understand aggregate usage. You can control cookies in your browser settings; disabling
          the session cookie will prevent you from staying signed in.
        </p>
      </Section>

      <Section title="6. Data retention">
        <p>
          We keep account information for as long as your account is active. Applications, messages, and billing records
          may be retained for a reasonable period afterwards for dispute resolution, safety investigations, and legal
          compliance. You may request deletion of your account; some records may be retained where the law requires it.
        </p>
      </Section>

      <Section title="7. Your rights">
        <Bullets
          items={[
            "Access and update your profile information at any time from your account pages.",
            "Request a copy of the personal information we hold about you.",
            "Request correction or deletion of your information, subject to legal retention requirements.",
            "Withdraw consent for optional communications; essential service notifications may still be sent.",
          ]}
        />
      </Section>

      <Section title="8. Security">
        <p>
          Passwords are stored using a strong one-way hashing algorithm, sessions use signed HTTP-only cookies, and
          uploaded CVs and documents are access-controlled so that only you, platform administrators, and employers you
          have applied to can view them. No system is completely secure, so please use a unique password and tell us
          immediately if you suspect unauthorized access.
        </p>
      </Section>

      <Section title="9. Children">
        <p>
          Growentix is intended for students who are legally able to work in Nepal. Users under 16 should use the
          platform only with the involvement of a parent or guardian.
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
          For privacy questions or requests, contact us through your account&rsquo;s help channels or via the contact
          options on our About page. We aim to respond to privacy requests within 30 days.
        </p>
      </Section>
    </StaticPage>
  );
}
