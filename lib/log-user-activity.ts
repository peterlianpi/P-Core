import { sendTelegramLog } from "@/lib/telegram";
import { UserRole } from "@/prisma/generated/client";

type LogOptions = {
  userId: string;
  role: UserRole;
  title: string;
  message: string;
  type?: "INFO" | "WARNING" | "ERROR";
};

export const logUserActivity = async ({
  userId,
  role,
  title,
  message,
  type = "INFO",
}: LogOptions) => {
  await sendTelegramLog({
    userId,
    role,
    title,
    message,
    type,
  });
};
