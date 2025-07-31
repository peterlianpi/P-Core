// Test mail script for all unified mail system types
// Usage: bun scripts/test-mail.ts OR node scripts/test-mail.ts

import { sendMailSMTP } from "../lib/mail/mail";

async function main() {
  const to = "peterpausianlian2020@gmail.com";

  // Test 2FA
  await sendMailSMTP("2fa", to, { token: "123456" });
  console.log("2FA test email sent");

  // Test password reset
  await sendMailSMTP("reset", to, { token: "reset-token-abc" });
  console.log("Password reset test email sent");

  // Test verification
  await sendMailSMTP("confirm", to, { token: "verify-token-xyz" });
  console.log("Verification test email sent");

  // Test invite
  await sendMailSMTP("invite", to, { link: "https://p-core.test/invite/123" });
  console.log("Invite test email sent");

  // Test custom
  await sendMailSMTP("custom", to, {
    subject: "P-Core Custom Test Email",
    body: `<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;'>
      <h2 style='text-align: center; color: #007bff;'>P-Core Custom Test Email</h2>
      <p>This is a <b>custom</b> test email sent from your unified mail system (SMTP/Gmail).</p>
      <hr style='border: none; border-top: 1px solid #ddd;' />
      <p style='text-align: center; font-size: 12px; color: #666;'>© 2025 P-Core. All rights reserved.</p>
    </div>`
  });
  console.log("Custom test email sent");
}

main().catch((err) => {
  console.error("Failed to send test email:", err);
  process.exit(1);
});
