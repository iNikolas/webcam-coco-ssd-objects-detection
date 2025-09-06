import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { maxInactiveRecordingDurationSec } from "@/app/_config";

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

export const useRecordingDelayStore = create(
  persist<{
    delay: number;
    delayChanged: (delay: number) => void;
  }>(
    (set) => ({
      delay: Math.ceil(maxInactiveRecordingDurationSec / 2),
      delayChanged: (delay: number) => set({ delay }),
    }),
    {
      name: "recording-delay-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
