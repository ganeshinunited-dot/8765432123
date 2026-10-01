"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/overlays";
import { useToast } from "@/components/ui/Toast";

export default function ProposeInterview({ applicationId, studentName, onDone }: { applicationId: string; studentName: string; onDone: () => void }) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ dateTime: "", location: "", meetingLink: "", notes: "" });

  async function submit() {
    if (!form.dateTime) { toast.push("Pick a date and time.", "error"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not schedule.");
      toast.push("Interview invitation sent.", "success");
      setOpen(false);
      onDone();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Interview</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={`Invite ${studentName} to interview`}>
        <div className="space-y-4">
          <Input label="Date & time" name="dateTime" type="datetime-local" value={form.dateTime} onChange={(e) => setForm({ ...form, dateTime: e.target.value })} />
          <Input label="Location (for in-person)" name="location" placeholder="e.g. Our office, Thamel" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input label="Meeting link (for online)" name="meetingLink" type="url" placeholder="https://…" value={form.meetingLink} onChange={(e) => setForm({ ...form, meetingLink: e.target.value })} />
          <Textarea label="Notes for the candidate (optional)" name="notes" rows={2} placeholder="What to bring, who to ask for…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={submit} loading={saving}>Send invitation</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
