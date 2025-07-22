import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.courses)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.courses)[":id"]["$patch"]
>["json"];

export const useEditCourse = ({ orgId, id }: { orgId: string; id: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.courses[":id"]["$patch"]({
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
      queryClient.invalidateQueries({ queryKey: ["course", { id, orgId }] });
      queryClient.invalidateQueries({ queryKey: ["courses", { orgId }] });
    },
  });
  return mutation;
};
