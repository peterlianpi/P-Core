// Test script to send an organization invite email using the unified mail system
// Usage: bun scripts/test-org-invite-mail.ts OR node scripts/test-org-invite-mail.ts

import { sendMailSMTP } from "../lib/mail/mail";

async function main() {
  // Change this to your test recipient
  const to = "peterpausianlian2020@gmail.com";
  const link = "https://p-core.test/invite/org-abc";
  const orgName = "Acme Corporation";

  await sendMailSMTP("org-invite", to, { link, orgName });
  console.log("Organization invite email sent to:", to);
}

main().catch((err) => {
  console.error("Failed to send org invite email:", err);
  process.exit(1);
});
