import { createClient } from "@supabase/supabase-js";

export async function verifyAdmin(req: Request): Promise<{ error?: string; status?: number; user?: any }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Missing or invalid Authorization header", status: 401 };
  }

  const token = authHeader.split(" ")[1];
  const supabaseUrl = (typeof process !== "undefined" ? process.env.VITE_SUPABASE_URL : undefined)
    || import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = (typeof process !== "undefined" ? process.env.VITE_SUPABASE_PUBLISHABLE_KEY : undefined)
    || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: "Missing Supabase configuration", status: 500 };
  }

  // Verify JWT token with Supabase Auth using the user's access token
  const tempClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });

  const { data: { user }, error } = await tempClient.auth.getUser(token);

  if (error || !user) {
    return { error: "Invalid or expired token", status: 401 };
  }

  if (!user.email) {
    return { error: "User email not found", status: 401 };
  }

  // Check email allowlist
  const adminEmails = (typeof process !== "undefined" ? process.env.ADMIN_EMAILS : undefined)
    ? process.env.ADMIN_EMAILS!.split(",").map((e) => e.trim().toLowerCase())
    : ["n.tduc011006dn@gmail.com"];

  if (!adminEmails.includes(user.email.toLowerCase())) {
    return { error: "Access denied. You are not an admin.", status: 403 };
  }

  return { user };
}
