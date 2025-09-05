"use client";

import React from "react";
import { AlertCircle, CheckCircle2, RefreshCw, X } from "lucide-react";
import { useObjectsDetectionModelStore } from "@/app/_stores/objects-detection-model";

import { useHiddenState } from "./utils";

export function ModelStatus({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const [hidden, setHidden] = useHiddenState();

  const { isLoading, error, instance, load } = useObjectsDetectionModelStore();

  if (hidden && !error) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4" {...props}>
      {isLoading && (
        <div className="alert alert-info">
          <span className="loading loading-spinner" />
          <span>Loading model...</span>
        </div>
      )}

      {error && (
        <>
          <div role="alert" className="alert alert-error">
            <AlertCircle />
            <span>{error}</span>
          </div>
          {!instance && (
            <button
              type="button"
              className="btn btn-soft btn-block btn-sm btn-primary"
              onClick={load}
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          )}
        </>
      )}

      {instance && !isLoading && !error && (
        <div className="alert alert-success flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Model loaded successfully!</span>
          </div>
          <button
            type="button"
            onClick={() => setHidden(true)}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
