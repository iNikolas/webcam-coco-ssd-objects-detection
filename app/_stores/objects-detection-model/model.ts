import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import { create } from "zustand";
import { version, load } from "@tensorflow-models/coco-ssd";
import type { ObjectDetection } from "@tensorflow-models/coco-ssd";

export const useObjectsDetectionModelStore = create<{
  instance: ObjectDetection | null;
  version: string;
  isLoading: boolean;
  error: string;
  load: () => Promise<void>;
  errorStateChanged: (error: string) => void;
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
  errorStateChanged: (error: string) => set({ error }),
}));

if (globalThis.window) {
  useObjectsDetectionModelStore.getState().load();
}
