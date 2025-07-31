import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCourses = ({ orgId }: { orgId: string }) => {
  const query = useQuery({
    queryKey: ["courses", orgId],
    queryFn: async () => {
      // API request to fetch course data
      const response = await client.api.courses.$get({
        query: { orgId },
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
