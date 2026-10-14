-- One-time admin password reset (owner-requested 2026-10-14).
-- The admin (hongtunekong@gmail.com) forgot the password and the reset-email
-- flow is broken because Resend is not configured in production, so the
-- reset link never arrives. This migration sets a temporary password;
-- the owner must change it immediately after logging in.
-- Idempotent: only applies while the current hash differs.
UPDATE "User"
SET "passwordHash" = 'scrypt$6a80258081870db740aae8035e5fbb9e$4df35d569c5695f6b570cb5cb8f7480bb8d12f3d1fa1065c3870de228e94dc995aff51ada2109a1f88d7ce2b432248aad5b5945a14c0f3ad687e288d62a6e955'
WHERE "email" = 'hongtunekong@gmail.com'
  AND "passwordHash" <> 'scrypt$6a80258081870db740aae8035e5fbb9e$4df35d569c5695f6b570cb5cb8f7480bb8d12f3d1fa1065c3870de228e94dc995aff51ada2109a1f88d7ce2b432248aad5b5945a14c0f3ad687e288d62a6e955';
