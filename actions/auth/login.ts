"use server";

import { signIn } from "@/lib/auth/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/auth/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/auth/two-factor-token";
import { getUserByEmail } from "@/data/user";
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/lib/mail/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
  verifyToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/auth/routes";
import { LoginSchema } from "@/lib/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import { trackLogin } from "./track-system-activities";
import { db } from "@/lib/db";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    try {
      // Generate secure verification token and send email via appropriate provider
      const verificationToken = await generateVerificationToken(existingUser.email);

      if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') {
        await sendVerificationEmail(verificationToken.identifier, verificationToken.token);
        console.log("[Edge] Verification email sent via Resend to", verificationToken.identifier);
      } else {
        const { sendMailSMTP } = await import("@/lib/mail/mail");
        await sendMailSMTP("confirm", verificationToken.identifier, { token: verificationToken.token });
        console.log("[Node] Verification email sent via SMTP to", verificationToken.identifier);
      }
      return { success: "Confirmation email sent!" };
    } catch (err) {
      console.error("Failed to send verification email:", err);
      return { error: "Failed to send verification email" };
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      // SECURITY: Use hash verification instead of plain text comparison
      // This protects against database compromise attacks
      if (!verifyToken(code, twoFactorToken.token)) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  // Attempt sign-in
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if (response?.error) {
      return { error: "Invalid credentials" };
    }

    await trackLogin({
      value: email,
      userId: existingUser.id,
      role: existingUser.role,
    }); // Track successful login

    // Successful login
    return {
      success: "Login Successful!",
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT, // Return redirect URL
    };
  } catch (error) {
    // Handle authentication-specific errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "An authentication error occurred" };
      }
    }
    throw error;
  }
};
