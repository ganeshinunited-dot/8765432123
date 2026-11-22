import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// CLI operations (migrate, generate) need a database connection at build
// time. Supabase's direct host (db.<ref>.supabase.co:5432) is IPv6-only
// and unreachable from Vercel builds (P1001), so the CLI URL is derived
// from DATABASE_URL instead: the transaction pooler
// (aws-1-ap-southeast-1.pooler.supabase.com:6543, ?pgbouncer=true)
// becomes the session pooler (:5432), which pg_restore already proved
// reachable. Derived at build time so no password is stored in code.
const cliUrl = env("DATABASE_URL")
  .replace(":6543", ":5432")
  .replace("?pgbouncer=true", "");

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: cliUrl,
  },
});
