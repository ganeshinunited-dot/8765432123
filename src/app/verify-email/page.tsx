"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/primitives";
import { Spinner } from "@/components/ui/primitives";

type State = "checking" | "success" | "error";

function VerifyRunner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [state, setState] = useState<State>(token ? "checking" : "error");
  const [message, setMessage] = useState(token ? "" : "This verification link is invalid.");

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => ({}));
      if (cancelled) return;
      if (res.ok) {
        setState("success");
        setMessage(data.message || "Email verified. Thank you!");
      } else {
        setState("error");
        setMessage(data.error || "This verification link is invalid or has expired.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (state === "checking") {
    return (
      <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
        <Spinner /> Verifying your email…
      </div>
    );
  }
  if (state === "success") {
    return (
      <div className="mt-6 space-y-4">
        <Alert tone="green">{message}</Alert>
        <p className="text-sm text-slate-600">
          You can now <Link href="/login" className="font-semibold text-emerald-700 hover:underline">log in</Link> or
          head to your <Link href="/dashboard" className="font-semibold text-emerald-700 hover:underline">dashboard</Link>.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-6 space-y-4">
      <Alert tone="rose">{message}</Alert>
      <p className="text-sm text-slate-600">
        Log in and use the &ldquo;Resend verification email&rdquo; button on your dashboard to get a fresh link.
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Verify your email</h1>
      <Suspense>
        <VerifyRunner />
      </Suspense>
    </div>
  );
}
