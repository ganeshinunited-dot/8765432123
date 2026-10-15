import { redirect } from "next/navigation";

// Signups are disabled for now — Growentix is a news-only site at the moment.
// The signup form is kept in git history; re-enable by restoring the form
// and removing the guard in /api/auth/register.
export default function SignupPage() {
  redirect("/");
}
