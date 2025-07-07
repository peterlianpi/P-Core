"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { trackEmailVerification } from "./track-system-activities";
import { userDBPrismaClient } from "@/lib/prisma-client/user-prisma-client";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Token does not exist!",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }
  await userDBPrismaClient.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await userDBPrismaClient.verificationToken.delete({
    where: { id: existingToken.id },
  });

  await trackEmailVerification({
    value: existingUser.email,
  });

  return {
    success: "Email verified!",
  };
};
