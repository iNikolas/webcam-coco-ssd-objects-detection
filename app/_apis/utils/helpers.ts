import { supportedModels } from "../config";
import type { SupportedModel } from "../types";

export function isSupportedModel(name: string): name is SupportedModel {
  return Object.values(supportedModels).includes(name as SupportedModel);
}
