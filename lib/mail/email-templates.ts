import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const url = process.env.NEXT_PUBLIC_APP_URL;
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
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="text-align: center; color: #4CAF50;">Your 2FA Code</h2>
        <p>Hi,</p>
        <p>Your 2FA code is: <strong>${token}</strong></p>
        <p>This code will expire in 10 minutes. If you did not make this request, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="text-align: center; font-size: 12px; color: #666;">© 2025 Next Auth. All rights reserved.</p>
      </div>
    `, // Email content in HTML format
  });
};

/**
 * Sends a password reset email with a reset link to the specified recipient.
 * @param email - The recipient's email address.
 * @param token - The token to generate the password reset link.
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${url}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: myMail, // Sender's email
    to: email, // Recipient's email
    subject: "Reset Your Password", // Email subject
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="text-align: center; color: #FF5733;">Reset Your Password</h2>
        <p>Hi,</p>
        <p>We received a request to reset the password for your account. Please click the button below to set a new password:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" style="background-color: #FF5733; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </div>
        <p>This link will expire in 24 hours. If you did not make this request, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="text-align: center; font-size: 12px; color: #666;">© 2025 Next Auth. All rights reserved.</p>
      </div>
    `, // Email content in HTML format
  });
};

/**
 * Sends an email verification email with a confirmation link to the specified recipient.
 * @param email - The recipient's email address.
 * @param token - The token to generate the email verification link.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${url}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: myMail, // Sender's email
    to: email, // Recipient's email
    subject: "Confirm Your Email", // Email subject
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="text-align: center; color: #4CAF50;">Confirm Your Email</h2>
        <p>Hi,</p>
        <p>We received a request to confirm your email address for your account. Please click the button below to complete the process:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${confirmLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Email</a>
        </div>
        <p>This link will expire in 24 hours. If you did not make this request, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="text-align: center; font-size: 12px; color: #666;">© 2025 Next Auth. All rights reserved.</p>
      </div>
    `, // Email content in HTML format
  });
};
