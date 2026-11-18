import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { badgeLabel } from "@/lib/verification";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
import OnboardingForm from "@/components/employers/OnboardingForm";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "For Employers — Get Verified on Growentix",
  description:
    "Apply for a verified employer profile on Growentix — free. Verified companies get a public profile, a Verified badge, and their vacancies listed.",
  alternates: { canonical: "https://growentix.cloud/for-employers" },
};

export default async function ForEmployersPage() {
  const user = await getSessionUser();
  let myCompany: {
    name: string;
    slug: string;
    verificationStatus: string;
    verificationExpiresAt: Date | null;
  } | null = null;
  if (user && user.role === "EMPLOYER") {
    myCompany = await db.company.findFirst({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
      select: { name: true, slug: true, verificationStatus: true, verificationExpiresAt: true },
    });
  }

  return (
    <StaticPage
      title="For employers"
      subtitle="Get a verified profile on Growentix — free. Verified companies get a public profile, a Verified badge, and their vacancies listed alongside their name."
    >
      {myCompany && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-sm font-semibold text-slate-900">Your application: {myCompany.name}</p>
          <p className="mt-1 text-sm text-slate-600">
            Status:{" "}
            <strong>
              {badgeLabel({
                verificationStatus: myCompany.verificationStatus,
                verificationExpiresAt: myCompany.verificationExpiresAt,
              })}
            </strong>
          </p>
          {myCompany.verificationStatus === "VERIFIED" && (
            <p className="mt-2 text-sm">
              <Link
                href={`/companies/${myCompany.slug}`}
                className="font-semibold text-emerald-700 hover:underline"
              >
                View your public profile →
              </Link>
            </p>
          )}
          {myCompany.verificationStatus === "PENDING" && (
            <p className="mt-1 text-sm text-slate-600">
              Our team is reviewing your application. You will hear back by email.
            </p>
          )}
          {myCompany.verificationStatus === "NEEDS_INFO" && (
            <p className="mt-1 text-sm text-slate-600">
              We need more information from you — check your email for what is missing, then reply
              to it.
            </p>
          )}
        </div>
      )}

      <Section title="What verification means">
        <p>
          A Verified badge means we checked your business registration, website and contact details
          against official sources, and they matched. Readers see the badge on your profile and know
          the employer behind a vacancy is real. Verification is free, and it is never sold as a
          ranking — verified companies do not get their jobs boosted for paying.
        </p>
      </Section>

      <Section title="What you get">
        <Bullets
          items={[
            "A public company profile at growentix.cloud/companies/your-company.",
            "A Verified badge, valid for 12 months and renewable.",
            "Your vacancies listed on your profile, linked to the Growentix articles about them.",
            "A listing in the Companies directory, browsable by industry.",
          ]}
        />
      </Section>

      <Section title="What we check">
        <Bullets
          items={[
            "Business registration number and registered address.",
            "Company website — it must belong to the company applying.",
            "Contact person — reachable at a real email address and phone number.",
            "No fraud signals: duplicate applications, mismatched details, or misleading claims.",
          ]}
        />
        <p>
          Full details are in the{" "}
          <Link href="/verification-policy" className="font-semibold text-emerald-700 hover:underline">
            Verification Policy
          </Link>{" "}
          and the{" "}
          <Link href="/employer-guidelines" className="font-semibold text-emerald-700 hover:underline">
            Employer Guidelines
          </Link>
          .
        </p>
      </Section>

      {!myCompany && (
        <Section title="Apply for verification">
          <p>
            Fill in the form below. We review applications in the order they arrive and reply by
            email — usually within a few working days.
          </p>
          <OnboardingForm />
        </Section>
      )}
    </StaticPage>
  );
}
