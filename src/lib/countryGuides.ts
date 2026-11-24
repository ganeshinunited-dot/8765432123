/**
 * Country guidance data for the country listing pages (GEO Step 6).
 *
 * Every official link was verified live (HTTP 200 from this VM, or the
 * official domain + exact URL confirmed through the provider's own pages)
 * on 2026-11-19. Every internal guide link was verified live (HTTP 200)
 * on growentix.cloud the same day. Links that could not be verified
 * (e.g. the US Department of Labor foreign-labor page, which returns 403
 * to automated clients) were dropped, not guessed.
 *
 * No dedicated pages were created for Germany, Singapore, UAE or Japan:
 * Europe carries exactly 1 article (Germany), Korea & Japan carries 2
 * Japan articles, Asia carries ~4 Singapore articles, and the Gulf
 * listing is already mostly UAE/Dubai — too thin for standalone pages
 * without duplicating the grouped listing. Their guidance and links live
 * on the grouped pages instead.
 */
export interface CountryGuideLink {
  label: string;
  href: string;
}

export interface CountryGuide {
  /** Short, factual applicant guidance (2–3 sentences, no invented claims). */
  guidance: string;
  /** Official government / portal links (external). */
  officialLinks: CountryGuideLink[];
  /** Growentix's own guides for this country (internal /articles links). */
  guides: CountryGuideLink[];
  /** Related Growentix sections (internal links). */
  related: CountryGuideLink[];
}

