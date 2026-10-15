-- Remove the two older duplicate Korea EPS 7,200 articles (Oct 9 + Oct 10).
-- The same story (South Korea to hire 7,200 Nepalis in 2026 under EPS,
-- from a July 2026 report) was published three times because the daily
-- cron deduped by source link only. Keep the newest version:
-- south-korea-to-hire-7-200-nepalis-in-2026-under-eps-20261015 (Oct 15).
-- Approved by the site owner 2026-10-15 ("Purano 2 ota hataideu, naya matra rakha").
-- Idempotent: DELETE by exact slug; no-ops if already gone.
-- The other Korea/EPS articles (125,000 Nepalis, 165 departures, roster
-- issues, protests, etc.) are different stories and are NOT touched.
DELETE FROM "Article" WHERE slug IN (
  'south-korea-plans-to-employ-7-200-nepalis-in-2026-20261009',
  'eps-korea-to-recruit-7-200-nepali-workers-20261010'
);
