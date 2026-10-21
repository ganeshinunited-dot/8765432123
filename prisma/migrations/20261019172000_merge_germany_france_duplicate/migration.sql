-- Merge the duplicate Germany-France car-deal story (published three times).
-- Keep the Oct 19 canonical article (better framing, honest "details still
-- thin" angle): germany-france-car-deal-sparks-jobs-talk-but-details-still-thin-20261019
-- Delete the Oct 18 version: germany-france-car-deal-hailed-as-jobs-boost-20261018
-- Delete the Oct 21 version: franco-german-auto-pact-to-favour-combustion-engines-report-says-20261021
-- 301 redirects for both old slugs are configured in next.config.ts, so the
-- old URLs keep working and the sitemap drops them automatically.
-- Approved by the site owner 2026-10-19 ("Gara, merge gara"); Oct 21 version
-- added to the merge by owner decision 2026-10-21 (Oct 19 stays canonical).
-- Idempotent: DELETE by exact slug; no-ops if already gone.
DELETE FROM "Article" WHERE slug = 'germany-france-car-deal-hailed-as-jobs-boost-20261018';
DELETE FROM "Article" WHERE slug = 'franco-german-auto-pact-to-favour-combustion-engines-report-says-20261021';
