"use server";

import { signIn } from "@/lib/auth/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
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
import { prisma } from "@/lib/db/client";

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
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    // Delete any old tokens for this email
    await prisma.verificationToken.deleteMany({ where: { email: existingUser.email } });

    // Generate a new token value
    const tokenValue = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const verificationToken = await prisma.verificationToken.create({
      data: {
        email: existingUser.email,
        token: tokenValue,
        expires: new Date(Date.now() + 1000 * 60 * 10), // 10 min expiry
      },
    });

    try {
      // Edge support: Use Resend if available, otherwise fallback to SMTP
      // sendVerificationEmail uses Resend (Edge-compatible)
      // sendMailSMTP uses SMTP (Node.js only)
      if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') {
        // Edge runtime: use Resend
        await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token
        );
        console.log("[Edge] Verification email sent via Resend to", verificationToken.email);
      } else {
        // Node.js runtime: use SMTP
        const { sendMailSMTP } = await import("@/lib/mail/mail");
        await sendMailSMTP("confirm", verificationToken.email, { token: verificationToken.token });
        console.log("[Node] Verification email sent via SMTP to", verificationToken.email);
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

      await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
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
