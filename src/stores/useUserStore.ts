import { create } from "zustand";
import { fetchUsers } from "@/api/userApi";

interface User {
  user_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
}

interface UserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const users = await fetchUsers();
      set({ users });
    } catch (error) {
      console.error("User store fetchUsers error:", error);
    }
  },
}));
