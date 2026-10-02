import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
import { Alert } from "@/components/ui/primitives";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Job Seeker Safety",
  description: "How to stay safe when searching and applying for jobs on Growentix.",
};

export default function SafetyPage() {
  return (
    <StaticPage
      title="Job seeker safety"
      subtitle="Most employers on Growentix are genuine — but knowing the warning signs keeps you safe everywhere."
    >
      <div className="mb-8">
        <Alert tone="amber" title="The golden rule">
          Never pay an employer, recruiter, or agent to apply for or receive a job. Real employers pay you — never the
          other way around. If anyone asks for money, gift cards, mobile top-ups, or a &ldquo;training fee&rdquo; before you start
          work, stop and report it.
        </Alert>
      </div>

      <Section title="Before you apply">
        <Bullets
          items={[
            "Look for the verified badge on company profiles — verified employers have passed our document review.",
            "Research the company: check their profile, location, and other open jobs.",
            "A real job post states the pay, schedule, and duties clearly. Vague promises of very high pay for little work are a red flag.",
            "Never share your citizenship, bank details, or passwords during an application — employers don't need them to consider you.",
          ]}
        />
      </Section>

      <Section title="During the conversation">
        <Bullets
          items={[
            "Keep early conversations inside Growentix messaging so we can help if something goes wrong.",
            "Be cautious if someone pushes you to move to personal chat immediately or pressures you to decide quickly.",
            "Employers will never ask you to buy products, transfer money, or cash cheques on their behalf.",
          ]}
        />
      </Section>

      <Section title="At the interview">
        <Bullets
          items={[
            "Meet at the employer's business premises or a public place, during normal hours.",
            "Tell a friend or family member where you are going and when you expect to return.",
            "Trust your instincts — you can leave any interview that feels wrong, at any time, without explanation.",
            "You should never have to pay for an interview, a uniform in advance, or 'registration'.",
          ]}
        />
      </Section>

      <Section title="How Growentix protects you">
        <Bullets
          items={[
            "Employer verification: companies submit documents that our team reviews before they receive a verified badge.",
            "Moderation: new job postings are reviewed, and reported listings are investigated and removed when they break our rules.",
            "Private CVs: your documents are only visible to employers you apply to — never publicly searchable without your action.",
            "Reporting: use the report button on any job, message, or profile. Reports are reviewed by our admin team and can lead to takedowns and suspensions.",
          ]}
        />
      </Section>

      <Section title="If something goes wrong">
        <p>
          Report the job or conversation from within Growentix — use the report button on the job page or in your
          messages. If you have lost money or feel unsafe, contact your local police and keep copies of all messages
          and receipts. Read more in our{" "}
          <Link href="/terms" className="font-semibold text-emerald-700 hover:underline">Terms of Service</Link> and{" "}
          <Link href="/faq" className="font-semibold text-emerald-700 hover:underline">FAQ</Link>.
        </p>
      </Section>
    </StaticPage>
  );
}
