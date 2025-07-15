// import { InferResponseType } from "hono";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { client } from "@/lib/hono";
// import { toast } from "sonner";

// type ResponseType = InferResponseType<
//   (typeof client.api.org)[":id"]["$delete"]
// >;

// type SuccessType = {
//   id: number;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export const useDeleteOrg = (id?: string) => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation<ResponseType, Error>({
//     mutationFn: async () => {
//       const response = await client.api.org[":id"]["$delete"]({
//         param: { id },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           (errorData as ErrorResponse)?.error || "Unknown error occurred"
//         );
//       }
//       const data = await response.json();
//       return data;
//     },
//     onSuccess: (data) => {
//       toast.success((data as SuccessType).name + " deleted");
//       queryClient.invalidateQueries({ queryKey: ["org", { id }] });
//       queryClient.invalidateQueries({ queryKey: ["orgs"] });
//     },
//     onError: () => {
//       toast.error("Failed to delete org");
//     },
//   });
//   return mutation;
// };
