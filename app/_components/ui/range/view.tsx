import React from "react";

import { cn } from "@/app/_utils/helpers/common";

import { handleErrors } from "./utils";

export function Range({
  className,
  withMarks = false,
  children,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { withMarks?: boolean }) {
  const min = Number(props.min);
  const max = Number(props.max);
  const step = Number(props.step);

  const range = max - min;
  const steps = withMarks ? 1 + range / step : 0;

  handleErrors({ min, max, step, withMarks, range });

  return (
    <label className={cn("w-full max-w-xs", className)}>
      <span className="text-sm">{children}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        className="range range-xs"
        {...props}
      />
      {!!steps && (
        <div className="flex justify-between px-0.5 mt-1 text-xs">
          {Array.from({ length: steps })
            .fill(null)
            .map((_, i) => (
              <span key={i}>{min + i * step}</span>
            ))}
        </div>
      )}
    </label>
  );
}
