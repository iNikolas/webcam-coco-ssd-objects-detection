export function handleErrors({
  min,
  max,
  step,
  withMarks,
  range,
}: {
  min: number;
  max: number;
  step: number;
  withMarks: boolean;
  range: number;
}) {
  if (Number.isNaN(min) || Number.isNaN(max)) {
    throw new Error("Min and max must be numbers");
  }

  if (range <= 0) {
    throw new Error("Max must be greater than min");
  }

  if (withMarks && (Number.isNaN(step) || step <= 0)) {
    throw new Error("Step must be a positive number when withMarks is true");
  }

  if (withMarks && range % step !== 0) {
    throw new Error("Range must be divisible by step when withMarks is true");
  }
}
