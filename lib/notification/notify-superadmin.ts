
import { sendTelegramLog } from "@/lib/telegram/telegram";
import { UserRole } from "@prisma/client";
import { prisma } from "../db/client";

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
  const superAdmins = await prisma.user.findMany({
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
