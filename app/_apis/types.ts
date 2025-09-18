import { loadModel } from "./methods";

export type Model = Awaited<ReturnType<typeof loadModel>>;
