import { create } from "zustand";
import {
  fetchTrainers,
  fetchWorkoutTypes,
  createEvent,
} from "@/api/scheduleApi";

type Trainer = {
  id: string;
  full_name: string;
};

type WorkoutType = {
  id: string;
  name: string;
};

interface ScheduleState {
  trainers: Trainer[];
  workoutTypes: WorkoutType[];
  fetchOptions: () => Promise<void>;
  createNewEvent: (
    start: Date,
    end: Date,
    trainerId: string,
    workoutTypeId: string
  ) => Promise<void>;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  trainers: [],
  workoutTypes: [],
  fetchOptions: async () => {
    try {
      const t = await fetchTrainers();
      const w = await fetchWorkoutTypes();
      set({ trainers: t, workoutTypes: w });
    } catch (error) {
      console.error("Store fetchOptions error:", error);
    }
  },
  createNewEvent: async (start, end, trainerId, workoutTypeId) => {
    try {
      await createEvent({
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        trainer_id: trainerId,
        workout_type_id: workoutTypeId,
      });
    } catch (error) {
      console.error("Store createEvent error:", error);
      throw error;
    }
  },
}));
