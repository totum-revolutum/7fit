import { supabase } from "../lib/supabaseClient";

export const fetchUserRole = async (userId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Помилка отримання ролі:", error.message);
    return null;
  }

  return data?.role ?? null;
};
