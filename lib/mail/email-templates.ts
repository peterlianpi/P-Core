// Email template generators for all mail types (provider-agnostic)

const url = process.env.NEXT_PUBLIC_APP_URL;
const systemName = "P-Core System";
const systemYear = "2025";
const footer = `<footer style="text-align:center;font-size:12px;color:#888;margin-top:32px;">© ${systemYear} ${systemName}. All rights reserved.</footer>`;

const baseStyles = `background:#f9fafb;padding:0;margin:0;min-width:100vw;min-height:100vh;`;
const cardStyles = `background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.07);max-width:420px;margin:40px auto;padding:32px 24px;font-family:Inter,Arial,sans-serif;color:#222;line-height:1.7;`;
const headingStyles = `margin:0 0 16px 0;font-size:1.5rem;font-weight:600;letter-spacing:-0.5px;color:#2563eb;text-align:center;`;
const buttonStyles = `display:inline-block;background:#2563eb;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:500;font-size:1rem;margin:24px 0;transition:background 0.2s;`;

export function twoFactorTemplate(token: string) {
  return {
    subject: "Your 2FA Code",
    html: `
      <body style="${baseStyles}">
        <div style="${cardStyles}">
          <h2 style="${headingStyles}">Two-Factor Authentication</h2>
          <p style="margin-bottom:18px;">Hi,</p>
          <p style="font-size:1.1rem;margin-bottom:18px;">Your 2FA code is:</p>
          <div style="font-size:2rem;font-weight:700;letter-spacing:4px;background:#f1f5f9;padding:16px 0;border-radius:8px;text-align:center;margin-bottom:18px;">${token}</div>
          <p style="color:#666;">This code will expire in 10 minutes. If you did not request this, you can ignore this email.</p>
          ${footer}
        </div>
      </body>
    `
  };
}

export function passwordResetTemplate(token: string) {
  const resetLink = `${url}/auth/reset-password?token=${token}`;
  return {
    subject: "Reset Your Password",
    html: `
      <body style="${baseStyles}">
        <div style="${cardStyles}">
          <h2 style="${headingStyles}">Reset Your Password</h2>
          <p style="margin-bottom:18px;">Hi,</p>
          <p style="margin-bottom:18px;">We received a request to reset your password. Click the button below to set a new password:</p>
          <div style="text-align:center;">
            <a href="${resetLink}" style="${buttonStyles}">Reset Password</a>
          </div>
          <p style="color:#666;margin-top:18px;">This link will expire in 24 hours. If you did not request this, you can ignore this email.</p>
          ${footer}
        </div>
      </body>
    `
  };
}

export function verificationTemplate(token: string) {
  const confirmLink = `${url}/auth/new-verification?token=${token}`;
  return {
    subject: "Confirm Your Email",
    html: `
      <body style="${baseStyles}">
        <div style="${cardStyles}">
          <h2 style="${headingStyles}">Confirm Your Email</h2>
          <p style="margin-bottom:18px;">Hi,</p>
          <p style="margin-bottom:18px;">Please click the button below to confirm your email address:</p>
          <div style="text-align:center;">
            <a href="${confirmLink}" style="${buttonStyles}">Confirm Email</a>
          </div>
          <p style="color:#666;margin-top:18px;">This link will expire in 24 hours. If you did not request this, you can ignore this email.</p>
          ${footer}
        </div>
      </body>
    `
  };
}

export function inviteTemplate(link: string) {
  return {
    subject: "You're Invited to Join P-Core System!",
    html: `
      <body style="${baseStyles}">
        <div style="${cardStyles}">
          <h2 style="${headingStyles}">You're Invited!</h2>
          <p style="margin-bottom:18px;">Hi,</p>
          <p style="margin-bottom:18px;">You've been invited to join <b>P-Core System</b>. Click the button below to accept your invitation:</p>
          <div style="text-align:center;">
            <a href="${link}" style="${buttonStyles}">Accept Invitation</a>
          </div>
          <p style="color:#666;margin-top:18px;">If you did not expect this invitation, you can ignore this email.</p>
          ${footer}
        </div>
      </body>
    `
  };
}
