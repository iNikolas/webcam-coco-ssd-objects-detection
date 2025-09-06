import React from "react";
import { format } from "date-fns";

import { cn } from "@/app/_utils/helpers/common";

import { videoMimeType } from "../../../../../../_config";

export function RecordingPreview({
  isActive = false,
  timestamp,
  className,
  url,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  timestamp: number;
  isActive?: boolean;
  url: string;
}) {
  return (
    <section
      className={cn("flex flex-col items-start gap-1", className)}
      {...props}
    >
      <video
        className={cn(
          "rounded-xl shadow-lg w-full h-40 object-cover cursor-pointer border-2",
          isActive && "border-error"
        )}
        onMouseEnter={(e) => e.currentTarget.play()}
        onMouseLeave={(e) => {
          e.currentTarget.pause();
          e.currentTarget.currentTime = 0;
        }}
        muted
        loop
      >
        <source src={url} type={videoMimeType} />
        I&apos;m sorry; your browser doesn&apos;t support HTML5 video.
      </video>
      <span className="text-xs text-gray-500">
        {format(new Date(timestamp), "PPpp")}
      </span>
    </section>
  );
}
