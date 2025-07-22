import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { userDBPrismaClient } from "./prisma-client/user-prisma-client";

/**
 * Generates a Two-Factor Authentication (2FA) token for a given email address.
 * Deletes any existing 2FA token for the email before creating a new one.
 * @param email - The email address for which to generate the 2FA token.
 * @returns The newly created two-factor token.
 */
export const generateTwoFactorToken = async (email: string) => {
  // Generate a random 6-digit token
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  // Set the token's expiry time to 5 minutes from now
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  // Check if a 2FA token already exists for this email
  const existingToken = await getTwoFactorTokenByEmail(email);

  // If an existing token is found, delete it
  if (existingToken) {
    await userDBPrismaClient.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create and return a new 2FA token
  return await userDBPrismaClient.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

/**
 * Generates a password reset token for a given email address.
 * Deletes any existing password reset token for the email before creating a new one.
 * @param email - The email address for which to generate the password reset token.
 * @returns The newly created password reset token.
 */
export const generatePasswordResetToken = async (email: string) => {
  // Generate a unique token using UUID
  const token = uuidv4();

  // Set the token's expiry time to 24 hours from now
  const expires = new Date(Date.now() + 24 * 3600 * 1000);

  // Check if a password reset token already exists for this email
  const existingToken = await getPasswordResetTokenByEmail(email);

  // If an existing token is found, delete it
  if (existingToken) {
    await userDBPrismaClient.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create and return a new password reset token
  return await userDBPrismaClient.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

/**
 * Generates an email verification token for a given email address.
 * Deletes any existing verification token for the email before creating a new one.
 * @param email - The email address for which to generate the verification token.
 * @returns The newly created verification token.
 */
export const generateVerificationToken = async (email: string) => {
  // Generate a unique token using UUID
  const token = uuidv4();

  // Set the token's expiry time to 24 hours from now
  const expires = new Date(Date.now() + 24 * 3600 * 1000);

  // Check if a verification token already exists for this email
  const existingToken = await getVerificationTokenByEmail(email);

  // If an existing token is found, delete it
  if (existingToken) {
    await userDBPrismaClient.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create and return a new verification token
  return await userDBPrismaClient.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};