export const COUNTRY_GUIDES: Record<string, CountryGuide> = {
  usa: {
    guidance:
      "Most federal vacancies are advertised on USAJOBS, the US government's official hiring portal. Seasonal and agricultural roles often use the H-2A visa; specialist roles use H-1B. Every vacancy below links to its official notice — never pay anyone for a job offer.",
    officialLinks: [
      { label: "USAJOBS — federal jobs", href: "https://www.usajobs.gov/" },
      {
        label: "USCIS — H-1B specialty occupations",
        href: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations",
      },
    ],
    guides: [
      {
        label: "Nursing jobs in the USA for foreign nurses — NCLEX, visa and pay",
        href: "/articles/nursing-jobs-in-usa-for-foreign-nurses-nclex-visa-and-pay-guide-20261028",
      },
      {
        label: "Caregiver jobs in the USA for foreigners",
        href: "/articles/caregiver-jobs-in-usa-for-foreigners-visa-pay-and-how-to-apply-20261026",
      },
      {
        label: "Farm worker jobs in the USA on the H-2A visa",
        href: "/articles/farm-worker-jobs-in-usa-h-2a-visa-pay-housing-and-legal-guide-20261028",
      },
      {
        label: "Construction jobs in the USA for foreigners",
        href: "/articles/construction-jobs-in-usa-for-foreigners-pay-safety-visa-guide-20261029",
      },
      {
        label: "Warehouse jobs in the USA for foreigners",
        href: "/articles/warehouse-jobs-in-usa-for-foreigners-visa-pay-and-how-to-apply-20261025",
      },
      {
        label: "Truck driver jobs in the USA — salary and visa routes",
        href: "/articles/truck-driver-jobs-in-usa-salary-cdl-pay-per-mile-visa-routes-20261026",
      },
    ],
    related: [{ label: "Remote jobs", href: "/remote" }],
  },
  uk: {
    guidance:
      "NHS roles are advertised on NHS Jobs; most other UK vacancies are on GOV.UK's Find a job service. Skilled Worker visas need a licensed sponsor and a job offer — check the sponsor and the visa rules before applying.",
    officialLinks: [
      { label: "GOV.UK — Find a job", href: "https://www.gov.uk/find-a-job" },
      { label: "NHS Jobs", href: "https://www.jobs.nhs.uk/" },
      {
        label: "GOV.UK — Skilled Worker visa",
        href: "https://www.gov.uk/skilled-worker-visa",
      },
    ],
    guides: [
      {
        label: "UK NHS jobs with visa sponsorship",
        href: "/articles/uk-nhs-jobs-visa-sponsorship-november-2026-20261121",
      },
    ],
    related: [{ label: "Remote jobs", href: "/remote" }],
  },
  canada: {
    guidance:
      "Job Bank is Canada's official job board, listing vacancies across every province. Most work permits need a job offer first — the Work in Canada pages explain the permit types and how to apply.",
    officialLinks: [
      { label: "Job Bank", href: "https://www.jobbank.gc.ca/" },
      {
        label: "IRCC — Work in Canada",
        href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html",
      },
    ],
    guides: [],
    related: [{ label: "Remote jobs", href: "/remote" }],
  },
  australia: {
    guidance:
      "Australian Public Service roles are advertised on APS Jobs; Workforce Australia lists vacancies across the country. Skilled migration is managed by the Department of Home Affairs — check the visa conditions before applying.",
    officialLinks: [
      {
        label: "Workforce Australia",
        href: "https://www.workforceaustralia.gov.au/",
      },
      { label: "APS Jobs", href: "https://www.apsjobs.gov.au/" },
      {
        label: "Home Affairs — working in Australia",
        href: "https://immi.homeaffairs.gov.au/visas/working-in-australia",
      },
    ],
    guides: [],
    related: [{ label: "Remote jobs", href: "/remote" }],
  },
  europe: {
    guidance:
      "EURES lists vacancies across the EU. Germany, the largest market in this section, recruits skilled workers through the Federal Employment Agency and the Make it in Germany portal — both free to use.",
    officialLinks: [
      {
        label: "EURES — European job mobility",
        href: "https://eures.europa.eu/",
      },
      {
        label: "Make it in Germany",
        href: "https://www.make-it-in-germany.com/en/",
      },
      {
        label: "Federal Employment Agency — advice and support",
        href: "https://www.arbeitsagentur.de/en/working-in-germany/advice-and-support",
      },
    ],
    guides: [
      {
        label: "Germany skilled worker jobs 2026",
        href: "/articles/germany-skilled-worker-jobs-2026-20261121",
      },
    ],
    related: [{ label: "Remote jobs", href: "/remote" }],
  },
  asia: {
    guidance:
      "Singapore's Ministry of Manpower publishes the official work-pass rules; India's National Career Service lists government vacancies. Most listings in this section are Indian government recruitment — check the deadline on the official notice before applying.",
    officialLinks: [
      {
        label: "Ministry of Manpower (Singapore)",
        href: "https://www.mom.gov.sg/",
      },
      {
        label: "MOM — Work passes and permits",
        href: "https://www.mom.gov.sg/passes-and-permits",
      },
      {
        label: "National Career Service (India)",
        href: "https://www.ncs.gov.in/",
      },
    ],
    guides: [
      {
        label: "Singapore work visa for Indians — Employment Pass and S Pass",
        href: "/articles/singapore-work-visa-for-indians-employment-pass-s-pass-20261120",
      },
      {
        label: "Singapore work permit — eligibility and fees",
        href: "/articles/singapore-work-permit-eligibility-and-fees-explained-for-indian-workers-20261017",
      },
      {
        label: "No-experience jobs abroad — legal guide",
        href: "/articles/no-experience-jobs-abroad-nepal-legal-guide-to-gulf-korea-more-20261021",
      },
    ],
    related: [{ label: "Work abroad", href: "/work-abroad" }],
  },
  gulf: {
    guidance:
      "The UAE's Ministry of Human Resources and Emiratisation (MOHRE) sets the official work rules; Dubai Careers lists Dubai government roles. Walk-in interviews are common in the UAE — verify the employer and never pay for an interview or a visa.",
    officialLinks: [
      {
        label: "MOHRE — Ministry of Human Resources and Emiratisation (UAE)",
        href: "https://www.mohre.gov.ae/en",
      },
      {
        label: "UAE Government — jobs",
        href: "https://u.ae/en/information-and-services/jobs",
      },
      { label: "Dubai Careers", href: "https://www.dubaicareers.ae" },
    ],
    guides: [
      {
        label: "Jobs in Dubai for foreigners — visa rules and salaries",
        href: "/articles/jobs-in-dubai-for-foreigners-visa-rules-salaries-and-how-to-apply-20261020",
      },
      {
        label: "Delivery driver jobs in Dubai",
        href: "/articles/delivery-driver-jobs-dubai-salary-licence-pay-and-how-to-apply-20261020",
      },
      {
        label: "Dubai government jobs for expats — 45 roles",
        href: "/articles/dubai-government-jobs-expats-45-roles-20261104",
      },
      {
        label: "Emirates cabin crew hiring",
        href: "/articles/emirates-cabin-crew-hiring-dubai-20261017",
      },
      {
        label: "UAE walk-in interviews — November 2026",
        href: "/articles/uae-walk-in-interviews-november-2026-20261121",
      },
    ],
    related: [{ label: "Work abroad", href: "/work-abroad" }],
  },
  "korea-japan": {
    guidance:
      "South Korea's EPS hires through HRD Korea on a government-to-government basis; Japan's Specified Skilled Worker (SSW) route is run by the Immigration Services Agency. Both routes run through official government channels — apply only through the official process and never pay an agent for a place.",
    officialLinks: [
      { label: "HRD Korea (EPS)", href: "https://www.hrdkorea.or.kr/" },
      {
        label: "EPS — Employment Permit System",
        href: "https://www.eps.go.kr/",
      },
      {
        label: "Immigration Services Agency of Japan",
        href: "https://www.isa.go.jp/en/",
      },
      {
        label: "Specified Skilled Worker (SSW)",
        href: "https://www.ssw.go.jp/en/",
      },
    ],
    guides: [
      {
        label: "Japan work visa (SSW) for Indians",
        href: "/articles/japan-work-visa-ssw-specified-skilled-worker-indians-20261120",
      },
      {
        label: "Japan work visa — requirements and process",
        href: "/articles/japan-work-visa-requirements-process-and-eligibility-explained-20261016",
      },
      {
        label: "South Korea to hire 7,200 Nepalis under EPS in 2026",
        href: "/articles/south-korea-to-hire-7-200-nepalis-in-2026-under-eps-20261015",
      },
    ],
    related: [{ label: "Work abroad", href: "/work-abroad" }],
  },
  nepal: {
    guidance:
      "Lok Sewa Aayog (Public Service Commission) publishes Nepal's government vacancies with official deadlines. For foreign employment, the Department of Foreign Employment lists licensed agencies — always check the licence before paying any fee.",
    officialLinks: [
      {
        label: "Public Service Commission (Lok Sewa Aayog)",
        href: "https://psc.gov.np/",
      },
      {
        label: "Department of Foreign Employment",
        href: "https://dofe.gov.np/",
      },
    ],
    guides: [
      {
        label: "No-experience jobs abroad — legal guide",
        href: "/articles/no-experience-jobs-abroad-nepal-legal-guide-to-gulf-korea-more-20261021",
      },
      {
        label: "Caregiver jobs abroad — salaries and visa routes",
        href: "/articles/caregiver-jobs-abroad-in-2026-salaries-and-visa-routes-in-focus-20261024",
      },
    ],
    related: [
      { label: "Government jobs", href: "/government-jobs" },
      { label: "Work abroad", href: "/work-abroad" },
    ],
  },
};
