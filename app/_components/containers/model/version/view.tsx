import React from "react";

export function ModelVersion({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props}>
      {children}
      YOLO11l
    </span>
  );
}
