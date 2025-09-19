import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { supportedModels } from "@/app/_apis";
import type { SupportedModel } from "@/app/_apis";

export const useModelErrorStore = create<{
  error: string;
  errorStateChanged: (error: string) => void;
}>((set) => ({
  error: "",
  errorStateChanged: (error: string) => set({ error }),
}));

export const useSelectedModelStore = create(
  persist<{
    model: SupportedModel;
    modelChanged: (model: SupportedModel) => void;
  }>(
    (set) => ({
      model: supportedModels.small,
      modelChanged: (model) => set({ model }),
    }),
    {
      name: "selected-model-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
