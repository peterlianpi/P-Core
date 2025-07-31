// Centralized mail configuration for P-Core System
export const mailConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  from: process.env.MAIL_FROM || "P-Core System <pcore.system@gmail.com>",
  systemName: process.env.MAIL_SYSTEM_NAME || "P-Core System",
  systemYear: process.env.MAIL_SYSTEM_YEAR || "2025",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};
