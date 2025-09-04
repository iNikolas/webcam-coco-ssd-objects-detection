import React from "react";

import { useObjectsDetectionModelStore } from "@/app/_stores/objects-detection-model";

export function useHiddenState() {
  const [hidden, setHidden] = React.useState(false);

  const { isLoading, error, instance } = useObjectsDetectionModelStore();

  React.useEffect(() => {
    if (isLoading || error || !instance) {
      setHidden(false);
    }
  }, [error, instance, isLoading]);

  return [hidden, setHidden] as const;
}
