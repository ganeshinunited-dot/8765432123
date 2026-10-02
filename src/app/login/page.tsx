"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }
    toast.push("Welcome back!", "success");
    router.push(searchParams.get("next") || "/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Log in</h1>
      <p className="mt-1 text-sm text-slate-600">Welcome back to Growentix.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {searchParams.get("reset") === "1" && (
          <Alert tone="green">Your password has been updated. Log in with your new password.</Alert>
        )}
        {searchParams.get("verified") === "1" && (
          <Alert tone="green">Your email is verified. Welcome to Growentix!</Alert>
        )}
        {error && <Alert tone="rose">{error}</Alert>}
        <Input name="email" label="Email" type="email" autoComplete="email" required placeholder="you@example.com" />
        <Input name="password" label="Password" type="password" autoComplete="current-password" required placeholder="••••••••" />
        <div className="text-right">
          <Link href="/forgot-password" className="text-sm font-semibold text-emerald-700 hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Log in
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        New here? <Link href="/signup" className="font-semibold text-emerald-700 hover:underline">Create an account</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  );
}
