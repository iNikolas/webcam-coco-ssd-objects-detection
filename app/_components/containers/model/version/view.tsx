"use client";

import React from "react";

import { modelsMap } from "@/app/_config";
import { useSelectedModelStore } from "@/app/_stores/objects-detection-model";

export function ModelVersion({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { model } = useSelectedModelStore();
  return (
    <span {...props}>
      {children}
      {modelsMap[model].label}
    </span>
  );
}
