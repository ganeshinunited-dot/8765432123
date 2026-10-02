"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";

export default function SignupPage() {
  const router = useRouter();
  const toast = useToast();
  const [role, setRole] = useState<"STUDENT" | "EMPLOYER">("STUDENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone") || "",
        password: fd.get("password"),
        role,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }
    toast.push("Account created. We sent a verification link to your email.", "success");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
      <p className="mt-1 text-sm text-slate-600">Free for students. Employers can post jobs after verification.</p>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5" role="radiogroup" aria-label="I am a">
        {(["STUDENT", "EMPLOYER"] as const).map((r) => (
          <button
            key={r}
            type="button"
            role="radio"
            aria-checked={role === r}
            onClick={() => setRole(r)}
            className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
              role === r ? "bg-white text-emerald-800 shadow" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {r === "STUDENT" ? "I am a Student" : "I am an Employer"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {error && <Alert tone="rose">{error}</Alert>}
        <Input name="name" label="Full name" autoComplete="name" required placeholder="e.g. Aashish Sharma" />
        <Input name="email" label="Email" type="email" autoComplete="email" required placeholder="you@example.com" />
        <Input name="phone" label="Phone (optional)" type="tel" autoComplete="tel" placeholder="98XXXXXXXX" />
        <Input name="password" label="Password" type="password" autoComplete="new-password" required minLength={8} hint="At least 8 characters." />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Create account
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account? <Link href="/login" className="font-semibold text-emerald-700 hover:underline">Log in</Link>
      </p>
      <p className="mt-6 text-center text-xs text-slate-500">
        By signing up you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
        Never pay an employer to apply for a job.
      </p>
    </div>
  );
}
