import * as tf from "@tensorflow/tfjs";

import { localKey, modelPath } from "./config";

export async function loadModel() {
  await tf.ready();

  try {
    const cachedModel = await tf.loadGraphModel(localKey);
    return cachedModel;
  } catch {
    const model = await tf.loadGraphModel(modelPath, { fromTFHub: true });
    await model.save(localKey);

    return model;
  }
}
