// hooks/use-update-org-roles.ts
import {
  InferRequestType,
  // InferResponseType
} from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { ChangeOrgRole } from "@/helpers/organization-type";


// type ResponseType = InferResponseType<(typeof client.api.org)[":id"]["update-roles"]["$patch"]>;
type RequestType = InferRequestType<(typeof client.api.org)[":id"]["update-roles"]["$patch"]>["json"];

export const useUpdateOrgRoles = ({ adminUserId, orgId }: { adminUserId: string, orgId: string }) => {
  const queryClient = useQueryClient();

  return useMutation<ChangeOrgRole, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.org[":id"]["update-roles"]["$patch"]({
        json,
        param: { id: orgId },
        query: { userId: adminUserId }, // passed as query param
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as { error?: string })?.error || "Unknown error occurred"
        );
      }
      const data = await response.json();
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org", { id: orgId }] });
      queryClient.invalidateQueries({ queryKey: ["org-users", orgId] });
    },
  });
};
