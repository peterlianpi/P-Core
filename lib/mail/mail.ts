// Unified mail sending logic for Resend and SMTP (Gmail), using shared templates
import { Resend } from "resend";
import nodemailer from "nodemailer";
import {
  twoFactorTemplate,
  passwordResetTemplate,
  verificationTemplate,
  inviteTemplate
} from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;
const myMail = "Security <no-reply@security.peterlianpi.xyz>";

// SMTP config (generic, matches .env)
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
const smtpFrom = process.env.MAIL_FROM || smtpUser;

// --- RESEND PROVIDER FUNCTIONS ---
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { subject, html } = twoFactorTemplate(token);
  await resend.emails.send({ from: myMail, to: email, subject, html });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const { subject, html } = passwordResetTemplate(token);
  await resend.emails.send({ from: myMail, to: email, subject, html });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const { subject, html } = verificationTemplate(token);
  await resend.emails.send({ from: myMail, to: email, subject, html });
};

export const sendInviteEmail = async (email: string, link: string) => {
  const { subject, html } = inviteTemplate(link);
  await resend.emails.send({ from: myMail, to: email, subject, html });
};

// --- SMTP (GMAIL) PROVIDER FUNCTION ---
export type MailType = 'reset' | 'confirm' | 'invite' | '2fa' | 'custom';

interface MailOptions {
  token?: string;
  link?: string;
  subject?: string; // For custom mail type
  body?: string;    // For custom mail type
}

/**
 * Sends an email using Gmail SMTP for various purposes (reset, confirm, invite, 2fa).
 * Uses the same templates as Resend for consistency.
 */
export async function sendMailSMTP(type: MailType, to: string, options: MailOptions = {}) {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: { user: smtpUser, pass: smtpPass },
  });

  let subject = '';
  let html = '';

  switch (type) {
    case 'reset': {
      const tpl = passwordResetTemplate(options.token!);
      subject = tpl.subject;
      html = tpl.html;
      break;
    }
    case 'confirm': {
      const tpl = verificationTemplate(options.token!);
      subject = tpl.subject;
      html = tpl.html;
      break;
    }
    case 'invite': {
      const tpl = inviteTemplate(options.link!);
      subject = tpl.subject;
      html = tpl.html;
      break;
    }
    case '2fa': {
      const tpl = twoFactorTemplate(options.token!);
      subject = tpl.subject;
      html = tpl.html;
      break;
    }
    case 'custom': {
      subject = options.subject || 'P-Core Test Email';
      html = options.body || '<p>This is a test email.</p>';
      break;
    }
    default:
      throw new Error('Unknown mail type');
  }

  await transporter.sendMail({
    from: smtpFrom,
    to,
    subject,
    html,
  });
}
