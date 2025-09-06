"use client";

import React from "react";
import { X } from "lucide-react";

import { cn } from "@/app/_utils/helpers/common";

export function ClosableBlock({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [hidden, setHidden] = React.useState(false);
  if (hidden) {
    return null;
  }

  return (
    <div className={cn("relative", className)} {...props}>
      {children}
      <button
        type="button"
        className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
        onClick={() => setHidden(true)}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
