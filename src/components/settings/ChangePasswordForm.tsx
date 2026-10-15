"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/primitives";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const currentPassword = String(fd.get("currentPassword") || "");
    const newPassword = String(fd.get("newPassword") || "");
    const confirm = String(fd.get("confirm") || "");
    if (newPassword !== confirm) {
      setError("New passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="mt-6">
        <Alert tone="green">
          Password updated. You have been logged out — please{" "}
          <Link href="/login" className="font-semibold underline">
            log in again
          </Link>{" "}
          with your new password.
        </Alert>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error && <Alert tone="rose">{error}</Alert>}
      <Input
        name="currentPassword"
        label="Current password"
        type="password"
        autoComplete="current-password"
        required
        placeholder="Your current password"
      />
      <Input
        name="newPassword"
        label="New password"
        type="password"
        autoComplete="new-password"
        required
        placeholder="At least 8 characters"
      />
      <Input
        name="confirm"
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        required
        placeholder="Repeat the new password"
      />
      <Button type="submit" loading={loading} className="w-full" size="lg">
        Change password
      </Button>
    </form>
  );
}
