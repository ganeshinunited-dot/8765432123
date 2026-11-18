"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { MANUAL_CHECKS } from "@/lib/verification";

export default function VerificationActions({
  id,
  status,
  ownerEmailVerified,
  emailConfigured,
  initialChecks,
}: {
  id: string;
  status: string;
  ownerEmailVerified: boolean;
  emailConfigured: boolean;
  initialChecks: Record<string, boolean>;
}) {
  const router = useRouter();
  const toast = useToast();
  const [checks, setChecks] = useState<Record<string, boolean>>(initialChecks);
  const [notes, setNotes] = useState("");
  const [confirmContact, setConfirmContact] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const allChecked = MANUAL_CHECKS.every((c) => checks[c.key] === true);
  const contactOk = ownerEmailVerified || confirmContact;
  const canApprove = status === "PENDING" || status === "NEEDS_INFO";
  const decided = status === "VERIFIED" || status === "REJECTED";

  async function act(action: string, reason?: string) {
    setBusy(action);
    try {
      const res = await fetch(`/api/admin/verifications/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, notes: reason ?? notes, checks, confirmContact }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Action failed.");
      toast.push("Done.", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(null);
    }
  }

  function reject() {
    const reason = prompt("Reason for rejection (shown to the employer):");
    if (reason) act("reject", reason);
  }

  function needsInfo() {
    if (!notes.trim()) {
      toast.push("Write what is missing in the notes first.", "error");
      return;
    }
    act("needs_info");
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-slate-700">Manual checks — tick each after verifying it:</p>
        <div className="mt-2 space-y-2">
          {MANUAL_CHECKS.map((c) => (
            <label key={c.key} className="flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={checks[c.key] === true}
                onChange={(e) => setChecks((prev) => ({ ...prev, [c.key]: e.target.checked }))}
                disabled={decided}
                className="mt-0.5 h-4 w-4 accent-emerald-700"
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {!ownerEmailVerified && (
        <label className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          <input
            type="checkbox"
            checked={confirmContact}
            onChange={(e) => setConfirmContact(e.target.checked)}
            disabled={decided}
            className="mt-0.5 h-4 w-4 accent-amber-700"
          />
          <span>
            Contact confirmed manually — I reached the employer by phone or email because the
            verification email did not go through. This marks their email verified.
          </span>
        </label>
      )}

      <div>
        <label htmlFor="review-notes" className="mb-1 block text-sm font-medium text-slate-700">
          Notes (shown to the employer on needs-info / rejection)
        </label>
        <textarea
          id="review-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          maxLength={2000}
          disabled={decided}
          placeholder="e.g. Registration number does not match the certificate — please re-send it."
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
        />
      </div>

      {canApprove && (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            disabled={busy !== null || !allChecked || !contactOk}
            loading={busy === "approve"}
            onClick={() => act("approve")}
          >
            Approve — grant Verified badge
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={busy !== null}
            loading={busy === "needs_info"}
            onClick={needsInfo}
          >
            Ask for more info
          </Button>
          <Button
            size="sm"
            variant="danger"
            disabled={busy !== null}
            loading={busy === "reject"}
            onClick={reject}
          >
            Reject
          </Button>
          {!ownerEmailVerified && (
            <Button
              size="sm"
              variant="outline"
              disabled={busy !== null}
              loading={busy === "confirm_contact"}
              onClick={() => act("confirm_contact")}
            >
              Confirm contact
            </Button>
          )}
          {!ownerEmailVerified && !confirmContact && (
            <span className="text-xs text-slate-500">
              Approve is disabled until the owner verifies their email or you confirm contact
              manually.
            </span>
          )}
          {!allChecked && (
            <span className="text-xs text-slate-500">
              Approve needs all four manual checks ticked.
            </span>
          )}
        </div>
      )}

      {decided && (
        <p className="text-sm text-slate-500">
          This application was decided ({status}). No further actions are available here.
        </p>
      )}

      {!emailConfigured && (
        <p className="text-xs text-slate-500">
          Email is not configured — the employer will not receive decision emails automatically.
          Contact them manually from Gmail after deciding.
        </p>
      )}

      <p className="text-sm text-slate-600">
        <Link href="/admin/companies" className="font-semibold text-emerald-700 hover:underline">
          All companies →
        </Link>
      </p>
    </div>
  );
}
