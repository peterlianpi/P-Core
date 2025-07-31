import { useQuery } from "@tanstack/react-query";
import client from "@/lib/api/hono-client";

export const useGetOrg = () => {
  const query = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      // API request to fetch organization data by userId
      const response = await client.api.org["org"].$get();

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Unknown error occurred"
        );
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
