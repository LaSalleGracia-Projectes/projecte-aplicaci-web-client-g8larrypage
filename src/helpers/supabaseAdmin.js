import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseURL) {
  throw new Error("Supabase URL no está configurado correctamente.");
}

if (!supabaseServiceRoleKey) {
  throw new Error("Service Role Key no está configurado.");
}

const supabaseAdmin = createClient(supabaseURL, supabaseServiceRoleKey);

export default supabaseAdmin;