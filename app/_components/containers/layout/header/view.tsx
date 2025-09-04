import React from "react";

import { cn } from "@/app/_utils/helpers/common";

export function Header({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("navbar bg-base-100 shadow-sm", className)}
      {...props}
    >
      <div className="flex-1">
        <h2 className="font-semibold text-xl">Object Detection Model</h2>
      </div>
      <div className="flex-none">{children}</div>
    </header>
  );
}
