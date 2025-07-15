import {
  InferRequestType,
  // InferResponseType
} from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InviteAcceptSuccessResponse } from "@/features/org/helper/organization-type";

// type ResponseType = InferResponseType<typeof client.api.invite.accept.$post>;
type RequestType = InferRequestType<typeof client.api.invite.accept.$post>["json"];

export const useAcceptMember = (userId: string) => {
  // userId is passed as a parameter
  const queryClient = useQueryClient();

  const mutation = useMutation<InviteAcceptSuccessResponse, Error, RequestType>({
    mutationFn: async (json) => {
      // Include userId in the request payload (json)
      const response = await client.api.invite.accept.$post({
        query: { userId },
        json,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error
          || "Unknown error occurred"
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-accepted"] });
    },
  });

  return mutation;
};
