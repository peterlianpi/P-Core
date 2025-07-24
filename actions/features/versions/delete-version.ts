'use server';

import { prisma } from "@/lib/db/client";

export const deleteVersion = async ({ id }: { id: string }) => {
  try {
    await prisma.versionInfo.delete({
      where: { id },
    });
    return { success: "Version deleted successfully" };
  } catch (err) {
    console.error(err);
    return { error: "Error deleting version info" };
  }
};
