// hooks/use-remove-org-member.ts
import {
    InferRequestType,
    // InferResponseType
} from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/lib/api/hono-client";
import { RemoveMemberResponse } from "../helper/organization-type";


// type ResponseType = InferResponseType<(typeof client.api.org)["remove-member"]["$patch"]>;
type RequestType = InferRequestType<(typeof client.api.org)[":id"]["remove-member"]["$patch"]>["json"];

export const useRemoveOrgMember = ({ adminUserId, orgId }: { adminUserId: string, orgId: string }) => {
    const queryClient = useQueryClient();

    return useMutation<RemoveMemberResponse, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.org[":id"]["remove-member"]["$patch"]({
                json,
                param: { id: orgId },
                query: { adminUserId }, // passed as query param
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
