import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetVersions = () => {
  const query = useQuery({
    queryKey: ["versions"],
    queryFn: async () => {
      const response = await client.api.versionInfo.$get();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Unknown error occurred"
        );
      }
      const data = await response.json();

      return Array.isArray(data) ? data : [];
    },
  });
  return query;
};
