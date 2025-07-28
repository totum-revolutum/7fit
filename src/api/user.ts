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

export interface User {
  user_id: string;
  user_name: string;
  user_email: string;
  user_main_contact: string;
  contact_type: string;
  subscription_id?: string;
  assessment_date?: string;
  created_at: string;
  full_name?: string;
  gender?: string;
  birth_month?: number;
  birth_day?: number;
  is_vip?: boolean;
  abon_type?: string;
  discount?: string;
  assessment_result_id?: string;
}

export interface Trainer {
  trainer_id: string;
  trainer_name: string;
  trainerRank?: string;
  trainerInfo?: string;
  trainerPhoto?: string;
  createdAt?: string;
  dismissedAt?: string;
  trainingtypeId?: string;
  contact?: string;
  contactType?: string;
}

export const fetchUserById = async (id: string): Promise<User | null> => {
  console.log("Fetching user with ID:", id);
  
  const { data, error } = await supabase
    .from("user_data")
    .select("*")
    .eq("user_id", id);

  if (error) {
    console.error("Помилка при завантаженні user:", error.message);
    return null;
  }

  console.log("User data found:", data?.length || 0, "records");

  // Повертаємо перший знайдений рядок або null
  return data && data.length > 0 ? data[0] : null;
};

export const fetchTrainerById = async (id: string): Promise<Trainer | null> => {
  console.log("Fetching trainer with ID:", id);
  
  const { data, error } = await supabase
    .from("trainers")
    .select("*")
    .eq("trainer_id", id);

  if (error) {
    console.error("Помилка при завантаженні trainer:", error.message);
    return null;
  }

  console.log("Trainer data found:", data?.length || 0, "records");

  // Повертаємо перший знайдений рядок або null
  return data && data.length > 0 ? data[0] : null;
};

export const updateUserById = async (id: string, updates: Partial<User>) => {
  const { error } = await supabase
    .from("user_data")
    .update(updates)
    .eq("user_id", id);

  if (error) {
    console.error("Помилка при оновленні user:", error.message);
    throw new Error(error.message);
  }
};

export const updateTrainerById = async (
  id: string,
  updates: Partial<Trainer>
) => {
  const { error } = await supabase
    .from("trainers")
    .update(updates)
    .eq("trainer_id", id);

  if (error) {
    console.error("Помилка при оновленні trainer:", error.message);
    throw new Error(error.message);
  }
};

// Для адмін панелі - отримання всіх користувачів
export const fetchAllUsers = async () => {
  const { data, error } = await supabase
    .from("user_data")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Помилка при завантаженні користувачів:", error.message);
    return [];
  }

  return data;
};

// Для адмін панелі - отримання всіх тренерів
export const fetchAllTrainers = async () => {
  const { data, error } = await supabase
    .from("trainers")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Помилка при завантаженні тренерів:", error.message);
    return [];
  }

  return data;
};

// Пошук користувачів для адміна
export const searchUsers = async (query: string) => {
  const { data, error } = await supabase
    .from("user_data")
    .select("user_id, user_name, user_email")
    .or(`user_name.ilike.%${query}%,user_email.ilike.%${query}%`)
    .limit(10);

  if (error) {
    console.error("Помилка при пошуку користувачів:", error.message);
    return [];
  }

  return data;
};
