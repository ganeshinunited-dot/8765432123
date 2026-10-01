"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/primitives";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }
    router.push("/login?reset=1");
    router.refresh();
  }

  if (!token) {
    return (
      <Alert tone="rose">
        This reset link is invalid. <Link href="/forgot-password" className="font-semibold underline">Request a new one</Link>.
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error && <Alert tone="rose">{error}</Alert>}
      <Input name="password" label="New password" type="password" autoComplete="new-password" required minLength={8} placeholder="At least 8 characters" />
      <Input name="confirm" label="Confirm new password" type="password" autoComplete="new-password" required minLength={8} placeholder="Repeat your new password" />
      <Button type="submit" loading={loading} className="w-full" size="lg">
        Set new password
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Set a new password</h1>
      <p className="mt-1 text-sm text-slate-600">Choose a new password for your account.</p>
      <Suspense>
        <ResetForm />
      </Suspense>
    </div>
  );
}
