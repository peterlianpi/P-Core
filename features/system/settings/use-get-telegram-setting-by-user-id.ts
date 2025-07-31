import { useQuery } from "@tanstack/react-query";
import client from "@/lib/api/hono-client";

// Type definition for Telegram settings
export interface TelegramSettings {
  telegramChatId?: string;
  telegramBotToken?: string;
  isActive?: boolean;
}

// Fetch function using Hono client, accepts userId
async function getTelegramSettingByUserId({ userId, scope }: { userId: string, scope: string }): Promise<TelegramSettings> {
  const response = await client.api["telegram-setting"].$get({ query: { userId },param:{scope} });
  if (!response.ok) {
    throw new Error("Failed to fetch Telegram settings");
  }
  return await response.json();
}

// React Query hook for fetching Telegram settings by userId
export function useGetTelegramSettingByUserId({ userId, scope }: { userId: string, scope: string }) {
  return useQuery<TelegramSettings>({
    queryKey: ["telegram-settings", userId],
    queryFn: () => {
      if (!userId) throw new Error("No userId provided");
      return getTelegramSettingByUserId({ userId, scope });
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
