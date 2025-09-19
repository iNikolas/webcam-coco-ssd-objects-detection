import * as tf from "@tensorflow/tfjs";

import { supportedModels } from "./config";

export type SupportedModel =
  (typeof supportedModels)[keyof typeof supportedModels];

export type Model = Awaited<ReturnType<typeof tf.loadGraphModel>>;
