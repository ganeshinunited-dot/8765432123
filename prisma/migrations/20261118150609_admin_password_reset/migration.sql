-- One-time password-reset token for the Growentix admin (hongtunekong@gmail.com).
-- The reset endpoint (src/app/api/auth/reset-password/route.ts) looks up
-- User.resetToken verbatim and requires resetTokenExpiry in the future.
-- Token format matches the forgot-password route exactly:
-- randomBytes(32).toString('hex') (64 hex chars), stored plain.
-- Expiry is 24 hours from when this migration runs. One-time use: the reset
-- endpoint clears resetToken/resetTokenExpiry when the new password is set.
-- NOTE (2026-11-20): the original token value was committed here in plain
-- text and flagged by GitGuardian as an exposed secret. The token was
-- one-time and is dead: the admin set a new password with it on 18 Nov 2026
-- (which cleared it from the database) and its 24-hour expiry passed on
-- 19 Nov 2026 (~20:52 NPT). The UPDATE below now sets NULL, so this
-- migration is a no-op that still validates the admin exists. The admin
-- password itself was never in this repo. Git history still contains the
-- original value (commit fd6a89b); no history rewrite was done.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "User" WHERE "email" = 'hongtunekong@gmail.com') THEN
    RAISE EXCEPTION 'admin user hongtunekong@gmail.com not found';
  END IF;
END $$;

UPDATE "User"
SET "resetToken" = NULL,
    "resetTokenExpiry" = NULL
WHERE "email" = 'hongtunekong@gmail.com';
