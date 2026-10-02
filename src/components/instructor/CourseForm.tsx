"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/fields";
import { useToast } from "@/components/ui/Toast";

export type CourseDraft = {
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnailUrl: string;
  status: "DRAFT" | "PUBLISHED";
};

export function CourseForm({ initial, isNew }: { initial: CourseDraft; isNew: boolean }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [delBusy, setDelBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get("title"),
      description: fd.get("description"),
      price: Number(fd.get("price") || 0),
      category: fd.get("category") || "",
      thumbnailUrl: fd.get("thumbnailUrl") || "",
      status: fd.get("status"),
    };
    try {
      const res = await fetch(isNew ? "/api/instructor/courses" : `/api/instructor/courses/${initial.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed.");
      toast.push(isNew ? "Course created." : "Course updated.", "success");
      router.push(isNew ? `/instructor/courses/${data.id}` : "/instructor/courses");
      router.refresh();
    } catch (err) {
      toast.push(err instanceof Error ? err.message : "Something went wrong.", "error");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!confirm("Delete this course and all its videos and reviews?")) return;
    setDelBusy(true);
    try {
      const res = await fetch(`/api/instructor/courses/${initial.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed.");
      toast.push("Course deleted.", "success");
      router.push("/instructor/courses");
      router.refresh();
    } catch (err) {
      toast.push(err instanceof Error ? err.message : "Something went wrong.", "error");
      setDelBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className="space-y-4 p-6">
        <Input name="title" label="Course title" required defaultValue={initial.title} placeholder="e.g. Facebook Ads for Beginners" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
          <textarea name="description" required minLength={20} rows={5} defaultValue={initial.description}
            placeholder="What will students learn?"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="price" label="Price (NPR, 0 = free)" type="number" min={0} defaultValue={String(initial.price)} required />
          <Input name="category" label="Category (optional)" defaultValue={initial.category} placeholder="e.g. Marketing" />
        </div>
        <Input name="thumbnailUrl" label="Thumbnail image URL (optional)" defaultValue={initial.thumbnailUrl} placeholder="https://…" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
          <select name="status" defaultValue={initial.status} className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm">
            <option value="DRAFT">Draft (not visible)</option>
            <option value="PUBLISHED">Published (visible to students)</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit" loading={busy}>{isNew ? "Create course" : "Save changes"}</Button>
          {!isNew && (
            <Button type="button" variant="ghost" loading={delBusy} onClick={onDelete} className="text-rose-700 hover:bg-rose-50">
              Delete
            </Button>
          )}
        </div>
      </Card>
    </form>
  );
}
