import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseURL || !supabaseKey) {
  throw new Error("Supabase URL o Key no están configurados correctamente.");
}

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;