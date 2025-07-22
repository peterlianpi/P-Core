import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api)["upload-image"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api)["upload-image"]["$post"]
>["json"];

export const useUploadImage = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api["upload-image"].$post({ json });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Unknown error occurred"
        );
      }
      const data = await response.json();
      return data;
    },
  });
  return mutation;
};
