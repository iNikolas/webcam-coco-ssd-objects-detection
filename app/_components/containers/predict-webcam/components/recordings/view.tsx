import { Download } from "lucide-react";
import React from "react";
import ReactWebcam from "react-webcam";

export function Recordings({
  capturing,
  webcam,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  capturing: boolean;
  webcam: ReactWebcam;
}) {
  const webcamRef = React.useRef(webcam);
  const mediaRecorderRef = React.useRef<MediaRecorder>(null);
  const [recordedChunks, setRecordedChunks] = React.useState<Blob[]>([]);

  React.useLayoutEffect(() => {
    webcamRef.current = webcam;
  }, [webcam]);

  const handleDataAvailable = React.useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = React.useCallback(() => {
    const stream = webcamRef.current.stream;

    if (!stream) {
      return;
    }

    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [handleDataAvailable]);

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <section {...props}>
      {recordedChunks.length > 0 && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDownload}
        >
          <Download />
          Download
        </button>
      )}
    </section>
  );
}
