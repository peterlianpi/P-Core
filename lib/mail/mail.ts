// Unified mail sending logic for Resend and SMTP (Gmail), using shared templates
import { Resend } from "resend";
import nodemailer from "nodemailer";
import {
  twoFactorTemplate,
  passwordResetTemplate,
  verificationTemplate,
  inviteTemplate,
  orgInviteTemplate
} from "./email-templates";
import { mailConfig } from "./mail-config";

const resend = new Resend(process.env.RESEND_API_KEY);
const myMail = mailConfig.from;

// SMTP config (from centralized config)
const smtpUser = mailConfig.user;
const smtpPass = mailConfig.pass;
const smtpHost = mailConfig.host;
const smtpPort = mailConfig.port;
const smtpFrom = mailConfig.from;

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
export type MailType = 'reset' | 'confirm' | 'invite' | '2fa' | 'custom' | 'org-invite';

interface MailOptions {
  token?: string;
  link?: string;
  orgName?: string; // For org-invite
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
    case 'org-invite': {
      const tpl = orgInviteTemplate(options.link!, options.orgName!);
      subject = tpl.subject;
      html = tpl.html;
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
