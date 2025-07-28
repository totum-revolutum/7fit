import { create } from "zustand";
import {
  fetchTrainers,
  fetchWorkoutTypes,
  fetchEvents as fetchEventsFromAPI,
  createEvent,
  fetchUsers,
} from "../api/scheduleApi";
import { login, register, logout, getCurrentSession } from "../api/auth";

import useAuthStore from "../stores/authStore";

type Trainer = {
  trainer_id: string;
  trainer_name: string;
};

type WorkoutType = {
  workout_id: string;
  workout_type: string;
};

type User = {
  user_id: string;
  user_name: string;
  user_email: string;
  role?: string;
};

interface ScheduleState {
  trainers: Trainer[];
  workoutTypes: WorkoutType[];
  users: User[];
  events: any[];
  fetchOptions: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchEvents: (startDate?: string, endDate?: string) => Promise<void>;
  createNewEvent: (
    start: Date,
    end: Date,
    trainerId: string,
    workoutTypeId: string,
    userIdToUse?: string
  ) => Promise<void>;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  trainers: [],
  workoutTypes: [],
  users: [],
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

  fetchUsers: async () => {
    try {
      const u = await fetchUsers();
      set({ users: u });
    } catch (error) {
      console.error("Store fetchUsers error:", error);
    }
  },

  fetchEvents: async (startDate?: string, endDate?: string) => {
    try {
      const e = await fetchEventsFromAPI(startDate, endDate);
      set({ events: e });
    } catch (error) {
      console.error("Store fetchEvents error:", error);
    }
  },

  createNewEvent: async (start, end, trainerId, workoutTypeId, userIdToUse) => {
    try {
      const toISOLocal = (date: Date) => {
        const offset = date.getTimezoneOffset() * 60000; // мс у хвилині
        const localISOTime = new Date(date.getTime() - offset)
          .toISOString()
          .slice(0, -1);
        return localISOTime;
      };

      // Визначаємо user_id: пріоритет має userIdToUse, якщо він переданий
      let user_id: string;

      if (userIdToUse) {
        user_id = userIdToUse;
      } else {
        const user = useAuthStore.getState().user;
        if (!user?.id)
          throw new Error(
            "Користувач не авторизований та не вказаний userIdToUse"
          );
        user_id = user.id;
      }

      await createEvent({
        start_time: toISOLocal(start),
        end_time: toISOLocal(end),
        trainer_id: trainerId,
        workout_id: workoutTypeId,
        user_id: user_id, // Використовуємо визначений вище user_id
      });
    } catch (error) {
      console.error("Store createEvent error:", error);
      throw error;
    }
  },
}));
