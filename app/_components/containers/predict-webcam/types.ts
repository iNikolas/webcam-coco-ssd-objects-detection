import { ValueOf } from "next/dist/shared/lib/constants";

import { cameraTypes } from "./config";

export type CameraType = ValueOf<typeof cameraTypes>;
