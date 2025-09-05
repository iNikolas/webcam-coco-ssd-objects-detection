"use client";

import React from "react";
import ReactWebcam from "react-webcam";

import { cn } from "@/app/_utils/helpers/common";

import { Webcam } from "../../ui/webcam";
import { usePredictionsState } from "./utils";
import { Predictions } from "./components/predictions";
import { PredictionsList } from "./components/predictions-list";
import { ObjectsMultiselect } from "../objects-multiselect";
import { useSelectedPredictionsStore } from "@/app/_stores/predictions/model";

export function PredictWebcam({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { values, setValues } = useSelectedPredictionsStore();
  const [selectedPredictionIdx, setSelectedPredictionIdx] = React.useState<
    number | null
  >(null);
  const [webcam, setWebcam] = React.useState<ReactWebcam | null>(null);

  const { predictions, onWebcamReady } = usePredictionsState(
    webcam?.video ?? null
  );

  return (
    <div className={cn("grid grid-cols-6 gap-4 py-4", className)} {...props}>
      <div className="col-span-6">
        <ObjectsMultiselect
          value={values}
          onChange={(values) => setValues(values.map((v) => v.value))}
        />
      </div>
      <section className="relative col-span-6 md:col-span-4">
        <Webcam ref={setWebcam} onLoadedData={onWebcamReady} />
        <Predictions
          importantGroups={values}
          highlightedPredictionIdx={selectedPredictionIdx}
          predictions={predictions}
          videoDimensions={{
            width: webcam?.video?.videoWidth ?? 0,
            height: webcam?.video?.videoHeight ?? 0,
          }}
        />
      </section>
      <PredictionsList
        className="w-full col-span-6 md:col-span-2"
        predictions={predictions}
        highlightedPredictionIdx={selectedPredictionIdx}
        onSelectedPrediction={setSelectedPredictionIdx}
      />
    </div>
  );
}
