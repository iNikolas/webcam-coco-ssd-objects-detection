import React from "react";
import { DetectedObject } from "@tensorflow-models/coco-ssd";

import { useObjectsDetectionModelStore } from "@/app/_stores/objects-detection-model";

export function usePredictionsState(video: HTMLVideoElement | null) {
  const [isReady, setIsReady] = React.useState(false);

  const [predictions, setPredictions] = React.useState<DetectedObject[]>([]);

  const { instance, errorStateChanged } = useObjectsDetectionModelStore();

  React.useEffect(() => {
    if (!isReady || !instance) {
      return;
    }

    let isActive = true;

    const classifyLoop = async () => {
      try {
        if (!video) {
          throw new Error("Webcam video not available");
        }

        const result = await instance.detect(video);

        setPredictions(result);
        errorStateChanged("");
      } catch (error) {
        errorStateChanged(
          error instanceof Error ? error.message : JSON.stringify(error)
        );
      }

      if (isActive) {
        window.requestAnimationFrame(classifyLoop);
      }
    };

    classifyLoop();

    return () => {
      isActive = false;
    };
  }, [errorStateChanged, instance, isReady, video]);

  return { predictions, onWebcamReady: () => setIsReady(true) };
}
