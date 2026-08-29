import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't crash the whole app if env vars are missing during local dev/build —
  // just warn loudly so it's obvious why leads aren't saving.
  console.warn(
    "[EngiAssist] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
      "Copy app/.env.example to app/.env and fill in your Supabase project keys."
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
