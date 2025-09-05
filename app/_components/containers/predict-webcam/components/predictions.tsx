"use client";

import React from "react";
import useMeasure from "react-use-measure";
import { DetectedObject } from "@tensorflow-models/coco-ssd";

import { capitalizeWords, cn } from "@/app/_utils/helpers/common";

export function Predictions({
  className,
  predictions,
  videoDimensions,
  highlightedPredictionIdx,
  importantGroups,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  predictions: DetectedObject[];
  videoDimensions: { width: number; height: number };
  highlightedPredictionIdx?: number | null;
  importantGroups?: string[];
}) {
  const [ref, bounds] = useMeasure();

  const scaleX = bounds.width / videoDimensions.width;
  const scaleY = bounds.height / videoDimensions.height;

  return (
    <section
      ref={ref}
      className={cn("absolute inset-0 pointer-events-none", className)}
      {...props}
    >
      {predictions.map((prediction, idx) => {
        const [x, y, width, height] = prediction.bbox;

        return (
          <div
            key={`${prediction.class}-${idx}`}
            className={cn(
              "absolute border-2 border-primary rounded-md bg-primary/10",
              highlightedPredictionIdx === idx &&
                "border-success bg-success/20",
              importantGroups?.includes(prediction.class) &&
                "border-error bg-error/20"
            )}
            style={{
              left: `${x * scaleX}px`,
              top: `${y * scaleY}px`,
              width: `${width * scaleX}px`,
              height: `${height * scaleY}px`,
            }}
          >
            <span
              className={cn(
                "absolute -top-6 left-0 bg-primary text-primary-content text-xs font-semibold px-2 py-1 rounded",
                highlightedPredictionIdx === idx &&
                  "bg-success text-success-content",
                importantGroups?.includes(prediction.class) &&
                  "bg-error text-base-content"
              )}
            >
              {capitalizeWords(prediction.class)} (
              {Math.round(prediction.score * 100)}%)
            </span>
          </div>
        );
      })}
    </section>
  );
}
