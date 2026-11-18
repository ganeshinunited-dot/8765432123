-- One-time password-reset token for the Growentix admin (hongtunekong@gmail.com).
-- The reset endpoint (src/app/api/auth/reset-password/route.ts) looks up
-- User.resetToken verbatim and requires resetTokenExpiry in the future.
-- Token format matches the forgot-password route exactly:
-- randomBytes(32).toString('hex') (64 hex chars), stored plain.
-- Expiry is 24 hours from when this migration runs. One-time use: the reset
-- endpoint clears resetToken/resetTokenExpiry when the new password is set.
-- The admin password is unknown, and the forgot-password email cannot deliver
-- (Resend domain not verified), so this migration is the reset path.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "User" WHERE "email" = 'hongtunekong@gmail.com') THEN
    RAISE EXCEPTION 'admin user hongtunekong@gmail.com not found';
  END IF;
END $$;

UPDATE "User"
SET "resetToken" = '7af5a37b4bcdcd427d0e27162ddc3e45c724a7d1b89b109ffd92d70f0b14a502',
    "resetTokenExpiry" = NOW() + INTERVAL '24 hours'
WHERE "email" = 'hongtunekong@gmail.com';
