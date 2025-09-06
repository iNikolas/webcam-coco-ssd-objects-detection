"use client";

import React from "react";
import ReactWebcam from "react-webcam";
import { Download, AlertCircle, CircleDot } from "lucide-react";

import { cn } from "@/app/_utils/helpers/common";
import { Range } from "@/app/_components/ui/range";
import { maxInactiveRecordingDurationSec } from "@/app/_config";
import { useRecordingDelayStore } from "@/app/_stores/predictions";
import { useUnsavedChangedConfirmation } from "@/app/_utils/hooks/common";

import { useRecordings } from "./utils";
import { RecordingPreview } from "./components";

export function Recordings({
  detections,
  webcam,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  detections: string[];
  webcam: ReactWebcam | null;
}) {
  const { delay, delayChanged } = useRecordingDelayStore();

  const {
    isSaving,
    isRecording,
    error,
    recordings,
    recordingTimestampRef,
    handleDownloadAll,
  } = useRecordings({
    webcam,
    isDetections: detections.length > 0,
    delaySec: delay,
  });

  useUnsavedChangedConfirmation(Object.values(recordings).length);

  return (
    <section className={cn("flex flex-col gap-4", className)} {...props}>
      {!!error && (
        <p role="alert" className="alert alert-error flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </p>
      )}

      {isRecording && (
        <p className="flex items-center gap-2 text-error font-medium">
          <CircleDot className="w-4 h-4 animate-pulse" />
          Recording in progress...
        </p>
      )}

      <Range
        min={1}
        max={maxInactiveRecordingDurationSec}
        step={1}
        value={delay}
        onChange={(e) => delayChanged(Number(e.target.value))}
        withMarks
      >
        Delay is seconds before recording will stop:
      </Range>

      {Object.values(recordings).length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
            {Object.values(recordings).map(({ chunk, timestamp }) => {
              const url = URL.createObjectURL(chunk);
              const isActive =
                timestamp === recordingTimestampRef.current && isRecording;

              return (
                <RecordingPreview
                  key={timestamp}
                  url={url}
                  isActive={isActive}
                  timestamp={timestamp}
                />
              );
            })}
          </div>

          <button
            disabled={isSaving}
            type="button"
            className="btn btn-primary"
            onClick={handleDownloadAll}
          >
            {isSaving ? (
              <>
                <span className="loading loading-spinner" /> Saving...
              </>
            ) : (
              <>
                <Download /> Download All
              </>
            )}
          </button>
        </>
      )}
    </section>
  );
}
