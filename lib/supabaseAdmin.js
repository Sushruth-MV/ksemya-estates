import { createClient } from "@supabase/supabase-js";

// Service-role client for server-only routes (API routes under app/api/).
// Never import this from client components — the service role key bypasses
// RLS entirely and must not reach the browser.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key"
);
