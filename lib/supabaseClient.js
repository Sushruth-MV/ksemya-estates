import { createClient } from "@supabase/supabase-js";

// These two values get added to your .env.local file tomorrow, once the
// Supabase project exists. Until then, this client is created but any
// query made with it will simply fail gracefully (pages handle that below).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
