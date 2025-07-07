import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.lyrics.$post>;
type RequestType = InferRequestType<typeof client.api.lyrics.$post>["json"];

export const useCreateLowerThirdSettings = (userId: string) => {
    // userId is passed as a parameter
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            // Include userId in the request payload (json)
            const response = await client.api.lyrics.$post({
                query: { userId },
                json,
            });

            if (!response.ok) {
                throw new Error(
                    "Unknown error occurred"
                );
            }

            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organizations"] });
        },
    });

    return mutation;
};
