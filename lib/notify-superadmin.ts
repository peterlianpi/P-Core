import { db } from "@/lib/db";
import { sendTelegramLog } from "@/lib/telegram";
import { UserRole } from "@/prisma/generated/client";

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
  const superAdmins = await db.user.findMany({
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
