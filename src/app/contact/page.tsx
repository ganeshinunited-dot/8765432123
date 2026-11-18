import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Growentix — corrections, questions about a vacancy, or anything else. Email support@growentix.cloud or use the Support page.",
  alternates: { canonical: "https://growentix.cloud/contact" },
};

export default function ContactPage() {
  return (
    <StaticPage
      title="Contact Growentix"
      subtitle="Questions, corrections, or a vacancy that looks wrong — we want to hear about it."
    >
      <Section title="Email us">
        <p>
          <a href="mailto:support@growentix.cloud" className="font-semibold text-emerald-700 hover:underline">
            support@growentix.cloud
          </a>
          {" "}— we usually reply within one working day.
        </p>
        <p>
          When you write about a vacancy, please include the article link and what is wrong or has changed
          (for example a new deadline, a broken application link, or a detail that does not match the official
          notice). It helps us re-check it quickly.
        </p>
      </Section>

      <Section title="Report an error">
        <p>
          Found a mistake in an article? Email us at{" "}
          <a href="mailto:support@growentix.cloud" className="font-semibold text-emerald-700 hover:underline">
            support@growentix.cloud
          </a>
          {" "}with the article link and the correction. We correct errors as soon as we verify them, and
          closed vacancies are marked as closed. Our standards are set out in the{" "}
          <Link href="/editorial-policy" className="font-semibold text-emerald-700 hover:underline">Editorial Policy</Link>
          {" "}and the{" "}
          <Link href="/verification-policy" className="font-semibold text-emerald-700 hover:underline">Verification Policy</Link>.
        </p>
      </Section>

      <Section title="Help &amp; Support">
        <p>
          For quick answers about how Growentix works — applying, posting jobs, verification, CVs and
          safety — visit the{" "}
          <Link href="/support" className="font-semibold text-emerald-700 hover:underline">Support page</Link>,
          {" "}where the support assistant can answer straight away.
        </p>
      </Section>

      <Section title="Stay safe">
        <p>
          Growentix never asks readers for money. Never pay anyone for a job — genuine employers never charge
          applicants. Read the{" "}
          <Link href="/safety" className="font-semibold text-emerald-700 hover:underline">safety guide</Link>
          {" "}before you apply anywhere.
        </p>
      </Section>
    </StaticPage>
  );
}
