"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Textarea } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Card, EmptyState } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";

export default function CmsEditor({ page, isNew }: { page: { slug: string; title: string; content: string } | null; isNew: boolean }) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState({ slug: page?.slug || "", title: page?.title || "", content: page?.content || "" });
  const [saving, setSaving] = useState(false);

  if (!page && !isNew) return <Card className="p-6"><EmptyState title="Select a page to edit." /></Card>;

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save.");
      toast.push("Page saved.", "success");
      router.push(`/admin/cms?slug=${form.slug}`);
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="space-y-4 p-5">
      <Input label="Slug" name="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} disabled={!!page} hint={page ? "Slug cannot be changed." : "Used in the URL: /p/your-slug"} />
      <Input label="Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <Textarea label="Content" name="content" rows={12} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} hint="Plain text. Line breaks are preserved." />
      <div className="flex justify-end">
        <Button onClick={save} loading={saving}>Save page</Button>
      </div>
    </Card>
  );
}
