import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Not authorized</h1>
      <p className="mt-2 text-slate-600">You don&apos;t have permission to view this page.</p>
      <Link href="/" className="mt-6 inline-block">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
