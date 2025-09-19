"use client";

import React from "react";
import { components } from "react-select";

import { modelsMap } from "@/app/_config";
import { isSupportedModel } from "@/app/_apis";
import { cn, isSingleValue } from "@/app/_utils/helpers/common";
import { useSelectedModelStore } from "@/app/_stores/objects-detection-model";

import { Select } from "../../../ui/select";
import type { ModelSelectProps } from "./types";

export function ModelSelect({ className, ...props }: ModelSelectProps) {
  const { model, modelChanged } = useSelectedModelStore();

  return (
    <Select
      label="Currently selected model:"
      className={cn("w-full", className)}
      value={Object.values(modelsMap).find((m) => m.value === model)}
      options={Object.values(modelsMap)}
      isClearable={false}
      isMulti={false}
      components={{
        Option: (props) => {
          return (
            <components.Option {...props}>
              {props.data.label}{" "}
              <span className="text-xs text-base-content/50">
                (
                {isSupportedModel(props.data.value) &&
                  modelsMap[props.data.value].description}
                )
              </span>
            </components.Option>
          );
        },
      }}
      onChange={(type) => {
        if (!type || !isSingleValue(type) || !isSupportedModel(type.value)) {
          return;
        }

        modelChanged(type.value);
      }}
      {...props}
    />
  );
}
