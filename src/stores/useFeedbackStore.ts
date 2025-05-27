import { create } from "zustand";

interface FeedbackState {
  name: string;
  phone: string;
  errors: {
    name?: string;
    phone?: string;
  };
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setErrors: (errors: { name?: string; phone?: string }) => void;
  reset: () => void;
  validate: () => boolean;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  name: "",
  phone: "",
  errors: {},
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setErrors: (errors) => set({ errors }),
  reset: () => set({ name: "", phone: "", errors: {} }),
  validate: () => {
    const errors: { name?: string; phone?: string } = {};
    const { name, phone } = get();

    if (!name.trim()) {
      errors.name = "Будь ласка, введіть ім'я.";
    }

    const phoneRegex = /^\+380\d{9}$/;
    if (!phone.trim()) {
      errors.phone = "Будь ласка, введіть номер телефону.";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Номер телефону має бути у форматі +380*********";
    }

    set({ errors });
    return Object.keys(errors).length === 0;
  },
}));
