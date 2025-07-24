import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { prisma } from "./db/client";

/**
 * SECURITY ENHANCEMENT: Hash tokens before storing in database
 * This prevents token theft if database is compromised
 * Uses SHA-256 hashing which is one-way and secure for token storage
 */
const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Generate a cryptographically secure random token
 * Uses crypto.randomBytes for better security than Math.random()
 */
const generateSecureToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Generates a Two-Factor Authentication (2FA) token for a given email address.
 * Deletes any existing 2FA token for the email before creating a new one.
 * @param email - The email address for which to generate the 2FA token.
 * @returns The newly created two-factor token.
 */
export const generateTwoFactorToken = async (email: string) => {
  // Generate a random 6-digit token for user display
  const plainToken = crypto.randomInt(100_000, 1_000_000).toString();
  
  // SECURITY: Hash the token before storing in database
  // Store hash, return plain token for email/SMS delivery
  const hashedToken = hashToken(plainToken);

  // Set the token's expiry time to 5 minutes from now
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  // Check if a 2FA token already exists for this email
  const existingToken = await getTwoFactorTokenByEmail(email);

  // If an existing token is found, delete it
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create new 2FA token with hashed value in database
  const dbToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token: hashedToken, // Store hashed token in database
      expires,
    },
  });

  // Return token with plain text for email delivery
  // Client code needs the plain token to send via email
  return {
    ...dbToken,
    token: plainToken, // Return plain token for sending to user
  };
};

/**
 * Generates a password reset token for a given email address.
 * Deletes any existing password reset token for the email before creating a new one.
 * @param email - The email address for which to generate the password reset token.
 * @returns The newly created password reset token.
 */
export const generatePasswordResetToken = async (email: string) => {
  // SECURITY: Generate cryptographically secure token instead of UUID
  // crypto.randomBytes provides better entropy than UUID
  const plainToken = generateSecureToken();
  
  // SECURITY: Hash the token before storing in database
  const hashedToken = hashToken(plainToken);

  // Set the token's expiry time to 24 hours from now
  const expires = new Date(Date.now() + 24 * 3600 * 1000);

  // Check if a password reset token already exists for this email
  const existingToken = await getPasswordResetTokenByEmail(email);

  // If an existing token is found, delete it
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create new password reset token with hashed value in database
  const dbToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token: hashedToken, // Store hashed token in database
      expires,
    },
  });

  // Return token with plain text for URL generation
  return {
    ...dbToken,
    token: plainToken, // Return plain token for reset URL
  };
};

/**
 * Generates an email verification token for a given email address.
 * Deletes any existing verification token for the email before creating a new one.
 * @param email - The email address for which to generate the verification token.
 * @returns The newly created verification token.
 */
export const generateVerificationToken = async (email: string) => {
  // SECURITY: Generate cryptographically secure token instead of UUID
  const plainToken = generateSecureToken();
  
  // SECURITY: Hash the token before storing in database
  const hashedToken = hashToken(plainToken);

  // Set the token's expiry time to 24 hours from now
  const expires = new Date(Date.now() + 24 * 3600 * 1000);

  // Check if a verification token already exists for this email
  const existingToken = await getVerificationTokenByEmail(email);

  // If an existing token is found, delete it
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create new verification token with hashed value in database
  const dbToken = await prisma.verificationToken.create({
    data: {
      email,
      token: hashedToken, // Store hashed token in database
      expires,
    },
  });

  // Return token with plain text for verification URL
  return {
    ...dbToken,
    token: plainToken, // Return plain token for verification URL
  };
};

/**
 * SECURITY UTILITY: Verify a plain token against stored hash
 * Used when users click verification links or submit 2FA codes
 * @param plainToken - The token from user input (URL/form)
 * @param hashedToken - The hashed token from database
 * @returns boolean indicating if tokens match
 */
export const verifyToken = (plainToken: string, hashedToken: string): boolean => {
  const hashOfPlainToken = hashToken(plainToken);
  return hashOfPlainToken === hashedToken;
};
