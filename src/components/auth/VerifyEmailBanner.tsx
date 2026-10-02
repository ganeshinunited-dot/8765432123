"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";

export function VerifyEmailBanner({ emailVerified }: { emailVerified: boolean }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (emailVerified) return null;

  async function resend() {
    setError("");
    setSending(true);
    const res = await fetch("/api/auth/resend-verification", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setSending(false);
    if (!res.ok) {
      setError(data.error || "Could not send the email. Please try again later.");
      return;
    }
    setSent(true);
  }

  return (
    <div className="mb-6">
      <Alert tone="amber" title="Verify your email address">
        {sent ? (
          <span>Verification email sent — check your inbox (and spam folder). The link expires in 24 hours.</span>
        ) : (
          <span className="flex flex-wrap items-center gap-3">
            <span>We sent a verification link to your email. Verifying builds trust with employers and students.</span>
            <Button type="button" size="sm" loading={sending} onClick={resend}>
              Resend verification email
            </Button>
          </span>
        )}
        {error && <span className="mt-1 block text-rose-700">{error}</span>}
      </Alert>
    </div>
  );
}
