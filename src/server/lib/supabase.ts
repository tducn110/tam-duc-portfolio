import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../shared/lib/supabase.types";

const supabaseUrl = (typeof process !== "undefined" ? process.env.VITE_SUPABASE_URL : undefined)
  || import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = typeof process !== "undefined" ? process.env.SUPABASE_SERVICE_ROLE_KEY : undefined;

if (!supabaseUrl) {
  throw new Error("[Supabase Admin] Missing VITE_SUPABASE_URL in env");
}

// During local dev, this file might be imported by frontend modules (like test environments)
// So we only throw if we are actually running on Node server-side
if (typeof window === "undefined" && !supabaseServiceKey) {
  console.warn("[Supabase Admin] Warning: SUPABASE_SERVICE_ROLE_KEY is missing in server environment");
}

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey || "mock-service-key-for-dev",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
) as any;
