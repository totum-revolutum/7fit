import { create } from "zustand";
import {
  fetchTrainers,
  fetchWorkoutTypes,
  fetchEvents as fetchEventsFromAPI,
  createEvent,
} from "@/api/scheduleApi";
import { login, register, logout, getCurrentSession } from "../api/auth";

import useAuthStore from "@/stores/authStore";

type Trainer = {
  trainer_id: string;
  trainer_name: string;
};

type WorkoutType = {
  workout_id: string;
  workout_type: string;
};

interface ScheduleState {
  trainers: Trainer[];
  workoutTypes: WorkoutType[];
  events: any[];
  fetchOptions: () => Promise<void>;
  fetchEvents: (workoutTypeId?: string) => Promise<void>;
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
  events: [],

  fetchOptions: async () => {
    try {
      const t = await fetchTrainers();
      const w = await fetchWorkoutTypes();
      set({ trainers: t, workoutTypes: w });
    } catch (error) {
      console.error("Store fetchOptions error:", error);
    }
  },

  fetchEvents: async (workoutTypeId?: string) => {
    try {
      const e = await fetchEventsFromAPI(workoutTypeId);
      set({ events: e });
    } catch (error) {
      console.error("Store fetchEvents error:", error);
    }
  },

  createNewEvent: async (start, end, trainerId, workoutTypeId) => {
    try {
      const user = useAuthStore.getState().user;
      if (!user?.id) throw new Error("Користувач не авторизований");

      const toISOLocal = (date: Date) => {
        const offset = date.getTimezoneOffset() * 60000; // мс у хвилині
        const localISOTime = new Date(date.getTime() - offset)
          .toISOString()
          .slice(0, -1);
        return localISOTime;
      };
      console.log("start", start.toISOString());
      await createEvent({
        start_time: toISOLocal(start),
        end_time: toISOLocal(end),
        trainer_id: trainerId,
        workout_id: workoutTypeId,
        user_id: user.id,
      });
    } catch (error) {
      console.error("Store createEvent error:", error);
      throw error;
    }
  },
}));
