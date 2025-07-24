"use server";


import { prisma } from "@/lib/db/client";
import { Versions } from "@/schemas";

export async function getVersionById(id: string) {
  const version = await prisma.versionInfo.findUnique({
    where: { id },
  });
  const result = Versions.safeParse(version);

  if (!result.success) {
    throw new Error("Invalid data");
  }

  return result;
}

export async function getAllVersions() {
  const versions = await prisma.versionInfo.findMany({
    orderBy: { createdAt: "desc" },
  });

  const result = Versions.safeParse(versions);

  if (!result.success) {
    throw new Error("Invalid data");
  }

  return result;
}
