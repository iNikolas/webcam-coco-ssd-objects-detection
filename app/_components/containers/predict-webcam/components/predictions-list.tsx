"use client";

import React from "react";
import { Heart } from "lucide-react";
import { DetectedObject } from "@tensorflow-models/coco-ssd";

import { capitalizeWords, cn } from "@/app/_utils/helpers/common";
import { useSelectedPredictionsStore } from "@/app/_stores/predictions";

export function PredictionsList({
  className,
  predictions,
  highlightedPredictionIdx,
  onSelectedPrediction,
  ...props
}: React.HTMLAttributes<HTMLUListElement> & {
  predictions: DetectedObject[];
  highlightedPredictionIdx?: number | null;
  onSelectedPrediction?: (prediction: number | null) => void;
}) {
  const { values, setValues } = useSelectedPredictionsStore();

  return (
    <ul
      className={cn("list bg-base-100 rounded-box shadow-md", className)}
      onPointerLeave={() => onSelectedPrediction?.(null)}
      onMouseLeave={() => onSelectedPrediction?.(null)}
      {...props}
    >
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Predictions list:
      </li>

      {predictions.map((prediction, idx) => {
        const isHighlighted = values.includes(prediction.class);

        return (
          <li
            className={cn(
              "list-row [&:hover_.text-block]:text-success",
              idx === highlightedPredictionIdx && "[&_.text-block]:text-success"
            )}
            key={`${prediction.class}-${idx}`}
            onPointerOver={() => onSelectedPrediction?.(idx)}
            onPointerLeave={() => onSelectedPrediction?.(null)}
            onMouseOver={() => onSelectedPrediction?.(idx)}
            onMouseLeave={() => onSelectedPrediction?.(null)}
          >
            <div />
            <div className="text-block">
              <p className="font-semibold">
                {capitalizeWords(prediction.class)}
              </p>
              <p className="text-xs uppercase font-semibold opacity-60">
                Confidence: {Math.round(prediction.score * 100)}%
              </p>
            </div>

            <button
              onClick={() =>
                setValues(
                  isHighlighted
                    ? values.filter((v) => v !== prediction.class)
                    : [...values, prediction.class]
                )
              }
              className="btn btn-square btn-ghost"
            >
              <Heart
                className={cn(
                  isHighlighted && "text-error [&_path]:fill-error"
                )}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
