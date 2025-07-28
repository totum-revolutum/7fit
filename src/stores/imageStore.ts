import { create } from "zustand";
import { fetchAboutEmsImages } from "../api/storageApi";

export const useImageStore = create((set) => ({
  ems: [],

  fetchEmsImg: async () => {
    try {
      const images = await fetchAboutEmsImages();
      set({ ems: images });
    } catch (error) {
      console.error("Store fetchEmsImg error:", error);
    }
  },
}));

//wait
