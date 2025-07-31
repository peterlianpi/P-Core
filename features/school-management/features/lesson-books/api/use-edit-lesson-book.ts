import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.lessonBooks)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.lessonBooks)[":id"]["$patch"]
>["json"];

export const useEditLessonBook = ({
  orgId,
  id,
}: {
  orgId: string;
  id: string;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.lessonBooks[":id"]["$patch"]({
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
      queryClient.invalidateQueries({
        queryKey: ["lesson-book", { id, orgId }],
      });
      queryClient.invalidateQueries({ queryKey: ["lesson-books", { orgId }] });
    },
  });
  return mutation;
};
