// Import the Resend module to handle email sending
import { Resend } from "resend";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Get the domain from environment variables for constructing links
const domain = process.env.NEXT_PUBLIC_APP_URL;

// Define the sender email address in a format suitable for email headers
const myMail = "Security <no-reply@security.peterlianpi.xyz>";

/**
 * Sends a Two-Factor Authentication (2FA) token email to the specified recipient.
 * @param email - The recipient's email address.
 * @param token - The 2FA token to be included in the email.
 */
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: myMail, // Sender's email
    to: email, // Recipient's email
    subject: "2FA Code", // Email subject
    html: `<p>Your 2FA code is: ${token}</p>`, // Email content in HTML format
  });
};

/**
 * Sends a password reset email with a reset link to the specified recipient.
 * @param email - The recipient's email address.
 * @param token - The token to generate the password reset link.
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  // Construct the password reset link
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: myMail, // Sender's email
    to: email, // Recipient's email
    subject: "Reset Your Password", // Email subject
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`, // Email content in HTML format
  });
};

/**
 * Sends an email verification email with a confirmation link to the specified recipient.
 * @param email - The recipient's email address.
 * @param token - The token to generate the email verification link.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  // Construct the email verification link
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: myMail, // Sender's email
    to: email, // Recipient's email
    subject: "Confirm Your Email", // Email subject
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`, // Email content in HTML format
  });
};
