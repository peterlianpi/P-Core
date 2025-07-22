import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.students)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.students)[":id"]["$patch"]
>["json"];

export const useEditStudent = ({
  orgId,
  id,
}: {
  orgId: string;
  id: string;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.students[":id"]["$patch"]({
        json,
        query: {
          orgId,
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
      queryClient.invalidateQueries({ queryKey: ["student", { id, orgId }] });
      queryClient.invalidateQueries({ queryKey: ["students", { orgId }] });
    },
  });
  return mutation;
};
