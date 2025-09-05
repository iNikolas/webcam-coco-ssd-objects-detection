"use client";

import ReactWebcam, { WebcamProps } from "react-webcam";

import { cn } from "@/app/_utils/helpers/common";

export function Webcam({
  className,
  ...props
}: React.RefAttributes<ReactWebcam> & Partial<WebcamProps>) {
  return (
    <ReactWebcam className={cn("w-full bg-neutral", className)} {...props} />
  );
}
