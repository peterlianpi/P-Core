// Import the Resend module to handle email sending
import { Resend } from "resend";

// Initialize Resend with the API key from environment variables
// Use a fallback dummy key for build time to prevent errors
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_build_key");

/**
 * Sends a verification email to the user.
 * 
 * @param email - The recipient's email address
 * @param token - The verification token
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  // Skip sending if no real API key is configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_dummy_build_key") {
    console.warn("RESEND_API_KEY not configured. Email not sent.");
    return { success: false, error: "Email service not configured" };
  }

  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

/**
 * Sends a password reset email to the user.
 * 
 * @param email - The recipient's email address
 * @param token - The password reset token
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  // Skip sending if no real API key is configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_dummy_build_key") {
    console.warn("RESEND_API_KEY not configured. Email not sent.");
    return { success: false, error: "Email service not configured" };
  }

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

/**
 * Sends a two-factor authentication token via email.
 * 
 * @param email - The recipient's email address
 * @param token - The 2FA token
 */
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  // Skip sending if no real API key is configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_dummy_build_key") {
    console.warn("RESEND_API_KEY not configured. Email not sent.");
    return { success: false, error: "Email service not configured" };
  }

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
