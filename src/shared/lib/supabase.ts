import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env"
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = createClient<Database>(supabaseUrl, supabaseKey) as any;
