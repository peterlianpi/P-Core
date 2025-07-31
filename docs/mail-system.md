# P-Core Mail System Documentation

## Overview
The P-Core mail system provides a unified, modern, and maintainable way to send transactional emails (account confirmation, password reset, 2FA, invites) using either SMTP (Gmail or any provider) or Resend (Edge-compatible). All configuration, templates, and logic are centralized for easy management and future extension.

---

## Structure

- **lib/mail/mail-config.ts**
  - Centralizes all mail-related configuration (SMTP, sender, system name/year, app URL).
- **lib/mail/email-templates.ts**
  - Contains all HTML templates for transactional emails, using modern, branded, mobile-friendly design.
- **lib/mail/mail.ts**
  - Provides unified functions for sending mail via SMTP or Resend, automatically choosing the right provider based on runtime (Edge/Node).
  - Handles all error logging and reporting.
- **actions/auth/register.ts, actions/auth/login.ts, actions/auth/reset.ts**
  - Integrate the mail system into user flows, always using the correct function and template.
- **scripts/test-*.ts**
  - Test scripts for sending each mail type to verify configuration and template output.

---

## Usage

- **To send a verification (account confirmation) email:**
  ```ts
  await sendVerificationEmail(email, token);
  // or, for Node.js SMTP:
  await sendMailSMTP("confirm", email, { token });
  ```
- **To send a password reset email:**
  ```ts
  await sendPasswordResetEmail(email, token);
  // or, for Node.js SMTP:
  await sendMailSMTP("reset", email, { token });
  ```
- **To send a 2FA code:**
  ```ts
  await sendTwoFactorTokenEmail(email, token);
  // or, for Node.js SMTP:
  await sendMailSMTP("2fa", email, { token });
  ```
- **To send an invite:**
  ```ts
  await sendInviteEmail(email, link);
  // or, for Node.js SMTP:
  await sendMailSMTP("invite", email, { link });
  ```

---

## Configuration

Set the following in your `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_FROM="P-Core System <your_email@gmail.com>"
MAIL_SYSTEM_NAME="P-Core System"
MAIL_SYSTEM_YEAR="2025"
NEXT_PUBLIC_APP_URL="https://your-app-url.com"
RESEND_API_KEY=your_resend_api_key
```

---

## Extending
- Add new templates to `email-templates.ts` and new types to `mail.ts` as needed.
- Update `mail-config.ts` to change branding, sender, or provider.
- Use the test scripts in `scripts/` to verify new templates or providers.

---

## Best Practices
- Always use the centralized config and template functions.
- Handle errors and log failures for all mail sends.
- Use the test scripts to verify mail delivery after any config or provider change.

---

## References
- [Nodemailer Docs](https://nodemailer.com/smtp/)
- [Resend Docs](https://resend.com/docs)
- [12factor Config](https://12factor.net/config)

---

*Maintained by the P-Core Team. For questions or issues, see the code comments or contact the maintainers.*
