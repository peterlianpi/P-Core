'use server';

import { userDBPrismaClient } from "@/lib/prisma-client/user-prisma-client";

export const deleteVersion = async ({ id }: { id: string }) => {
  try {
    await userDBPrismaClient.versionInfo.delete({
      where: { id },
    });
    return { success: "Version deleted successfully" };
  } catch (err) {
    console.error(err);
    return { error: "Error deleting version info" };
  }
};
