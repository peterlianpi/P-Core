import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetScheduleByIdAndOrgId = ({
  id,
  orgId,
}: {
  id: string;
  orgId: string;
}) => {
  const query = useQuery({
    enabled: !!id, // only run the query if id, orgId are defined
    queryKey: ["schedule", { id, orgId }],
    queryFn: async () => {
      if (!id) throw new Error("Schedule ID is required");

      // API request to fetch schedule data by id
      const response = await client.api.schedules[":id"].$get({
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
