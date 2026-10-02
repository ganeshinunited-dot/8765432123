"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/fields";
import { useToast } from "@/components/ui/Toast";

export type VideoItem = { id: string; title: string; durationSec: number | null; views: number };

export function VideoManager({ courseId, videos }: { courseId: string; videos: VideoItem[] }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch(`/api/instructor/courses/${courseId}/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: fd.get("title"), durationSec: Number(fd.get("durationSec") || 0) || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not add video.");
      toast.push("Video added.", "success");
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } catch (err) {
      toast.push(err instanceof Error ? err.message : "Something went wrong.", "error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(videoId: string) {
    if (!confirm("Remove this video?")) return;
    const res = await fetch(`/api/instructor/courses/${courseId}/videos/${videoId}`, { method: "DELETE" });
    if (!res.ok) toast.push("Could not remove video.", "error");
    else { toast.push("Video removed.", "success"); router.refresh(); }
  }

  return (
    <div>
      <Card className="p-5">
        <h3 className="font-bold text-slate-900">Add lesson video</h3>
        <form onSubmit={add} className="mt-3 flex flex-wrap items-end gap-3">
          <div className="min-w-52 flex-1">
            <Input name="title" label="Video title" required placeholder="e.g. Lesson 1 — Introduction" />
          </div>
          <div className="w-32">
            <Input name="durationSec" label="Length (sec)" type="number" min={0} placeholder="600" />
          </div>
          <Button type="submit" loading={busy}>Add video</Button>
        </form>
        <p className="mt-2 text-xs text-slate-400">File uploads attach via the media library — video files link automatically once uploaded.</p>
      </Card>

      <div className="mt-4 space-y-2">
        {videos.length === 0 && <p className="text-sm text-slate-500">No videos yet.</p>}
        {videos.map((v, i) => (
          <Card key={v.id} className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{i + 1}. {v.title}</p>
              <p className="flex items-center gap-3 text-xs text-slate-500">
                {v.durationSec ? <span>{Math.floor(v.durationSec / 60)} min</span> : null}
                <span className="inline-flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                  {v.views} views
                </span>
              </p>
            </div>
            <Button size="sm" variant="ghost" className="text-rose-700 hover:bg-rose-50" onClick={() => remove(v.id)}>Remove</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
