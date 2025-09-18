import clsx from "clsx";
import * as tf from "@tensorflow/tfjs";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Model } from "@/app/_apis";

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

export function cropToSquare(img: tf.Tensor3D): tf.Tensor3D {
  const [h, w] = img.shape;
  const size = Math.min(h, w);
  const top = Math.floor((h - size) / 2);
  const left = Math.floor((w - size) / 2);
  return img.slice([top, left, 0], [size, size, 3]);
}

export async function predict({
  source,
  model,
  onSuccess,
}: {
  source: HTMLVideoElement;
  model: Model;
  onSuccess: () => void;
}) {
  const imageTensor = tf.tidy(() => {
    return cropToSquare(tf.browser.fromPixels(source).toFloat().div(255))
      .resizeBilinear([128, 128])
      .expandDims();
  });

  const result = model.predict(imageTensor);

  imageTensor.dispose();

  if (Array.isArray(result) || !(result instanceof tf.Tensor)) {
    throw new Error("Something went wrong. Unexpected result type");
  }

  const data = await result.data();

  console.log(data);

  result.dispose();
}
