"use server";

import { userDBPrismaClient } from "@/lib/prisma-client/user-prisma-client";
import { z } from "zod";

// Define schema for the version data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const versionSchema = z.object({
  version: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.string(),
});

export const updateVersion = async (
  id: string,
  values: z.infer<typeof versionSchema>
) => {
  try {
    const data = await userDBPrismaClient.versionInfo.update({
      where: { id },
      data: values,
    });
    return { success: "Version updated successfully", data };
  } catch (err) {
    console.error(err);
    return { error: "Error updating version info" };
  }
};
