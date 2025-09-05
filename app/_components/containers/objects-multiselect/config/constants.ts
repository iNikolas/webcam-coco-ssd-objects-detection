import { CLASSES } from "@tensorflow-models/coco-ssd/dist/classes";

import { capitalizeWords } from "@/app/_utils/helpers/common";

export const options = Object.values(CLASSES).map((c) => ({
  label: capitalizeWords(c.displayName),
  value: c.displayName,
}));
