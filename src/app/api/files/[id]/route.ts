import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

// Serves uploaded files with authorization:
// - Public files (logos, profile photos): anyone.
// - Private files (CVs, documents): owner, the employer who received the
//   application containing it, or an admin. Never exposed via public URLs.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const file = await db.uploadedFile.findUnique({ where: { id } });
  if (!file) return NextResponse.json({ error: "File not found." }, { status: 404 });

  if (!file.isPublic) {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    let allowed = file.ownerId === user.id || user.isAdmin;
    if (!allowed && user.role === "EMPLOYER" && file.purpose === "CV") {
      const app = await db.application.findFirst({
        where: { cvFileId: file.id, job: { company: { ownerId: user.id } } },
        select: { id: true },
      });
      allowed = !!app;
    }
    if (!allowed) return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  try {
    const data = await readFile(file.storagePath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(file.fileName)}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "File unavailable." }, { status: 404 });
  }
}
