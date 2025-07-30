import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/lib/api/hono-client";

type ResponseType = InferResponseType<(typeof client.api.org)[":id"]["$patch"]>;
type RequestType = InferRequestType<
  (typeof client.api.org)[":id"]["$patch"]
>["json"];

export const useEditOrg = (userId: string, id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.org[":id"]["$patch"]({
        json,
        query: {
          userId,
        },
        param: {
          id,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org", { id }] });
      queryClient.invalidateQueries({ queryKey: ["orgs"] });
    },
  });
  return mutation;
};
