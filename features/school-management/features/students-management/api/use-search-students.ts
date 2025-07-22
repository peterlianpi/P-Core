import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useSearchStudents = (
  take: string,
  skip: string,
  searchQuery: string,
  orgId: string
) => {
  const query = useQuery({
    queryKey: ["students", { take, skip, searchQuery, orgId }], // Use take and skip values directly
    queryFn: async () => {
      const response = await client.api.students["search"].$get({
        query: { take, skip, searchQuery, orgId },
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
    placeholderData: keepPreviousData,
  });
  return query;
};
