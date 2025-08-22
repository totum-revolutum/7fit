import { create } from "zustand";
import type { PriceItem, NewPriceItem } from "@api/prices";
import * as api from "@api/prices";

type PricesState = {
  prices: PriceItem[];
  loading: boolean;
  error: string | null;

  fetchPrices: () => Promise<void>;
  addPrice: (item: NewPriceItem) => Promise<void>;
  updatePrice: (id: number, patch: Partial<NewPriceItem>) => Promise<void>;
  deletePrice: (id: number) => Promise<void>;
};

export const usePricesStore = create<PricesState>((set, get) => ({
  prices: [],
  loading: false,
  error: null,

  fetchPrices: async () => {
    set({ loading: true, error: null });
    try {
      const data = await api.getPrices();
      set({ prices: data });
    } catch (e: any) {
      set({ error: e.message || "Не вдалося завантажити ціни" });
    } finally {
      set({ loading: false });
    }
  },

  addPrice: async (item) => {
    try {
      const created = await api.addPrice(item);
      set({ prices: [created, ...get().prices] });
    } catch (e: any) {
      set({ error: e.message || "Помилка додавання" });
    }
  },

  updatePrice: async (id, patch) => {
    try {
      const updated = await api.updatePrice(id, patch);
      set({
        prices: get().prices.map((p) => (p.id === id ? updated : p)),
      });
    } catch (e: any) {
      set({ error: e.message || "Помилка оновлення" });
    }
  },

  deletePrice: async (id) => {
    try {
      await api.deletePrice(id);
      set({ prices: get().prices.filter((p) => p.id !== id) });
    } catch (e: any) {
      set({ error: e.message || "Помилка видалення" });
    }
  },
}));
