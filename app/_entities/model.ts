import type { SupportedModel } from "@/app/_apis";

export interface DetectedObject {
  bbox: [number, number, number, number];
  class: string;
  score: number;
}

export interface ModelMeta {
  value: SupportedModel;
  label: string;
  description: string;
}
