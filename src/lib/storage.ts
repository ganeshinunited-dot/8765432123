import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

// Storage abstraction. Driver: local | s3.
// - local: files stored under UPLOAD_DIR, served through /api/files/[id] with
//   auth checks (private CVs are never exposed via public URLs).
// - s3: S3-compatible (AWS S3, Supabase Storage S3 API, MinIO). Wire credentials
//   via S3_STORAGE_* env vars.

export interface StoredFile {
  storagePath: string;
  size: number;
}

export async function saveUpload(
  bytes: Buffer,
  originalName: string,
  purpose: string
): Promise<StoredFile> {
  const driver = process.env.STORAGE_DRIVER || "local";
  if (driver === "local") {
    const dir = join(process.cwd(), process.env.UPLOAD_DIR || "./uploads", purpose.toLowerCase());
    await mkdir(dir, { recursive: true });
    const key = `${Date.now()}-${randomUUID()}`;
    const storagePath = join(dir, key);
    await writeFile(storagePath, bytes);
    return { storagePath, size: bytes.length };
  }
  if (driver === "s3") {
    throw new Error(
      "S3 driver selected but not configured in this build. Set S3_STORAGE_* env vars and wire an S3 client."
    );
  }
  throw new Error(`Unknown STORAGE_DRIVER: ${driver}`);
}

export const ALLOWED_CV_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const ALLOWED_IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp"] as const;

export const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2 MB

export function extFor(mime: string): string {
  const map: Record<string, string> = {
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };
  return map[mime] ?? "";
}
