import { useQuery } from "@tanstack/react-query";
import client from "@/lib/api/hono-client";

export const useGetOrgByUserId = (userId: string | undefined) => {
  const query = useQuery({
    enabled: !!userId, // only run the query if userId is defined
    queryKey: ["organizations", { userId }],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      // API request to fetch organization data by userId
      const response = await client.api.org.$get({
        query: {
          userId,
        },
      });

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
