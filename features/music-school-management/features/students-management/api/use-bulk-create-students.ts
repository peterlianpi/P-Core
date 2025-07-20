import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.students)["bulk-create"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.students)["bulk-create"]["$post"]
>["json"];

export const useBulkCreateStudents = (orgId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.students["bulk-create"]["$post"]({
        query: {
          orgId,
        },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Members created");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: () => {
      toast.error("Failed to create students");
    },
  });
  return mutation;
};
