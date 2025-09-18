"use client";

import React from "react";
import * as tf from "@tensorflow/tfjs";

import { cn } from "@/app/_utils/helpers/common";

export function MemoryUsage({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [memory, setMemory] = React.useState<tf.MemoryInfo | null>(null);

  React.useEffect(() => {
    const update = () => setMemory(tf.memory());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={cn("p-4", className)} {...props}>
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">TensorFlow.js Memory</h2>

          {memory ? (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-bold">Tensors:</span> {memory.numTensors}
              </div>
              <div>
                <span className="font-bold">Bytes:</span>{" "}
                {(memory.numBytes / 1024 / 1024).toFixed(2)} MB
              </div>
              <div>
                <span className="font-bold">Data Buffers:</span>{" "}
                {memory.numDataBuffers}
              </div>
              <div>
                <span className="font-bold">Unreliable?:</span>{" "}
                {memory.unreliable ? "Yes" : "No"}
              </div>
              {"numBytesInGPU" in memory &&
                typeof memory.numBytesInGPU === "number" && (
                  <div className="col-span-2">
                    <span className="font-bold">GPU Bytes:</span>{" "}
                    {(memory.numBytesInGPU / 1024 / 1024).toFixed(2)} MB
                  </div>
                )}
            </div>
          ) : (
            <p className="text-neutral-content">Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
}
