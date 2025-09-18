import React from "react";
import { DetectedObject } from "@tensorflow-models/coco-ssd";

import { useObjectsDetectionModelStore } from "@/app/_stores/objects-detection-model";
import { predict } from "@/app/_utils/helpers/common";
import { useModelQuery } from "@/app/_utils/hooks/queries";

export function usePredictionsState(video: HTMLVideoElement | null) {
  const [isReady, setIsReady] = React.useState(false);

  const [predictions, setPredictions] = React.useState<DetectedObject[]>([]);

  const { data: instance } = useModelQuery();
  const { errorStateChanged } = useObjectsDetectionModelStore();

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

        await predict({
          source: video,
          model: instance,
          onSuccess: () => {
            console.log("onSuccess");
          },
        });

        errorStateChanged("");
      } catch (error) {
        console.log(error);
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
