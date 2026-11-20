// ---------------------------------------------------------------------------
// Site author (2026-11-20): the article byline names Ganesh Karki, founder
// of Growentix, with a blue verified badge — replacing the old "Growentix
// Editorial Team" byline. The byline links straight to his portfolio page
// (https://ganeshkarki.info.np/) — owner order 2026-11-20 evening: the
// in-site /authors/ganesh-karki page was deleted and now redirects there.
// Every fact here comes from his published portfolio page; nothing is
// invented: no credentials, degrees, awards or job titles beyond what
// that page states. The green Verified badge on job articles is separate —
// it certifies the vacancy, not the author — and is untouched.
// ---------------------------------------------------------------------------

export const AUTHOR = {
  name: "Ganesh Karki",
  role: "Founder, Growentix",
  /** Portfolio page (the byline links here). */
  url: "https://ganeshkarki.info.np/",
  portfolioUrl: "https://ganeshkarki.info.np/",
  linkedinUrl: "https://www.linkedin.com/in/ganesh-karki-260849250/",
  /** Short bio — grounded in the portfolio page only. */
  bio: "Ganesh Karki is from Taplejung, in eastern Nepal. He built Growentix so that people looking for work can find real vacancies and skip the fake ones. He works as a WhatsApp Cloud API and OTP automation specialist, helping small businesses move from manual messaging to reliable, policy-compliant systems. His Upwork identity is verified.",
  /** NewsArticle author object (Person) — used by both article routes. */
  jsonLd: {
    "@type": "Person",
    name: "Ganesh Karki",
    url: "https://ganeshkarki.info.np/",
    jobTitle: "Founder, Growentix",
    sameAs: [
      "https://www.linkedin.com/in/ganesh-karki-260849250/",
      "https://ganeshkarki.info.np/",
    ],
  },
} as const;
