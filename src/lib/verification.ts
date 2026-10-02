// Shared verification logic: tiers, auto-checks, expiry.

export const VERIFICATION_VALID_MONTHS = 12;
export const VERIFICATION_RENEW_WARNING_DAYS = 60;
export const REQUIRED_DOCS_MIN = 1;

export function verificationExpiresAt(from: Date = new Date()): Date {
  const d = new Date(from);
  d.setMonth(d.getMonth() + VERIFICATION_VALID_MONTHS);
  return d;
}

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED" | "NEEDS_INFO";

/** True only when the company is verified AND the badge has not expired. */
export function isBadgeValid(company: {
  verificationStatus: string;
  verificationExpiresAt?: Date | string | null;
}): boolean {
  if (company.verificationStatus !== "VERIFIED") return false;
  if (!company.verificationExpiresAt) return true; // legacy verifications without expiry stay valid
  return new Date(company.verificationExpiresAt).getTime() > Date.now();
}

export function verificationExpired(company: {
  verificationStatus: string;
  verificationExpiresAt?: Date | string | null;
}): boolean {
  return (
    company.verificationStatus === "VERIFIED" &&
    !!company.verificationExpiresAt &&
    new Date(company.verificationExpiresAt).getTime() <= Date.now()
  );
}

/** True when the badge is valid but expires within the warning window. */
export function verificationExpiringSoon(company: {
  verificationStatus: string;
  verificationExpiresAt?: Date | string | null;
}): boolean {
  if (!isBadgeValid(company) || !company.verificationExpiresAt) return false;
  const msLeft = new Date(company.verificationExpiresAt).getTime() - Date.now();
  return msLeft < VERIFICATION_RENEW_WARNING_DAYS * 86_400_000;
}

export interface AutoCheck {
  key: string;
  label: string;
  passed: boolean;
  detail?: string;
}

/** Employer-facing readiness checks, run before/with a verification request. */
export function autoChecks(company: {
  logoUrl?: string | null;
  industry?: string | null;
  description?: string | null;
  locationId?: string | null;
  website?: string | null;
}, ownerEmailVerified: boolean): AutoCheck[] {
  const profile = [
    company.logoUrl,
    company.industry,
    company.description,
    company.locationId,
  ].filter(Boolean).length;
  return [
    {
      key: "owner-email",
      label: "Account email verified",
      passed: ownerEmailVerified,
      detail: ownerEmailVerified ? undefined : "Verify your email from the link we sent.",
    },
    {
      key: "profile-complete",
      label: "Company profile complete (logo, industry, description, location)",
      passed: profile >= 4,
      detail: profile >= 4 ? undefined : `Complete ${4 - profile} more item${4 - profile === 1 ? "" : "s"} on your company profile.`,
    },
    {
      key: "website",
      label: "Company website added",
      passed: !!company.website,
      detail: company.website ? undefined : "Optional, but it speeds up review.",
    },
  ];
}

export interface ManualCheckItem {
  key: string;
  label: string;
}

export const MANUAL_CHECKS: ManualCheckItem[] = [
  { key: "docs-match", label: "Documents match the business name and registration number" },
  { key: "contact-real", label: "Contact person and phone look genuine (tried a quick check)" },
  { key: "address-plausible", label: "Business address is a real, plausible location" },
  { key: "no-fraud-flags", label: "No fraud signals (duplicates, mismatches, stock photos)" },
];

export function badgeTone(company: { verificationStatus: string; verificationExpiresAt?: Date | string | null }) {
  if (isBadgeValid(company)) return "green" as const;
  if (verificationExpired(company)) return "rose" as const;
  if (company.verificationStatus === "REJECTED") return "rose" as const;
  if (company.verificationStatus === "NEEDS_INFO") return "blue" as const;
  return "amber" as const;
}

export function badgeLabel(company: { verificationStatus: string; verificationExpiresAt?: Date | string | null }) {
  if (isBadgeValid(company)) return "Verified";
  if (verificationExpired(company)) return "Verification expired";
  const map: Record<string, string> = {
    VERIFIED: "Verified",
    PENDING: "Verification pending",
    REJECTED: "Verification rejected",
    NEEDS_INFO: "More info needed",
  };
  return map[company.verificationStatus] || company.verificationStatus;
}
