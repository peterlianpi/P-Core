'use server';

import { db } from "@/lib/db";

export const deleteVersion = async (id: string) => {
  try {
    await db.versionInfo.delete({
      where: { id },
    });
    return { success: "Version deleted successfully" };
  } catch (err) {
    console.error(err);
    return { error: "Error deleting version info" };
  }
};
