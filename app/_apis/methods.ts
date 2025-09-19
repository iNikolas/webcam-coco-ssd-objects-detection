import * as tf from "@tensorflow/tfjs";

import type { Model, SupportedModel } from "./types";

export async function loadModel(modelName: SupportedModel): Promise<Model> {
  await tf.ready();

  const localKey = `indexeddb://${modelName}`;

  try {
    const cachedModel = await tf.loadGraphModel(localKey);
    return cachedModel;
  } catch {
    const model = await tf.loadGraphModel(`/model/${modelName}/model.json`);
    await model.save(localKey);

    return model;
  }
}
