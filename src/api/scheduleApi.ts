import { supabase } from "../lib/supabaseClient";

export const fetchTrainers = async () => {
  const { data, error } = await supabase
    .from("trainers")
    .select("trainer_id, trainer_name");

  if (error) throw error;
  return data;
};

export const fetchWorkoutTypes = async () => {
  const { data, error } = await supabase.from("workout").select("*");

  if (error) throw error;
  return data;
};

export const fetchEvents = async (workoutTypeId?: string) => {
  let query = supabase.from("events").select("*");
  if (workoutTypeId) {
    query = query.eq("workout_id", workoutTypeId);
  }

  const { data, error } = await query;
  console.log("data", data);

  if (error) {
    console.error("Помилка при отриманні подій:", error);
    throw error;
  }

  return data;
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
