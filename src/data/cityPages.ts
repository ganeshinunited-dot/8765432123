// City job pages — one indexable page per major city, built from the live
// government-notice data (SARKARI_JOBS). Only cities with real search demand
// get a page; thin or rural locations are deliberately left out so no page
// is a near-empty template. Location matching is by substring so spelling
// variants fold into the right city. "Various provinces" and location-less
// entries belong to no city page.
//
// Kathmandu note: the Maharajgunj collision is safe here — "Maharajgunj,
// Kapilvastu" does not contain "Kathmandu", so it never lands on the Valley
// page. Lalitpur and Jawalakhel fold into the Valley page, and the page
// copy says so plainly.

export interface CityPage {
  slug: string;
  /** Display name used in headings and copy. */
  name: string;
  /** One-line region note shown under the heading. */
  regionNote: string;
  /** Evergreen "how to find work here" bullets — official channels only. */
  guide: string[];
  /** True when a notice's location string belongs to this city. */
  matches: (location: string | null) => boolean;
}

const contains =
  (...needles: string[]) =>
  (location: string | null): boolean => {
    if (!location) return false;
    const hay = location.toLowerCase();
    return needles.some((n) => hay.includes(n.toLowerCase()));
  };

export const CITY_PAGES: CityPage[] = [
  {
    slug: "kathmandu",
    name: "Kathmandu Valley",
    regionNote: "Covering Kathmandu, Lalitpur and Bhaktapur — including Singha Durbar, Maharajgunj and Jawalakhel.",
    guide: [
      "Most federal government offices sit in Singha Durbar, so Kathmandu Valley carries the largest share of central-level notices.",
      "Check the Public Service Commission (psc.gov.np) for federal vacancies and the Bagmati Province PSC for provincial posts.",
      "Local-level posts for Kathmandu Metropolitan City, Lalitpur Metropolitan City and Bhaktapur appear on each municipality's own notice board.",
      "Apply only through the official notice link. No agent can speed up a government application, and no genuine notice asks for payment to a personal account.",
    ],
    matches: contains("Kathmandu", "Lalitpur", "Jawalakhel"),
  },
  {
    slug: "biratnagar",
    name: "Biratnagar",
    regionNote: "Koshi Province's largest city and its provincial capital.",
    guide: [
      "Biratnagar hosts Koshi Province government offices, so provincial PSC notices are the main source of openings here.",
      "Check the Koshi Province Public Service Commission (psconline.p1.gov.np) for provincial posts and psc.gov.np for federal ones.",
      "Biratnagar Metropolitan City posts its own vacancies on the municipality's notice board.",
      "Apply only through the official notice link. No agent can speed up a government application, and no genuine notice asks for payment to a personal account.",
    ],
    matches: contains("Biratnagar"),
  },
  {
    slug: "pokhara",
    name: "Pokhara",
    regionNote: "Gandaki Province's capital, on the shores of Phewa Lake.",
    guide: [
      "Pokhara hosts Gandaki Province government offices, so provincial PSC notices are the main source of openings here.",
      "Check the Gandaki Province Public Service Commission for provincial posts and psc.gov.np for federal ones.",
      "Pokhara Metropolitan City posts its own vacancies on the municipality's notice board.",
      "Apply only through the official notice link. No agent can speed up a government application, and no genuine notice asks for payment to a personal account.",
    ],
    matches: contains("Pokhara"),
  },
  {
    slug: "butwal",
    name: "Butwal",
    regionNote: "Lumbini Province's commercial hub.",
    guide: [
      "Butwal hosts Lumbini Province government offices, so provincial PSC notices are the main source of openings here.",
      "Check the Lumbini Province Public Service Commission for provincial posts and psc.gov.np for federal ones.",
      "Butwal Sub-Metropolitan City posts its own vacancies on the municipality's notice board.",
      "Apply only through the official notice link. No agent can speed up a government application, and no genuine notice asks for payment to a personal account.",
    ],
    matches: contains("Butwal"),
  },
  {
    slug: "janakpur",
    name: "Janakpur",
    regionNote: "Madhesh Province's capital, also written Janakpurdham.",
    guide: [
      "Janakpur hosts Madhesh Province government offices, so provincial PSC notices are the main source of openings here.",
      "Check the Madhesh Province Public Service Commission for provincial posts and psc.gov.np for federal ones.",
      "Janakpurdham Sub-Metropolitan City posts its own vacancies on the municipality's notice board.",
      "Apply only through the official notice link. No agent can speed up a government application, and no genuine notice asks for payment to a personal account.",
    ],
    matches: contains("Janakpur", "Janakpurdham"),
  },
  {
    slug: "nepalgunj",
    name: "Nepalgunj",
    regionNote: "Lumbini Province's western gateway city, in Banke district.",
    guide: [
      "Nepalgunj is a regional centre for western Nepal, with district-level government offices and health and education institutions.",
      "Check psc.gov.np for federal posts and the Lumbini Province Public Service Commission for provincial ones.",
      "Nepalgunj Sub-Metropolitan City posts its own vacancies on the municipality's notice board.",
      "Apply only through the official notice link. No agent can speed up a government application, and no genuine notice asks for payment to a personal account.",
    ],
    matches: contains("Nepalgunj"),
  },
  {
    slug: "birgunj",
    name: "Birgunj",
    regionNote: "Madhesh Province's border trade city, in Parsa district.",
    guide: [
      "Birgunj is Nepal's main trade gateway, with customs, district and municipal offices posting vacancies through the year.",
      "Check psc.gov.np for federal posts and the Madhesh Province Public Service Commission for provincial ones.",
      "Birgunj Metropolitan City posts its own vacancies on the municipality's notice board.",
      "Apply only through the official notice link. No agent can speed up a government application, and no genuine notice asks for payment to a personal account.",
    ],
    matches: contains("Birgunj"),
  },
];

export function cityPageFor(slug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.slug === slug);
}

/** Today in Asia/Kathmandu as YYYY-MM-DD — the same open rule the site uses. */
export function todayNpt(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
