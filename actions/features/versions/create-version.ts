"use server";

import { db } from "@/lib/db";
import { z } from "zod";

// Define schema for the version data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const versionSchema = z.object({
  version: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.string(),
});

export const createVersion = async (values: z.infer<typeof versionSchema>) => {
  try {
    const data = await db.versionInfo.create({
      data: values,
    });
    return { success: "Version created successfully", data };
  } catch (err) {
    console.error(err);
    return { error: "Error creating version info" };
  }
};
