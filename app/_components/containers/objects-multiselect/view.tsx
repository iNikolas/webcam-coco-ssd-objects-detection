"use client";

import React from "react";

import type { Props as ReactSelectProps } from "react-select";

import { options } from "./config";
import { Select } from "../../ui/select";

export function ObjectsMultiselect({
  value,
  ...props
}: Omit<ReactSelectProps<{ label: string; value: string }>, "value"> & {
  value?: string[];
  label?: string;
}) {
  return (
    <Select
      options={options}
      isMulti
      {...(!!value && {
        value: options.filter((o) => value.includes(o.value)),
      })}
      isSearchable
      {...props}
    />
  );
}
