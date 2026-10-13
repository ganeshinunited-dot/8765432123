// Decodes base64 article-image sources into public/article-images/ at build time.
// Sources live in article-image-sources/<slug>/ (committed as text because the
// GitHub push API is text-only). Each image is split into 90KB parts:
//   article-image-sources/<slug>/1.jpg.part00.b64, 1.jpg.part01.b64, ...
// Runs via the "prebuild" npm hook, so Vercel decodes them before Next.js
// copies public/ to the output.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "article-image-sources");
const outDir = path.join(root, "public", "article-images");

async function main() {
  let slugs;
  try {
    slugs = await fs.readdir(srcDir);
  } catch {
    console.log("[article-images] no sources directory, skipping");
    return;
  }
  let count = 0;
  for (const slug of slugs) {
    const sdir = path.join(srcDir, slug);
    const stat = await fs.stat(sdir).catch(() => null);
    if (!stat || !stat.isDirectory()) continue;
    const files = await fs.readdir(sdir);
    // group part files by image name: "<name>.jpg.partNN.b64"
    const groups = new Map();
    for (const f of files) {
      const m = f.match(/^(.+\.jpg)\.part\d+\.b64$/);
      if (!m) continue;
      if (!groups.has(m[1])) groups.set(m[1], []);
      groups.get(m[1]).push(f);
    }
    for (const [name, parts] of groups) {
      parts.sort();
      let b64 = "";
      for (const p of parts) b64 += (await fs.readFile(path.join(sdir, p), "utf8")).trim();
      const out = path.join(outDir, slug, name);
      await fs.mkdir(path.dirname(out), { recursive: true });
      await fs.writeFile(out, Buffer.from(b64, "base64"));
      count++;
    }
  }
  console.log(`[article-images] decoded ${count} images`);
}

main().catch((e) => {
  console.error("[article-images] failed:", e);
  process.exit(1);
});
