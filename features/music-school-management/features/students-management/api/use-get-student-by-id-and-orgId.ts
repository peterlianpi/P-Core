import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetStudentByIdAndOrgId = ({
  id,
  orgId,
}: {
  id: string;
  orgId: string;
}) => {
  const query = useQuery({
    enabled: !!id, // only run the query if id, orgId are defined
    queryKey: ["student", { id, orgId }],
    queryFn: async () => {
      if (!id) throw new Error("User ID is required");

      // API request to fetch student data by id
      const response = await client.api.students[":id"].$get({
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
