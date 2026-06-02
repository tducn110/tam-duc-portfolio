/**
 * Run the contact_leads migration via Supabase's pg REST endpoint.
 * 
 * Usage:
 *   SUPABASE_SERVICE_KEY=<service_role_key> node supabase/migrate.mjs
 *
 * Or just paste the SQL from supabase/migrations/001_create_contact_leads.sql
 * directly into the Supabase Dashboard → SQL Editor.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://cruapnqfpffwssmbzgww.supabase.co";
// Need service role key for DDL (not anon/publishable key)
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error(
    "\n❌  SUPABASE_SERVICE_KEY is required for migrations (DDL needs elevated privileges).\n" +
    "   Get it from: Supabase Dashboard → Project Settings → API → service_role secret\n" +
    "   Then run: SUPABASE_SERVICE_KEY=<key> node supabase/migrate.mjs\n\n" +
    "   ─── Alternative ────────────────────────────────────────────────────────────\n" +
    "   Paste this file into Supabase SQL Editor:\n" +
    "   supabase/migrations/001_create_contact_leads.sql\n"
  );
  process.exit(1);
}

const sql = readFileSync(
  join(__dirname, "migrations/001_create_contact_leads.sql"),
  "utf-8"
);

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// Execute via RPC - requires the pg_net extension or direct Postgres access
const { error } = await supabase.rpc("exec_sql", { sql });
if (error) {
  console.error("❌ Migration failed:", error.message);
  process.exit(1);
}

console.log("✅ contact_leads table created successfully!");
