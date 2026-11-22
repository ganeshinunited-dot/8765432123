import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// CLI operations (migrate, generate) use the Supabase direct connection
// (DIRECT_URL) first, then the pooled DATABASE_URL. Both point at Supabase
// since the 22 Nov 2026 migration. NEVER read DATABASE_URL_UNPOOLED here:
// the stale Neon value left in Vercel silently sent the 22 Nov daily batch
// (20261122051633_daily_40_20261122) to Neon while the app runtime
// (src/lib/db.ts, pooled DATABASE_URL) reads Supabase. Delete the stale
// Neon DATABASE_URL_UNPOOLED var in Vercel when convenient.
const cliUrl = process.env.DIRECT_URL || env("DATABASE_URL");

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: cliUrl,
  },
});
