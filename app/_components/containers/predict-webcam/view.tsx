"use client";

import React from "react";
import ReactWebcam from "react-webcam";
import { isMobile } from "react-device-detect";

import { cn } from "@/app/_utils/helpers/common";
import { useSelectedPredictionsStore } from "@/app/_stores/predictions/model";

import { CameraType } from "./types";
import { cameraTypes } from "./config";
import { Webcam } from "../../ui/webcam";
import { Select } from "../../ui/select";
import { usePredictionsState } from "./utils";
import { Predictions } from "./components/predictions";
import { ObjectsMultiselect } from "../objects-multiselect";
import { PredictionsList } from "./components/predictions-list";

export function PredictWebcam({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [preferredCamera, setPreferredCamera] = React.useState<CameraType>(
    cameraTypes.main
  );
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
      <div className="col-span-6 flex flex-col gap-3">
        <ObjectsMultiselect
          label="Important objects that will be highlighted:"
          value={values}
          onChange={(values) =>
            Array.isArray(values) && setValues(values.map((v) => v.value))
          }
        />
        {isMobile && (
          <Select
            label="Device camera source:"
            value={preferredCamera}
            options={Object.values(cameraTypes)}
            isClearable={false}
            onChange={(type) =>
              setPreferredCamera(Array.isArray(type) ? type[0] : type)
            }
          />
        )}
      </div>
      <section className="relative col-span-6 md:col-span-4">
        <Webcam
          ref={setWebcam}
          onLoadedData={onWebcamReady}
          {...(isMobile && {
            videoConstraints: { facingMode: preferredCamera.value },
          })}
        />
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
