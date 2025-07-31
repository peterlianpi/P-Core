// features/org/api/invite-client.ts

import client from "@/lib/api/hono-client";
import { useQuery } from "@tanstack/react-query";

export const useGetInviteDetailsByToken = (token: string) => {
    const query = useQuery({
        enabled: !!token, // only run the query if token is defined
        queryKey: ["organizations", { token }],
        queryFn: async () => {
            if (!token) throw new Error("Token is required");

            // API request to fetch organization data by token
            const response = await client.api.invite.$get({
                query: {
                    token,
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
    });

    return query;
};

