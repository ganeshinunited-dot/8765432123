"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert, Card, Badge } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";

interface CompanyInitial {
  name?: string; industry?: string | null; description?: string | null;
  locationId?: string | null; website?: string | null; size?: string | null;
  verificationStatus?: string; id?: string;
}

export function CompanyProfileForm({ initial, locations }: { initial: CompanyInitial | null; locations: { id: string; name: string }[] }) {
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
          <VerificationBadge status={initial?.verificationStatus || "PENDING"} />
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

      <VerificationForm companyId={initial?.id} status={initial?.verificationStatus} />
    </div>
  );
}

function VerificationBadge({ status }: { status: string }) {
  const tones: Record<string, "green" | "amber" | "rose" | "slate" | "blue"> = {
    VERIFIED: "green", PENDING: "amber", REJECTED: "rose", NEEDS_INFO: "blue",
  };
  const labels: Record<string, string> = {
    VERIFIED: "Verified", PENDING: "Pending verification", REJECTED: "Verification rejected", NEEDS_INFO: "More info needed",
  };
  return <Badge tone={tones[status] || "slate"}>{labels[status] || status}</Badge>;
}

function VerificationForm({ companyId, status }: { companyId?: string; status?: string }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [docIds, setDocIds] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  if (status === "VERIFIED") {
    return (
      <Card className="border-emerald-200 bg-emerald-50 p-5">
        <p className="font-semibold text-emerald-900">Your company is verified. Job posts from verified employers get a trust badge.</p>
      </Card>
    );
  }

  async function uploadDoc(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("purpose", "DOCUMENT");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) { toast.push(data.error || "Upload failed.", "error"); return; }
    setDocIds([...docIds, data.fileId]);
    toast.push("Document uploaded.", "success");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registrationNo: fd.get("registrationNo"),
        contactPerson: fd.get("contactPerson"),
        address: fd.get("address"),
        phone: fd.get("phone"),
        documentIds: docIds,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Something went wrong."); return; }
    toast.push("Verification request submitted.", "success");
    window.location.reload();
  }

  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-base font-semibold text-slate-900">Employer verification</h2>
      <p className="mt-1 text-sm text-slate-600">Verified employers earn a trust badge on all job posts. Our team reviews each request.</p>
      {!companyId && <Alert tone="amber">Save your company profile above first.</Alert>}
      <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
        {error && <div className="sm:col-span-2"><Alert tone="rose">{error}</Alert></div>}
        <Input name="registrationNo" label="Business registration no. (optional)" maxLength={100} />
        <Input name="contactPerson" label="Contact person" required maxLength={120} />
        <div className="sm:col-span-2">
          <Input name="address" label="Business address" required maxLength={300} />
        </div>
        <Input name="phone" label="Business phone" required type="tel" maxLength={20} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Supporting documents (optional)</label>
          <input type="file" accept=".pdf,.doc,.docx"
            onChange={(e) => e.target.files?.[0] && uploadDoc(e.target.files[0])}
            className="text-sm text-slate-600 file:mr-3 file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-4 file:py-2.5 file:text-sm file:font-semibold" />
          {uploading && <span className="text-sm text-slate-500">Uploading…</span>}
          {docIds.length > 0 && <p className="mt-1 text-sm text-emerald-700">{docIds.length} document(s) attached.</p>}
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" loading={loading} disabled={!companyId}>Submit for verification</Button>
        </div>
      </form>
    </Card>
  );
}
