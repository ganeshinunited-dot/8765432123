import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// CLI operations (migrate, generate) prefer the direct/unpooled connection
// when present (Vercel + Neon inject DATABASE_URL_UNPOOLED); the app runtime
// uses the pooled DATABASE_URL via the pg adapter in src/lib/db.ts.
const cliUrl = process.env.DATABASE_URL_UNPOOLED || env("DATABASE_URL");

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: cliUrl,
  },
});
