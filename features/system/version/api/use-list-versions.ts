import { useQuery } from "@tanstack/react-query";

export type VersionItem = {
  id: string;
  version: string;
  name: string;
  description?: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | null;
};

export type VersionListResponse = {
  versions: VersionItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

// Global version listing, not organization-specific
export function useListVersions(params?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: ["versions", params],
    queryFn: async () => {
      const query = new URLSearchParams({
        ...(params?.page ? { page: String(params.page) } : {}),
        ...(params?.limit ? { limit: String(params.limit) } : {}),
        ...(params?.search ? { search: params.search } : {}),
      });
      const res = await fetch(`/api/version${query.toString() ? `?${query.toString()}` : ""}`, { method: "GET" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to fetch versions");
      }
      const data = (await res.json()) as VersionListResponse;
      return data;
    },
  });
}
