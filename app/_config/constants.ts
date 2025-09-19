import { supportedModels } from "@/app/_apis";
import type { ModelMeta } from "@/app/_entities";
import type { SupportedModel } from "@/app/_apis";

export const videoMimeType = "video/webm";

export const predictionsPerImage = 10;

export const maxInactiveRecordingDurationSec = 10;

export const confidenceMinThreshold = 0.5;

export const intersectionOverUnionThreshold = 0.5;

export const modelsMap: Record<SupportedModel, ModelMeta> = {
  [supportedModels.nano]: {
    value: supportedModels.nano,
    label: "YOLOv11 Nano",
    description:
      "Ultra-lightweight, fastest in the browser, best for real-time tests but lower accuracy.",
  },
  [supportedModels.small]: {
    value: supportedModels.small,
    label: "YOLOv11 Small",
    description:
      "Balanced choice for browsers — good mix of speed and accuracy, suitable for most use cases.",
  },
  [supportedModels.medium]: {
    value: supportedModels.medium,
    label: "YOLOv11 Medium",
    description:
      "Higher accuracy, but heavier for browsers — may lag on weaker devices, best for testing quality.",
  },
  [supportedModels.large]: {
    value: supportedModels.large,
    label: "YOLOv11 Large",
    description:
      "High accuracy, very heavy in the browser — mainly for testing, not practical for production.",
  },
  [supportedModels.xlarge]: {
    value: supportedModels.xlarge,
    label: "YOLOv11 XLarge",
    description:
      "Maximum accuracy, extremely resource-intensive — fun for testing limits, unrealistic for production.",
  },
};
