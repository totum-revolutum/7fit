import { supabase } from "../lib/supabaseClient";

// Типи для JOIN результатів
interface UserData {
  user_name: string;
  user_email: string;
}

interface TrainerData {
  trainer_name: string;
}

interface WorkoutTypeData {
  workout_type: string;
}

interface EventWithDetails {
  id: string;
  start_time: string;
  end_time: string;
  user_id: string;
  trainer_id: string;
  workout_id: string;
  user_data: UserData | null;
  trainers: TrainerData | null;
  workout: WorkoutTypeData | null;
}

// Для користувача
export const fetchEventsForUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      id,
      start_time,
      end_time,
      user_id,
      trainer_id,
      workout_id,
      user_data!user_id (
        user_name,
        user_email
      ),
      trainers!trainer_id (
        trainer_name
      ),
      workout!workout_id (
        workout_type
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error(
      "Помилка при завантаженні занять користувача:",
      error.message
    );
    return [];
  }

  return (data as any[]).map((e) => ({
    ...e,
    user_name: e.user_data?.user_name ?? "—",
    trainer_name: e.trainers?.trainer_name ?? "—",
    workout_type: e.workout?.workout_type ?? "—",
  }));
};

// Для тренера
export const fetchEventsForTrainer = async (trainerId: string) => {
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      id,
      start_time,
      end_time,
      user_id,
      trainer_id,
      workout_id,
      user_data!user_id (
        user_name,
        user_email
      ),
      trainers!trainer_id (
        trainer_name
      ),
      workout!workout_id (
        workout_type
      )
    `
    )
    .eq("trainer_id", trainerId);

  if (error) {
    console.error("Помилка при завантаженні занять тренера:", error.message);
    return [];
  }

  return (data as any[]).map((e) => ({
    ...e,
    user_name: e.user_data?.user_name ?? "—",
    trainer_name: e.trainers?.trainer_name ?? "—",
    workout_type: e.workout?.workout_type ?? "—",
  }));
};

// Для адміна - всі події з повною інформацією
export const fetchAllEventsWithDetails = async (startDate?: string, endDate?: string) => {
  let query = supabase
    .from("events")
    .select(
      `
      id,
      start_time,
      end_time,
      user_id,
      trainer_id,
      workout_id,
      user_data!user_id (
        user_name,
        user_email
      ),
      trainers!trainer_id (
        trainer_name
      ),
      workout!workout_id (
        workout_type
      )
    `
    );

  if (startDate) {
    query = query.gte("start_time", startDate);
  }
  if (endDate) {
    query = query.lt("start_time", endDate);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Помилка при завантаженні всіх подій:", error.message);
    return [];
  }

  return (data as any[]).map((e) => ({
    ...e,
    user_name: e.user_data?.user_name ?? "—",
    trainer_name: e.trainers?.trainer_name ?? "—",
    workout_type: e.workout?.workout_type ?? "—",
  }));
};
