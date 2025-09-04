"use client";

import ReactWebcam, { WebcamProps } from "react-webcam";

import { cn } from "@/app/_utils/helpers/common";

export function Webcam({ className, ...props }: Partial<WebcamProps>) {
  return (
    <ReactWebcam
      className={cn("max-w-2xl w-full aspect-video bg-neutral", className)}
      {...props}
    />
  );
}
