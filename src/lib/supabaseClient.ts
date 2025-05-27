import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ziozsmoxszsldeyvfpgl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppb3pzbW94c3pzbGRleXZmcGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTUwMzgsImV4cCI6MjA2Mjg5MTAzOH0.oi8tm9_v8_SeF3cSCk9d8fMDQYmzt7ZcgDW-OqxTr4A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
