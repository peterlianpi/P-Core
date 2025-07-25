"use server";

import { prisma } from "@/lib/db/client";
import { Versions } from "@/schemas";

export async function getVersionById(id: string) {
  const version = await prisma.versionInfo.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      version: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
  const result = Versions.safeParse([version]); // Parse as an array of one

  if (!result.success) {
    throw new Error("Invalid data");
  }

  return result;
}

export async function getAllVersions() {
  const versions = await prisma.versionInfo.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      version: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });

  const result = Versions.safeParse(versions);

  if (!result.success) {
    throw new Error("Invalid data");
  }

  return result;
}
