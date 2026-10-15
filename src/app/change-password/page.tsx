import { requireUser } from "@/lib/auth";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function ChangePasswordPage() {
  // Any logged-in role (student, employer, instructor, admin) can change
  // their own password here — no email reset link needed.
  await requireUser();

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Change password</h1>
      <p className="mt-1 text-sm text-slate-600">
        Enter your current password, then choose a new one. You will be logged out and asked to log in again.
      </p>
      <ChangePasswordForm />
    </div>
  );
}
