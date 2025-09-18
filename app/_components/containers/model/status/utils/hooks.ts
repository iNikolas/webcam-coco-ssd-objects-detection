import React from "react";

import { useModelQuery } from "@/app/_utils/hooks/queries";

export function useHiddenState() {
  const [hidden, setHidden] = React.useState(false);

  const { isLoading, data: instance } = useModelQuery();

  React.useEffect(() => {
    if (isLoading || !instance) {
      setHidden(false);
    }
  }, [instance, isLoading]);

  return [hidden, setHidden] as const;
}
