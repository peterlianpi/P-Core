import client from "@/lib/api/hono-client";
import { useQuery } from "@tanstack/react-query";

export const useGetInvitesByOrgId = (orgId: string | undefined) => {
  const query = useQuery({
    enabled: !!orgId, // only run the query if orgId is defined
    queryKey: ["organizations-invites", { orgId }],
    queryFn: async () => {
      if (!orgId) throw new Error("User ID is required");

      // API request to fetch organization data by orgId
      const response = await client.api.invite.invites.$get({
        query: {
          orgId,
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
