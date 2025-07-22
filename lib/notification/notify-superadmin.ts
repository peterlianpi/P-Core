
import { sendTelegramLog } from "@/lib/telegram/telegram";
import { UserRole } from "@/prisma-user-database/user-database-client-types";
import { userDBPrismaClient } from "../prisma-client/user-prisma-client";

type NotifyOptions = {
  title: string;
  message: string;
  type?: "INFO" | "WARNING" | "ERROR";
};

export const notifySuperAdmins = async ({
  title,
  message,
  type = "INFO",
}: NotifyOptions) => {
  const superAdmins = await userDBPrismaClient.user.findMany({
    where: {
      role: UserRole.SUPERADMIN,
    },
  });

  await Promise.all(
    superAdmins.map((admin) =>
      sendTelegramLog({
        userId: admin.id,
        role: "SUPERADMIN",
        title,
        message,
        type,
      })
    )
  );
};
