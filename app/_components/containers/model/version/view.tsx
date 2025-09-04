"use client";

import React from "react";

import { useObjectsDetectionModelStore } from "@/app/_stores/objects-detection-model";

export function ModelVersion({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { version } = useObjectsDetectionModelStore();

  return (
    <span {...props}>
      {children}
      {version}
    </span>
  );
}
