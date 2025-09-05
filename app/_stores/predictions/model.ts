import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSelectedPredictionsStore = create(
  persist<{
    values: string[];
    setValues: (values: string[]) => void;
  }>(
    (set) => ({
      values: [],
      setValues: (values: string[]) => set({ values }),
    }),
    {
      name: "selected-predictions-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
