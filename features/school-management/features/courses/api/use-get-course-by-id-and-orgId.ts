import { useQuery } from "@tanstack/react-query";
import client from "@/lib/api/hono-client";

export const useGetCourseByIdAndOrgId = ({
  id,
  orgId,
}: {
  id: string;
  orgId: string;
}) => {
  const query = useQuery({
    enabled: !!id, // only run the query if id, orgId are defined
    queryKey: ["course", { id, orgId }],
    queryFn: async () => {
      if (!id) throw new Error("Course ID is required");

      // API request to fetch course data by id
      const response = await client.api.courses[":id"].$get({
        query: {
          orgId,
        },
        param: { id },
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
