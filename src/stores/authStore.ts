import { create } from "zustand";
import { login, register, logout, getCurrentSession } from "../api/auth";
import { fetchUserRole } from "../api/user";
import { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  role: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await login(email, password);
    const user = data?.user ?? null;
    const session = data?.session ?? null;
    const role = user ? await fetchUserRole(user.id) : null;

    if (error) {
      console.error("Login error:", error.message);
    }

    set({
      user,
      session,
      role,
      loading: false,
      error: error?.message ?? null,
    });
  },

  register: async (email, password) => {
    set({ loading: true, error: null });

    const { data, error } = await register(email, password);

    if (error) {
      console.error("Registration error:", error.message);
      set({ error: error.message, loading: false });
      return;
    }

    if (data?.session && data?.user) {
      set({
        user: data.user,
        session: data.session,
        loading: false,
        error: null,
      });
      return;
    }

    // fallback: get current session manually
    const session = await getCurrentSession();

    if (session?.user) {
      set({ user: session.user, session, loading: false, error: null });
    } else {
      set({
        loading: false,
        error: "Не вдалося автоматично увійти після реєстрації.",
      });
    }
  },

  logout: async () => {
    await logout();
    set({ user: null, session: null });
  },

  getCurrentUser: async () => {
    const session = await getCurrentSession();
    const user = session?.user ?? null;
    const role = user ? await fetchUserRole(user.id) : null;

    set({ user, session, role });
  },
}));

export default useAuthStore;
