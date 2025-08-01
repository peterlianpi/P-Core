import { sendTelegramLog } from "@/lib/telegram/telegram";
import { UserRole } from "@prisma/client";


import type { DeviceType } from "@/lib/types/activity";

type LogOptions = {
  userId: string;
  role: UserRole;
  title: string;
  message: string;
  type?: "INFO" | "WARNING" | "ERROR";
  deviceType?: DeviceType;
  ip?: string;
  userAgent?: string;
};

export const logUserActivity = async ({
  userId,
  role,
  title,
  message,
  type = "INFO",
  deviceType,
  ip,
  userAgent,
}: LogOptions) => {
  await sendTelegramLog({
    userId,
    role,
    title,
    message,
    type,
    metadata: {
      deviceType,
      ip,
      userAgent,
    },
  });
};
