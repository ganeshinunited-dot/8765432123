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
    ];
  },
};

export default nextConfig;
