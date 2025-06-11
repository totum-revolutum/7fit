import { supabase } from "../lib/supabaseClient";

export const fetchTrainers = async () => {
  const { data, error } = await supabase
    .from("trainers")
    .select("trainer_id, trainer_name");

  if (error) throw error;
  console.log("Fetched trainers:", data);
  return data;
};

export const fetchWorkoutTypes = async () => {
  const { data, error } = await supabase.from("training_type").select("*");

  if (error) throw error;
  return data;
};

export const createEvent = async ({
  start_time,
  end_time,
  trainer_id,
  workout_type_id,
}: {
  start_time: string;
  end_time: string;
  trainer_id: string;
  workout_type_id: string;
}) => {
  const { data, error } = await supabase.from("events").insert([
    {
      start_time,
      end_time,
      trainer_id,
      workout_type_id,
    },
  ]);

  if (error) throw error;
  return data;
};
