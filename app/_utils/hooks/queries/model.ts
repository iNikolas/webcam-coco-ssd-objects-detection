import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { loadModel } from "@/app/_apis";
import type { SupportedModel } from "@/app/_apis";
import { useSelectedModelStore } from "@/app/_stores/objects-detection-model";

export function useModelQuery() {
  const [selectedModel, setSelectedModel] =
    React.useState<SupportedModel | null>(null);

  const { model } = useSelectedModelStore();
  const client = useQueryClient();

  const query = useQuery({
    queryKey: ["object-detection-model", selectedModel],
    queryFn: async () => {
      if (!selectedModel) {
        throw new Error("No model selected");
      }

      const result = await loadModel(selectedModel);

      return result;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: model === selectedModel,
  });

  const data = query.data;

  React.useEffect(() => {
    if (selectedModel !== model) {
      data?.dispose();
      client.removeQueries({
        queryKey: ["object-detection-model", selectedModel],
      });
      setSelectedModel(model);
    }
  }, [model, data, selectedModel, client]);

  return query;
}
