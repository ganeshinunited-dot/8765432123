-- Admin password reset requested by the site owner 2026-10-15.
-- The reset-email flow is broken (Resend not configured), so the owner
-- chose a new password and asked for its hash to be set directly.
-- This migration contains ONLY the scrypt hash, never the password.
-- Idempotent: only applies while the current hash differs.
UPDATE "User"
SET "passwordHash" = 'scrypt$c71eea9a5edd1a0ca7f2ec1100a57697$0784dcb96613d067b1562e51d25c666c1be815959b58d6d93f40a05e74e9abc3ea15dcb565ebb5b378fee0f727d3568382e238a77c92c8c721f2274da3580619'
WHERE "email" = 'hongtunekong@gmail.com'
  AND "passwordHash" <> 'scrypt$c71eea9a5edd1a0ca7f2ec1100a57697$0784dcb96613d067b1562e51d25c666c1be815959b58d6d93f40a05e74e9abc3ea15dcb565ebb5b378fee0f727d3568382e238a77c92c8c721f2274da3580619';
