import type { Metadata } from "next";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Growentix collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" subtitle="How Growentix collects, uses, and protects your information." updated="October 28, 2026">
      <Section title="1. Who we are">
        <p>
          Growentix (&ldquo;we&rdquo;, &ldquo;us&rdquo;) publishes daily job news and vacancy notices from Nepal and
          around the world. This policy explains what personal information we collect, why we collect it, and the
          choices you have. There are no public user accounts on Growentix — visitors read articles without signing up.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <Bullets
          items={[
            <><strong>Analytics:</strong> We use Google Analytics to understand which pages readers visit, so we can improve the site. Google Analytics uses cookies and collects anonymised usage data, such as pages viewed and approximate location. It does not identify you personally to us.</>,
            <><strong>Administrator accounts:</strong> the small team that publishes articles signs in with an email address and a securely hashed password. Admin sessions use a signed HTTP-only cookie.</>,
            <><strong>Contact messages:</strong> if you contact us, we keep the message and any contact details you choose to share so we can reply.</>,
          ]}
        />
      </Section>

      <Section title="3. How we use your information">
        <Bullets
          items={[
            "To count page views and unique visitors so we can see which news readers find useful.",
            "To keep administrator accounts secure and to publish articles.",
            "To respond to messages you send us.",
            "To improve the site, fix problems, and measure overall usage in aggregate form.",
          ]}
        />
      </Section>

      <Section title="4. When we share information">
        <p>
          We do not sell your personal information. We do not share visitor data with third parties. We may disclose
          information when required by law, to protect the safety of our users, or with service providers (such as
          hosting) who process it on our behalf under appropriate safeguards.
        </p>
      </Section>

      <Section title="5. Cookies">
        <p>
          Visitors: Google Analytics sets cookies to measure site usage, as described in section 2. Administrators: a single essential session cookie keeps the admin signed in.
          You can control cookies in your browser settings; disabling the session cookie will prevent an admin from
          staying signed in.
        </p>
      </Section>

      <Section title="6. Data retention">
        <p>
          Anonymous visit analytics are kept in aggregate form. Contact messages are kept for as long as needed to
          respond. Administrator account information is kept while the account is active. You may request deletion of
          information you provided; some records may be retained where the law requires it.
        </p>
      </Section>

      <Section title="7. Your rights">
        <Bullets
          items={[
            "Request a copy of the personal information we hold about you.",
            "Request correction or deletion of your information, subject to legal retention requirements.",
            "Withdraw consent for optional communications.",
          ]}
        />
      </Section>

      <Section title="8. Security">
        <p>
          Passwords are stored using a strong one-way hashing algorithm, and admin sessions use signed HTTP-only
          cookies. No system is completely secure, so please tell us immediately if you suspect unauthorized access.
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
          For privacy questions or requests, contact us through the Support page. We aim to respond to privacy requests within 30 days.
        </p>
      </Section>
    </StaticPage>
  );
}
