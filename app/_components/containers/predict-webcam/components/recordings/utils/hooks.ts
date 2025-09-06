"use client";

import React from "react";
import JSZip from "jszip";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import ReactWebcam from "react-webcam";
import { useDebouncedCallback } from "use-debounce";

import { videoMimeType } from "@/app/_config";

export function useRecordings({
  webcam,
  isDetections,
  delaySec,
}: {
  webcam: ReactWebcam | null;
  isDetections: boolean;
  delaySec: number;
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
        mimeType: videoMimeType,
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
      zip.file(`recording-${format(new Date(timestamp), "PPpp")}.webm`, chunk);
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

  const debouncedStopRecording = useDebouncedCallback(() => {
    setIsRecording(false);
    handleStopCapture();
  }, delaySec * 1000);

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

  return {
    isSaving,
    isRecording,
    error,
    recordings,
    recordingTimestampRef,
    handleDownloadAll,
  };
}
