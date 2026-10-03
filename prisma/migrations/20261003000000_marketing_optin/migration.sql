-- Add marketing opt-in flag for Klaviyo email marketing consent (source of truth for subscriptions)
ALTER TABLE "User" ADD COLUMN "marketingOptIn" BOOLEAN NOT NULL DEFAULT false;
