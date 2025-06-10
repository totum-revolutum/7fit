import { supabase } from "../lib/supabaseClient";

export async function login(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function register(email: string, password: string) {
  return await supabase.auth.signUp({ email, password });
}

export async function logout() {
  return await supabase.auth.signOut();
}

export async function getCurrentSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
