import * as tf from "@tensorflow/tfjs";

import {
  confidenceMinThreshold,
  intersectionOverUnionThreshold,
  predictionsPerImage,
} from "@/app/_config";
import { Model } from "@/app/_apis";
import labels from "@/app/_assets/labels.json";
import { DetectedObject } from "@/app/_entities";

export function cropToSquare(img: tf.Tensor3D): tf.Tensor3D {
  const [h, w] = img.shape;
  const size = Math.min(h, w);
  const top = Math.floor((h - size) / 2);
  const left = Math.floor((w - size) / 2);
  return img.slice([top, left, 0], [size, size, 3]);
}

function normalizeRawBoxes(rawBoxes: tf.Tensor2D) {
  const [cx, cy, bw, bh] = tf.split<tf.Tensor2D>(rawBoxes, 4, 1);

  const halfW = bw.div<tf.Tensor2D>(2);
  const halfH = bh.div<tf.Tensor2D>(2);

  const x1 = cx.sub<tf.Tensor2D>(halfW);
  const y1 = cy.sub<tf.Tensor2D>(halfH);
  const x2 = cx.add<tf.Tensor2D>(halfW);
  const y2 = cy.add<tf.Tensor2D>(halfH);

  return tf.concat([y1, x1, y2, x2], 1);
}

function splitModelPredictionsByCategories(
  predictions: ReturnType<Model["predict"]>
) {
  if (Array.isArray(predictions) || !(predictions instanceof tf.Tensor)) {
    throw new Error("Something went wrong. Unexpected result type");
  }

  const output = predictions.squeeze().transpose<tf.Tensor2D>();

  const numPredictions = output.shape[0];
  const numChannels = output.shape[1];
  const numClasses = numChannels - 4;

  const boxes = output.slice([0, 0], [numPredictions, 4]);
  const classScores = output.slice([0, 4], [numPredictions, numClasses]);

  return {
    normalizedBoxes: normalizeRawBoxes(boxes),
    classScores,
  };
}

function getBestGuessPerPrediction(classScores: tf.Tensor2D) {
  const { values: topScores, indices: topClassIdx } = tf.topk(classScores);
  const confidences = topScores.squeeze<tf.Tensor1D>();
  const classIndices = topClassIdx.squeeze<tf.Tensor1D>().toInt();

  return {
    confidences,
    classIndices,
  };
}

export async function predict({
  source,
  model,
}: {
  source: HTMLVideoElement;
  model: Model;
}): Promise<DetectedObject[]> {
  const shape = model.inputs[0].shape;

  if (!shape || shape.length !== 4) {
    throw new Error("Unexpected input shape");
  }

  const [, imageHeightPx, imageWidthPx] = shape;

  if (imageHeightPx !== imageWidthPx) {
    throw new Error("Unexpected input shape");
  }

  const { boxes, confidences, classIndices } = tf.tidy(() => {
    const imageTensor = cropToSquare(
      tf.browser.fromPixels(source).toFloat().div(255)
    )
      .resizeBilinear([imageHeightPx, imageWidthPx])
      .expandDims<tf.Tensor4D>();

    const predictions = model.predict(imageTensor);

    const { normalizedBoxes, classScores } =
      splitModelPredictionsByCategories(predictions);

    const { confidences, classIndices } =
      getBestGuessPerPrediction(classScores);

    return {
      boxes: normalizedBoxes,
      confidences,
      classIndices,
    };
  });

  const bestPredictionIndices = await tf.image.nonMaxSuppressionAsync(
    boxes,
    confidences,
    predictionsPerImage,
    intersectionOverUnionThreshold,
    confidenceMinThreshold
  );

  const bestPredictionIndicesArray = await bestPredictionIndices.array();

  const boxesArr = await boxes.array();
  const scoresArr = await confidences.array();
  const classesArr = await classIndices.array();

  const sourceWidth = source.videoWidth;
  const sourceHeight = source.videoHeight;

  const sourceRatio = Math.min(
    sourceWidth / imageWidthPx,
    sourceHeight / imageHeightPx
  );

  const sourceAspectRatio = sourceWidth / sourceHeight;
  const truncatedPx = Math.abs(sourceWidth - sourceHeight);

  const halfWidthTruncatedPx = (sourceAspectRatio > 1 ? truncatedPx : 0) / 2;
  const halfHeightTruncatedPx = (sourceAspectRatio < 1 ? truncatedPx : 0) / 2;

  const detections = bestPredictionIndicesArray.map<DetectedObject>((i) => {
    const [y1, x1, y2, x2] = boxesArr[i];

    const scaledX1 = x1 * sourceRatio + halfWidthTruncatedPx;
    const scaledY1 = y1 * sourceRatio + halfHeightTruncatedPx;

    const scaledX2 = x2 * sourceRatio;
    const scaledY2 = y2 * sourceRatio;

    return {
      bbox: [scaledX1, scaledY1, scaledX2 - scaledX1, scaledY2 - scaledY1],
      score: scoresArr[i],
      class: labels[classesArr[i]] ?? "Unknown",
    };
  });

  tf.dispose([boxes, confidences, classIndices, bestPredictionIndices]);

  return detections;
}
