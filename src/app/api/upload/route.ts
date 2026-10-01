import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit, clientKey } from "@/lib/auth";
import { saveUpload, ALLOWED_CV_MIMES, ALLOWED_IMAGE_MIMES, MAX_CV_BYTES, MAX_IMAGE_BYTES, extFor } from "@/lib/storage";

const PURPOSE_RULES: Record<string, { mimes: readonly string[]; max: number }> = {
  CV: { mimes: ALLOWED_CV_MIMES, max: MAX_CV_BYTES },
  PHOTO: { mimes: ALLOWED_IMAGE_MIMES, max: MAX_IMAGE_BYTES },
  DOCUMENT: { mimes: ALLOWED_CV_MIMES, max: MAX_CV_BYTES },
  LOGO: { mimes: ALLOWED_IMAGE_MIMES, max: MAX_IMAGE_BYTES },
};

export async function POST(req: Request) {
  if (!rateLimit(clientKey("upload", req), 20, 60_000)) {
    return NextResponse.json({ error: "Too many uploads. Please try again later." }, { status: 429 });
  }
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Please log in." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  const file = form.get("file") as File | null;
  const purpose = String(form.get("purpose") || "").toUpperCase();
  const rules = PURPOSE_RULES[purpose];
  if (!file || !rules) return NextResponse.json({ error: "Invalid file or purpose." }, { status: 400 });

  // Validate MIME type AND extension (never trust client MIME alone)
  if (!rules.mimes.includes(file.type)) {
    return NextResponse.json({ error: `File type not allowed. Allowed: ${rules.mimes.join(", ")}` }, { status: 400 });
  }
  const ext = file.name.split(".").pop()?.toLowerCase();
  const expectedExts = rules.mimes.map((m) => extFor(m));
  if (!ext || !expectedExts.includes(`.${ext}`)) {
    return NextResponse.json({ error: "File extension does not match its type." }, { status: 400 });
  }
  if (file.size > rules.max) {
    return NextResponse.json({ error: `File too large. Maximum ${Math.round(rules.max / 1024 / 1024)} MB.` }, { status: 400 });
  }
  if (file.size === 0) return NextResponse.json({ error: "Empty file." }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const stored = await saveUpload(bytes, file.name, purpose);
  const record = await db.uploadedFile.create({
    data: {
      ownerId: user.id,
      purpose,
      fileName: file.name,
      mimeType: file.type,
      size: stored.size,
      storagePath: stored.storagePath,
      isPublic: purpose === "LOGO" || purpose === "PHOTO",
    },
  });

  return NextResponse.json({ ok: true, fileId: record.id });
}
