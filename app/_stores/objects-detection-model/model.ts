import { create } from "zustand";

export const useModelErrorStore = create<{
  error: string;
  errorStateChanged: (error: string) => void;
}>((set) => ({
  error: "",
  errorStateChanged: (error: string) => set({ error }),
}));
