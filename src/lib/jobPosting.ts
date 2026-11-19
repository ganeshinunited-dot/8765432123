// ---------------------------------------------------------------------------
// JobPosting builder (GEO Step 7, plan §8). Builds the JobPosting block for
// a job article from facts the article itself states — nothing is invented.
//
// Rules:
//  - A closed vacancy is NOT a genuine active vacancy: when the apply-by
//    date has passed, no JobPosting is emitted at all (the page keeps its
//    closed banner and the NewsArticle). The ISR revalidate (300 s) drops
//    the block within minutes of the deadline passing.
//  - hiringOrganization comes from the article's own summary table
//    (Key Facts "Employer" row, parsed by lib/keyFacts) — omitted when
//    the article states no employer.
//  - jobLocation comes from the article's country label, mapped to an
//    ISO 3166-1 alpha-2 code — omitted when the label is a region or
//    otherwise unmappable. Google requires both fields for a JobPosting
//    rich result; omitting them when unknown is correct, inventing
//    them would not be.
// ---------------------------------------------------------------------------

/** Display country label (as stored on the Article) -> ISO alpha-2 code. */
const COUNTRY_ISO: Record<string, string> = {
  usa: "US",
  "united states": "US",
  india: "IN",
  uk: "GB",
  "united kingdom": "GB",
  nepal: "NP",
  ukraine: "UA",
  australia: "AU",
  china: "CN",
  "south korea": "KR",
  korea: "KR",
  "south africa": "ZA",
  germany: "DE",
  canada: "CA",
  uae: "AE",
  "united arab emirates": "AE",
  spain: "ES",
  singapore: "SG",
  philippines: "PH",
  japan: "JP",
};

export function countryToIso(country: string | null | undefined): string | null {
  if (!country) return null;
  return COUNTRY_ISO[country.trim().toLowerCase()] ?? null;
}

export interface JobPostingInput {
  title: string;
  description: string;
  /** YYYY-MM-DD */
  datePosted: string;
  /** YYYY-MM-DD apply-by date from applyByDate(), or null. */
  deadline: string | null;
  /** True when the apply-by date has passed. */
  closed: boolean;
  /** Employer name from the article's own summary table, or null. */
  employer: string | null;
  /** Country display label, e.g. "India" — mapped to ISO, or null. */
  country: string | null;
}

/** Returns the JobPosting object, or null when no posting may be claimed. */
export function buildJobPosting(input: JobPostingInput) {
  if (input.closed) return null;
  const iso = countryToIso(input.country);
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.datePosted,
    ...(input.deadline ? { validThrough: input.deadline } : {}),
    ...(input.employer
      ? { hiringOrganization: { "@type": "Organization", name: input.employer } }
      : {}),
    ...(iso
      ? {
          jobLocation: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressCountry: iso },
          },
        }
      : {}),
  };
}
