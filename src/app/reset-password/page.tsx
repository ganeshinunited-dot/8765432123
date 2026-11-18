import type { Metadata } from "next";
import Link from "next/link";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Set a new Growentix password.",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token ?? "";

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reset password</h1>
      {!token ? (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          This reset link is incomplete. Please use the full link from the email we sent you, or{" "}
          <Link href="/forgot-password" className="font-semibold underline">
            request a new one
          </Link>
          .
        </p>
      ) : (
        <>
          <p className="mt-2 text-base text-slate-600">Choose a new password for your account.</p>
          <ResetPasswordForm token={token} />
        </>
      )}
    </div>
  );
}
