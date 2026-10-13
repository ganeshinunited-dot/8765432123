-- Post-deadline update for the Israel caregiver article (1,464 G2G posts).
-- Applications closed 2026-10-12 23:59 NPT with no extension (verified 2026-10-13
-- against dofe.gov.np notices, OnlineKhabar, Kathmandu Post, sajhajobs).
-- Approved by the site owner 2026-10-13 ("Gara - update gara").
-- Scope: new title (no countdown claim) + dated update note prepended to both
-- language bodies; the article body is kept as a reference. Page is NOT deleted.
-- Idempotent: only applies while the old countdown title is still present.
UPDATE "Article"
SET
  "titleEn" = 'Israel Caregiver Recruitment Nepal: Applications for 1,464 Posts Now Closed',
  "titleNe" = 'इजरायल केयरगिभर भर्ना: १,४६४ पदका लागि आवेदन बन्द',
  "excerptEn" = 'Applications for 1,464 Nepali caregiver posts (1,132 women, 332 men) in Israel''s long-term care centres closed on 12 October 2026 as scheduled. This article is kept as a reference — who could apply, the salary and how the recruitment worked.',
  "excerptNe" = 'इजरायलका दीर्घकालीन हेरचाह केन्द्रहरूमा १,४६४ नेपाली केयरगिभर पद (१,१३२ महिला, ३३२ पुरुष) का लागि आवेदन अक्टोबर १२, २०२६ मा निर्धारित समयमै बन्द भयो। यो लेख जानकारीका लागि राखिएको हो।',
  "bodyEn" = '<p><strong>Update (13 October 2026):</strong> Applications for these 1,464 caregiver posts closed on 12 October 2026 at 11:59 pm as scheduled. This article is kept as a reference — the eligibility, salary and application details below still describe the recruitment.</p>' || "bodyEn",
  "bodyNe" = '<p><strong>अपडेट (१३ अक्टोबर २०२६):</strong> यी १,४६४ केयरगिभर पदका लागि आवेदन अक्टोबर १२, २०२६ राति ११:५९ बजे निर्धारित समयमै बन्द भयो। यो लेख जानकारीका लागि राखिएको हो — तलका योग्यता, तलब र आवेदनसम्बन्धी विवरण उक्त भर्नाकै हुन्।</p>' || "bodyNe",
  "updatedAt" = NOW()
WHERE "slug" = 'israel-caregiver-deadline-oct-12-1464-jobs'
  AND "titleEn" = 'Israel Caregiver Jobs in Nepal: 1 Day Left to Apply for 1,464 Posts';
