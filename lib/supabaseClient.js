import { createClient } from "@supabase/supabase-js";

// Falls back to placeholder values so the client can still be constructed
// (and pages can fail gracefully) if env vars are ever missing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
