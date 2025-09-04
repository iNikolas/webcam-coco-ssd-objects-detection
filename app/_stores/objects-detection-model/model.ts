import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import { create } from "zustand";
import { version, load } from "@tensorflow-models/mobilenet";
import type { MobileNet } from "@tensorflow-models/mobilenet";

export const useObjectsDetectionModelStore = create<{
  instance: MobileNet | null;
  version: string;
  isLoading: boolean;
  error: string;
  load: () => Promise<void>;
}>((set, get) => ({
  instance: null,
  version,
  isLoading: false,
  error: "",
  load: async () => {
    if (get().isLoading) {
      return;
    }

    set({ isLoading: true, error: "", instance: null });

    try {
      const instance = await load();
      set({ instance });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : JSON.stringify(error),
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

useObjectsDetectionModelStore.getState().load();
