import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        // Stories tab moved from /search to /stories (2026-11-17) — old
        // /search links land on /stories, query string carried over.
        // Temporary (307) so a future URL change is not stuck in caches.
        source: "/search",
        destination: "/stories",
        permanent: false,
      },
      {
        // Author page removed 2026-11-20 (owner order): the byline now
        // links straight to his portfolio — old /authors/ganesh-karki
        // links land there instead of a deleted page.
        source: "/authors/ganesh-karki",
        destination: "https://ganeshkarki.info.np/",
        permanent: true,
      },
      {
        // Duplicate merged 2026-10-19: Oct 18 Germany-France car-deal story
        // consolidated into the Oct 19 canonical article.
        source:
          "/articles/germany-france-car-deal-hailed-as-jobs-boost-20261018",
        destination:
          "/articles/germany-france-car-deal-sparks-jobs-talk-but-details-still-thin-20261019",
        permanent: true,
      },
      {
        // Third take on the same story (2026-10-21), merged into the same
        // Oct 19 canonical article by owner decision 2026-10-21.
        source:
          "/articles/franco-german-auto-pact-to-favour-combustion-engines-report-says-20261021",
        destination:
          "/articles/germany-france-car-deal-sparks-jobs-talk-but-details-still-thin-20261019",
        permanent: true,
      },
      // Duplicate job notices merged 2026-11-17 (SEO audit): the same
      // vacancy published twice under two slugs. The older slug 301s to
      // the newer one; no DB rows are deleted.
      {
        // RRB NTPC Undergraduate: 1,688 vacancies, same notice.
        source:
          "/articles/rrb-ntpc-undergraduate-1688-posts-20261104",
        destination:
          "/articles/rrb-ntpc-undergraduate-1688-posts-20261109",
        permanent: true,
      },
      {
        // Indian Bank Apprentice: 1,500 posts, same intake.
        source:
          "/articles/indian-bank-apprentice-1500-posts-20261104",
        destination:
          "/articles/indian-bank-apprentice-1500-posts-20261106",
        permanent: true,
      },
      {
        // NICL Graduate Apprentice: 200 posts, same intake.
        source:
          "/articles/nicl-graduate-apprentice-200-posts-20261104",
        destination:
          "/articles/nicl-graduate-apprentice-200-posts-20261106",
        permanent: true,
      },
      {
        // RRC Central Railway Act Apprentice: 2,861 posts, same intake.
        source:
          "/articles/rrc-central-railway-act-apprentice-2861-posts-20261104",
        destination:
          "/articles/rrc-central-railway-act-apprentice-2861-posts-20261111",
        permanent: true,
      },
      {
        // RRC North Western Railway Apprentice: 2,008 slots, Notice No.
        // 04/2026 (NWR/AA), same 23 Oct–22 Nov 2026 window.
        source:
          "/articles/rrc-jaipur-north-western-railway-apprentice-2008-slots-20261024",
        destination:
          "/articles/rrc-north-western-railway-act-apprentice-2008-posts-20261111",
        permanent: true,
      },
      {
        // H-2A farm-worker guide published twice with near-identical
        // content (27 Oct vs 28 Oct).
        source:
          "/articles/farm-worker-jobs-in-usa-on-h-2a-visa-pay-housing-and-how-to-apply-20261027",
        destination:
          "/articles/farm-worker-jobs-in-usa-h-2a-visa-pay-housing-and-legal-guide-20261028",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
