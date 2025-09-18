import React from "react";

import { DetectedObject } from "@/app/_entities";
import { predict } from "@/app/_utils/helpers/model";
import { useModelQuery } from "@/app/_utils/hooks/queries";
import { useModelErrorStore } from "@/app/_stores/objects-detection-model";

export function usePredictionsState(video: HTMLVideoElement | null) {
  const [isReady, setIsReady] = React.useState(false);

  const [predictions, setPredictions] = React.useState<DetectedObject[]>([]);

  const { data: instance } = useModelQuery();
  const { errorStateChanged } = useModelErrorStore();

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

        const predictions = await predict({
          source: video,
          model: instance,
        });

        setPredictions(predictions);

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
