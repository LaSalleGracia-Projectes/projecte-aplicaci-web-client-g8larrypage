import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://zlpjwwiqyssqrzlwinkj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscGp3d2lxeXNzcXJ6bHdpbmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NzQ2NzUsImV4cCI6MjA1MzA1MDY3NX0.ju7cIcFBP7cFD3I9e-F1s1hgHgOJMtOS6AHGaEngcWM";

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;