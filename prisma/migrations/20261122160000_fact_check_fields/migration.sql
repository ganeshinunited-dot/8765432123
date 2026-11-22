-- Fact Check engine (2026-11-22): verdict fields on Article, set only on
-- category "fact-check" rows. Verdict scale: TRUE | MOSTLY_TRUE |
-- MISLEADING | FALSE | UNVERIFIED. Confidence lives in the article body.
ALTER TABLE "Article" ADD COLUMN "factCheckVerdict" TEXT;
ALTER TABLE "Article" ADD COLUMN "factCheckClaim" TEXT;
ALTER TABLE "Article" ADD COLUMN "factCheckClaimant" TEXT;
ALTER TABLE "Article" ADD COLUMN "factCheckClaimUrl" TEXT;
