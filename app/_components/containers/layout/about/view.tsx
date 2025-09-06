import React from "react";

import { cn } from "@/app/_utils/helpers/common";

export function About({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <article
      className={cn(
        "prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto my-4",
        className
      )}
      {...props}
    >
      <p>
        Our web-based app uses advanced AI (powered by TensorFlow.js and the
        COCO-SSD model) to detect objects directly in your browser — no
        installations required.
      </p>

      <ul>
        <li>
          📷 Camera Flexibility: Works with your computer’s webcam or your
          mobile device’s front and rear cameras.
        </li>

        <li>
          🎯 Custom Object Tracking: Choose from 80+ object categories (like
          person, car, dog, laptop) and record only what matters to you.
        </li>

        <li>
          🔴 Automatic Recording: Video recording starts as soon as selected
          objects appear in the frame, and stops after a short delay when
          they’re gone.
        </li>

        <li>
          📂 Preview & Download: Review all saved recordings in the app and
          download them instantly for future use.
        </li>

        <li>
          ⚡ Private & Secure: Everything runs locally in your browser — no data
          leaves your device.
        </li>
      </ul>
      <p>
        🚀Perfect for developers, researchers, educators, or anyone who needs
        intelligent, real-time video object detection and recording.
      </p>
    </article>
  );
}
