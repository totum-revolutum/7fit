import { supabase } from "../lib/supabaseClient";

export const fetchTrainers = async () => {
  const { data, error } = await supabase
    .from("trainers")
    .select("trainer_id, trainer_name");

  if (error) throw error;
  return data;
};

export const fetchWorkoutTypes = async () => {
  const { data, error } = await supabase
    .from("workout")
    .select("workout_id, workout_type");

  if (error) throw error;
  return data;
};

export const fetchEvents = async (startDate?: string, endDate?: string) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("start_time", startDate)
    .lt("start_time", endDate);

  if (error) throw error;
  return data;
};

export const fetchUsers = async () => {
  console.log("Fetching users from user_data...");
  
  // Спочатку отримуємо користувачів з user_data
  const { data: usersData, error: usersError } = await supabase
    .from("user_data")
    .select("user_id, user_name, user_email");

  if (usersError) throw usersError;

  console.log("Users from user_data:", usersData?.length);

  // Потім отримуємо ролі з profiles
  const { data: profilesData, error: profilesError } = await supabase
    .from("profiles")
    .select("id, role");

  if (profilesError) throw profilesError;

  console.log("Profiles data:", profilesData?.length);

  // Створюємо мапу ролей
  const roleMap = new Map();
  profilesData?.forEach(profile => {
    roleMap.set(profile.id, profile.role);
  });

  // Об'єднуємо дані
  const result = usersData.map((user) => ({
    user_id: user.user_id,
    user_name: user.user_name,
    user_email: user.user_email,
    role: roleMap.get(user.user_id) || null,
  }));

  console.log("Final users with roles:", result.length);
  return result;
};

export const fetchUsersForAdminSearch = async (query: string) => {
  // Спочатку отримуємо користувачів з user_data
  const { data: usersData, error: usersError } = await supabase
    .from("user_data")
    .select("user_id, user_name, user_email")
    .ilike("user_name", `%${query}%`);

  if (usersError) throw usersError;

  // Потім отримуємо ролі з profiles
  const { data: profilesData, error: profilesError } = await supabase
    .from("profiles")
    .select("id, role");

  if (profilesError) throw profilesError;

  // Створюємо мапу ролей
  const roleMap = new Map();
  profilesData?.forEach(profile => {
    roleMap.set(profile.id, profile.role);
  });

  // Об'єднуємо дані
  return usersData.map((user) => ({
    user_id: user.user_id,
    user_name: user.user_name,
    user_email: user.user_email,
    role: roleMap.get(user.user_id) || null,
  }));
};

export const createEvent = async ({
  start_time,
  end_time,
  trainer_id,
  workout_id,
  user_id,
}: {
  start_time: string;
  end_time: string;
  trainer_id: string;
  workout_id: string;
  user_id: string;
}) => {
  const { data, error } = await supabase.from("events").insert([
    {
      start_time,
      end_time,
      trainer_id,
      workout_id,
      user_id,
    },
  ]);

  if (error) throw error;
  return data;
};
