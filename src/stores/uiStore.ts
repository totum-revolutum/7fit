import { create } from "zustand";

interface UIState {
  showLogin: boolean;
  openLogin: () => void;
  closeLogin: () => void;
}

const useUIStore = create<UIState>((set) => ({
  showLogin: false,
  openLogin: () => set({ showLogin: true }),
  closeLogin: () => set({ showLogin: false }),
}));

export default useUIStore;
