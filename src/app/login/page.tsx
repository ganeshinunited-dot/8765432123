import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Growentix.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string; verify?: string; next?: string }>;
}) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (user) {
    redirect(
      user.isAdmin ? "/admin/verifications" : user.role === "EMPLOYER" ? "/for-employers" : "/"
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sign in</h1>
      <p className="mt-2 text-base text-slate-600">
        Employers sign in to check their verification status. Admins sign in to review applications.
      </p>

      {params.verified === "1" && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Your email is verified — you can now sign in.
        </p>
      )}
      {params.verify === "expired" && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          That verification link has expired. If you applied as an employer, contact us and we will
          re-send it — or apply again with the same details.
        </p>
      )}
      {params.verify === "invalid" && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          That verification link is not valid. Please use the link from the email we sent you.
        </p>
      )}

      <LoginForm next={params.next} />

      <p className="mt-4 text-sm text-slate-600">
        <Link href="/forgot-password" className="font-semibold text-emerald-700 hover:underline">
          Forgot your password?
        </Link>
      </p>
      <p className="mt-2 text-sm text-slate-600">
        New employer?{" "}
        <Link href="/for-employers" className="font-semibold text-emerald-700 hover:underline">
          Apply for verification
        </Link>
      </p>
    </div>
  );
}
