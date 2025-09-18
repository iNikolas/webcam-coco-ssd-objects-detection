import labels from "@/app/_assets/labels.json";

import { capitalizeWords } from "@/app/_utils/helpers/common";

export const options = Object.values(labels).map((label) => ({
  label: capitalizeWords(label),
  value: label,
}));
