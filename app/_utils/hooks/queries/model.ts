import { loadModel } from "@/app/_apis";
import { useQuery } from "@tanstack/react-query";

export function useModelQuery() {
  const query = useQuery({
    queryKey: ["object-detection-model"],
    queryFn: async () => {
      const result = await loadModel();

      return result;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return query;
}
