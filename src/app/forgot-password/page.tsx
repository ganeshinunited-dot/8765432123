"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/primitives";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fd.get("email") }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Forgot password</h1>
      <p className="mt-1 text-sm text-slate-600">Enter your account email and we will send you a reset link.</p>
      {done ? (
        <div className="mt-6">
          <Alert tone="green">
            If an account exists for that email, a password reset link has been sent. Check your inbox (and spam folder).
          </Alert>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {error && <Alert tone="rose">{error}</Alert>}
          <Input name="email" label="Email" type="email" autoComplete="email" required placeholder="you@example.com" />
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Send reset link
          </Button>
        </form>
      )}
      <p className="mt-4 text-center text-sm text-slate-600">
        <Link href="/login" className="font-semibold text-emerald-700 hover:underline">Back to log in</Link>
      </p>
    </div>
  );
}
