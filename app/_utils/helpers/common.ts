import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SingleValue, MultiValue } from "react-select";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeWords(sentence: string) {
  return sentence
    .split(" ")
    .map((word) =>
      word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ""
    )
    .join(" ");
}

export function isSingleValue<T extends object>(
  value: MultiValue<T> | SingleValue<T>
): value is SingleValue<T> {
  return !Array.isArray(value);
}
