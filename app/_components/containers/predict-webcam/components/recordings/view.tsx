"use client";

import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ReactWebcam from "react-webcam";
import { useDebouncedCallback } from "use-debounce";
import { Download, AlertCircle, CircleDot } from "lucide-react";

import { cn } from "@/app/_utils/helpers/common";

export function Recordings({
  detections,
  webcam,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  detections: string[];
  webcam: ReactWebcam | null;
}) {
  const webcamRef = React.useRef(webcam);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const recordingTimestampRef = React.useRef<number | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder>(null);

  const [recordings, setRecordings] = React.useState<
    Record<string, { chunk: Blob; timestamp: number }>
  >({});

  React.useLayoutEffect(() => {
    webcamRef.current = webcam;
  }, [webcam]);

  const handleDataAvailable = React.useCallback(({ data }: BlobEvent) => {
    if (!data.size) {
      return;
    }

    const timestamp = recordingTimestampRef.current?.toString() ?? "unknown";

    setRecordings((prev) => ({
      ...prev,
      [timestamp]: {
        chunk: data,
        timestamp: recordingTimestampRef.current ?? 0,
      },
    }));
  }, []);

  const handleStartCapture = React.useCallback(() => {
    const stream = webcamRef.current?.stream;

    if (!stream) {
      setError("Webcam stream is not available.");
      return;
    }

    try {
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      recordingTimestampRef.current = Date.now();

      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    } catch (err) {
      setError(
        `Error starting recording: ${
          err instanceof Error ? err.message : JSON.stringify(err)
        }`
      );
    }
  }, [handleDataAvailable]);

  const handleStopCapture = React.useCallback(() => {
    try {
      mediaRecorderRef.current?.stop();
    } catch (err) {
      setError(
        `Error stopping recording: ${
          err instanceof Error ? err.message : JSON.stringify(err)
        }`
      );
    }
  }, []);

  const handleDownloadAll = React.useCallback(async () => {
    const keys = Object.keys(recordings);
    if (!keys.length) return;

    const zip = new JSZip();
    keys.forEach((key) => {
      const { chunk, timestamp } = recordings[key];
      zip.file(`recording-${new Date(timestamp).toISOString()}.webm`, chunk);
    });

    try {
      setIsSaving(true);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "recordings.zip");
      setRecordings({});
    } catch (err) {
      setError(
        `Error generating zip file: ${
          err instanceof Error ? err.message : JSON.stringify(err)
        }`
      );
    } finally {
      setIsSaving(false);
    }
  }, [recordings]);

  const isDetections = detections.length > 0;

  const debouncedStopRecording = useDebouncedCallback(() => {
    setIsRecording(false);
    handleStopCapture();
  }, 5000);

  React.useEffect(() => {
    if (isDetections && !isRecording) {
      setIsRecording(true);
      handleStartCapture();
    }
  }, [handleStartCapture, isDetections, isRecording]);

  React.useEffect(() => {
    if (isRecording && !isDetections) {
      debouncedStopRecording();
      return;
    }
    debouncedStopRecording.cancel();
  }, [debouncedStopRecording, isDetections, isRecording]);

  return (
    <section {...props} className={cn("flex flex-col gap-4", className)}>
      {error && (
        <div role="alert" className="alert alert-error flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {isRecording && (
        <div className="flex items-center gap-2 text-red-600 font-medium">
          <CircleDot className="w-4 h-4 animate-pulse" />
          Recording in progress...
        </div>
      )}

      {Object.values(recordings).length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
            {Object.values(recordings).map(({ chunk, timestamp }) => {
              const url = URL.createObjectURL(chunk);
              const isActive = timestamp === recordingTimestampRef.current;

              return (
                <video
                  key={timestamp}
                  className={cn(
                    "rounded-xl shadow-lg w-full h-40 object-cover cursor-pointer border-2",
                    isActive && "border-error"
                  )}
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                  muted
                  loop
                >
                  <source src={url} type="video/webm" />
                  I&apos;m sorry; your browser doesn&apos;t support HTML5 video.
                </video>
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
