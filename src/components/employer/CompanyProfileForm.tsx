"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert, Card, Badge } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";
import { VerificationCenter, type CenterProps } from "./VerificationCenter";
import { badgeTone, badgeLabel } from "@/lib/verification";

interface CompanyInitial {
  name?: string; industry?: string | null; description?: string | null;
  locationId?: string | null; website?: string | null; size?: string | null;
  verificationStatus?: string; id?: string;
}

export function CompanyProfileForm({ initial, locations, verification }: { initial: CompanyInitial | null; locations: { id: string; name: string }[]; verification?: CenterProps }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoId, setLogoId] = useState("");
  const [uploading, setUploading] = useState(false);

  async function saveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/company", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"), industry: fd.get("industry"), description: fd.get("description"),
        locationId: fd.get("locationId"), website: fd.get("website"), size: fd.get("size"),
        logoUrl: logoId ? `/api/files/${logoId}` : "",
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Something went wrong."); return; }
    toast.push("Company profile saved.", "success");
    window.location.reload();
  }

  async function uploadLogo(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("purpose", "LOGO");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) { toast.push(data.error || "Upload failed.", "error"); return; }
    setLogoId(data.fileId);
    toast.push("Logo uploaded. Save the profile to apply it.", "success");
  }

  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-slate-900">Company profile</h2>
          <VerificationBadge status={initial?.verificationStatus || "PENDING"} expiresAt={(initial as { verificationExpiresAt?: string })?.verificationExpiresAt} />
        </div>
        <form onSubmit={saveProfile} className="mt-4 grid gap-4 sm:grid-cols-2">
          {error && <div className="sm:col-span-2"><Alert tone="rose">{error}</Alert></div>}
          <div className="sm:col-span-2">
            <Input name="name" label="Company name" required defaultValue={initial?.name || ""} maxLength={120} />
          </div>
          <Input name="industry" label="Industry" defaultValue={initial?.industry || ""} placeholder="e.g. Hospitality, Digital Marketing" maxLength={100} />
          <Select name="locationId" label="Location" defaultValue={initial?.locationId || ""}
            options={[{ value: "", label: "Select location" }, ...locations.map((l) => ({ value: l.id, label: l.name }))]} />
          <Input name="website" label="Website (optional)" defaultValue={initial?.website || ""} placeholder="https://" />
          <Select name="size" label="Company size (optional)" defaultValue={initial?.size || ""}
            options={[{ value: "", label: "Not specified" }, { value: "1-10", label: "1–10" }, { value: "11-50", label: "11–50" }, { value: "51-200", label: "51–200" }, { value: "200+", label: "200+" }]} />
          <div className="sm:col-span-2">
            <Textarea name="description" label="About the company" rows={4} defaultValue={initial?.description || ""} maxLength={3000} placeholder="What does your company do? What is it like to work here?" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Logo</label>
            <div className="flex items-center gap-3">
              <input type="file" accept="image/jpeg,image/png,image/webp"
                onChange={(e) => e.target.files?.[0] && uploadLogo(e.target.files[0])}
                className="text-sm text-slate-600 file:mr-3 file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-4 file:py-2.5 file:text-sm file:font-semibold" />
              {uploading && <span className="text-sm text-slate-500">Uploading…</span>}
              {logoId && <span className="text-sm font-medium text-emerald-700">Uploaded ✓ — save to apply</span>}
            </div>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" loading={loading}>Save company profile</Button>
          </div>
        </form>
      </Card>

      {verification ? <VerificationCenter {...verification} /> : null}
    </div>
  );
}

function VerificationBadge({ status, expiresAt }: { status: string; expiresAt?: string }) {
  const companyLike = { verificationStatus: status, verificationExpiresAt: expiresAt || null };
  return <Badge tone={badgeTone(companyLike)}>{badgeLabel(companyLike)}</Badge>;
}
