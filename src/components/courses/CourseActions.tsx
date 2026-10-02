"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

/** Buy + review actions on the public course page (students only). */
export function CourseActions({
  courseId, price, isStudent, purchased, canReview, signedIn,
}: {
  courseId: string; price: number; isStudent: boolean; purchased: boolean; canReview: boolean; signedIn: boolean;
}) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [showReview, setShowReview] = useState(false);

  async function buy() {
    if (!signedIn) { router.push("/login?next=/courses"); return; }
    setBusy(true);
    try {
      const res = await fetch(`/api/courses/${courseId}/purchase`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Purchase failed.");
      toast.push(price === 0 ? "Enrolled!" : "Purchase complete (demo).", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(false);
    }
  }

  async function submitReview() {
    setBusy(true);
    try {
      const res = await fetch(`/api/courses/${courseId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, text }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Review failed.");
      toast.push("Thanks for your review!", "success");
      setShowReview(false);
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(false);
    }
  }

  if (purchased) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-emerald-100 px-4 py-2.5 text-sm font-bold text-emerald-700">✓ Enrolled</span>
        {canReview && !showReview && (
          <Button size="sm" variant="secondary" onClick={() => setShowReview(true)}>Write a review</Button>
        )}
        {showReview && (
          <div className="w-full rounded-xl border border-slate-200 p-4">
            <div className="flex gap-1" role="radiogroup" aria-label="Your rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} type="button" role="radio" aria-checked={rating === i} onClick={() => setRating(i)} aria-label={`${i} stars`}>
                  <svg className={`h-7 w-7 ${i <= rating ? "text-amber-400" : "text-slate-200"}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9 4.7 17.6l1-5.8L1.5 7.7l5.9-.9z" />
                  </svg>
                </button>
              ))}
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} maxLength={1000}
              placeholder="What did you think of this course? (optional)"
              className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <div className="mt-3 flex gap-2">
              <Button size="sm" loading={busy} onClick={submitReview}>Submit review</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowReview(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Button loading={busy} onClick={buy} disabled={!isStudent && signedIn}>
      {!signedIn ? (price === 0 ? "Sign in to enroll" : "Sign in to buy") : !isStudent ? "Students only" : price === 0 ? "Enroll free" : `Buy now — NPR ${price.toLocaleString()}`}
    </Button>
  );
}
