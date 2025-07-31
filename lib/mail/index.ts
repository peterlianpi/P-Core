// Nodemailer-based mail utility for transactional emails
// Modular, reusable templates and sender support for feature/system separation
// Easily switch to Resend or another provider by reusing the same templates

import nodemailer from "nodemailer";

// Create a reusable transporter using SMTP (Gmail)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const url = process.env.NEXT_PUBLIC_APP_URL;
const defaultFrom = process.env.MAIL_FROM || "P-Core <pcore.system@gmail.com>";

// --- HTML Templates ---

function template2FA(token: string) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <h2 style="text-align: center; color: #4CAF50;">Your 2FA Code</h2>
      <p>Hi,</p>
      <p>Your 2FA code is: <strong>${token}</strong></p>
      <p>This code will expire in 10 minutes. If you did not make this request, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #ddd;" />
      <p style="text-align: center; font-size: 12px; color: #666;">© 2025 Next Auth. All rights reserved.</p>
    </div>
  `;
}

function templatePasswordReset(token: string) {
  const resetLink = `${url}/auth/reset-password?token=${token}`;
  return `
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
  `;
}

function templateVerification(token: string) {
  const confirmLink = `${url}/auth/new-verification?token=${token}`;
  return `
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
  `;
}

function templateInvite(token: string, organizationName: string) {
  const inviteLink = `${url}/invite/accept?token=${token}`;
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <h2 style="text-align: center; color: #4CAF50;">You’ve been invited!</h2>
      <p>Hi,</p>
      <p>You have been invited to join the organization <strong>${organizationName}</strong>.</p>
      <p>Click the button below to accept the invitation and create your account or sign in:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${inviteLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Accept Invitation</a>
      </div>
      <p>This link will expire in 7 days. If you did not expect this invitation, please ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #ddd;" />
      <p style="text-align: center; font-size: 12px; color: #666;">© 2025 Your Company. All rights reserved.</p>
    </div>
  `;
}

// --- Mail Senders ---

/**
 * Generic mail sender (can be reused for Resend or other providers)
 */
export async function sendMail({
  to,
  subject,
  html,
  from,
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  await transporter.sendMail({
    from: from || defaultFrom,
    to,
    subject,
    html,
  });
}

/**
 * Send a Two-Factor Authentication (2FA) code email
 */
export async function sendTwoFactorTokenEmail(email: string, token: string, from?: string) {
  await sendMail({
    to: email,
    subject: "2FA Code",
    html: template2FA(token),
    from,
  });
}

/**
 * Send a password reset email with a reset link
 */
export async function sendPasswordResetEmail(email: string, token: string, from?: string) {
  await sendMail({
    to: email,
    subject: "Reset Your Password",
    html: templatePasswordReset(token),
    from,
  });
}

/**
 * Send an email verification email with a confirmation link
 */
export async function sendVerificationEmail(email: string, token: string, from?: string) {
  await sendMail({
    to: email,
    subject: "Confirm Your Email",
    html: templateVerification(token),
    from,
  });
}

/**
 * Send an organization invite email with an invite link
 */
export async function sendInviteEmail(
  email: string,
  token: string,
  organizationName: string,
  from?: string
) {
  await sendMail({
    to: email,
    subject: `Invitation to join ${organizationName}`,
    html: templateInvite(token, organizationName),
    from,
  });
}
