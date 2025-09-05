import React from "react";

import { useObjectsDetectionModelStore } from "@/app/_stores/objects-detection-model";

export function useHiddenState() {
  const [hidden, setHidden] = React.useState(false);

  const { isLoading, instance } = useObjectsDetectionModelStore();

  React.useEffect(() => {
    if (isLoading || !instance) {
      setHidden(false);
    }
  }, [instance, isLoading]);

  return [hidden, setHidden] as const;
}
