"use client";

import React from "react";
import ReactSelect from "react-select";
import type { Props as ReactSelectProps } from "react-select";

export function Select({
  ...props
}: ReactSelectProps<{ label: string; value: string }>) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ReactSelect
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: `var(--color-primary)`,
          neutral0: `var(--color-base-100)`,
          neutral20: `var(--color-secondary-content)`,
          neutral30: `var(--color-base-content)`,
          neutral40: `var(--color-primary)`,
          neutral60: `var(--color-primary)`,
          neutral80: `var(--color-neutral-content)`,
        },
      })}
      styles={{
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: `var(--color-primary)`,
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: "none",
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          paddingLeft: 15,
          height: 40,
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          fontSize: 15,
          fontWeight: 500,
          backgroundColor: `var(--color-error)`,
        }),
        multiValueRemove: (baseStyles) => ({
          ...baseStyles,
          color: `var(--color-base-content)`,
        }),
        indicatorsContainer: (baseStyles) => ({
          ...baseStyles,
          paddingRight: 6,
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected
            ? `var(--color-primary)`
            : `"transparent"`,
          "&:hover": {
            backgroundColor: state.isSelected
              ? `var(--color-primary)`
              : `var(--color-base-200)`,
          },
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: `var(--color-base-100)`,
        }),
      }}
      {...props}
    />
  );
}
