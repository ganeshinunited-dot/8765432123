import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your Growentix password.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Forgot password</h1>
      <p className="mt-2 text-base text-slate-600">
        Enter the email you signed up with and we will send you a reset link.
      </p>
      <ForgotPasswordForm />
      <p className="mt-4 text-sm text-slate-600">
        <Link href="/login" className="font-semibold text-emerald-700 hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
