import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.invite.$delete>;
type RequestType = InferRequestType<typeof client.api.invite.$delete>["json"];


export const useRevokeInvite = (orgId: string) => {
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.invite.$delete({
                json,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error((errorData as ErrorResponse)?.error || "Failed to revoke invite");
            }

            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organizations-invites"] });

            queryClient.invalidateQueries({ queryKey: ["organizations-invites", orgId] });
        },
    });
};
