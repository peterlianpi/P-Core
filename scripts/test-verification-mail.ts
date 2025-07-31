// Test script to send a verification (confirm account) email using the unified mail system
// Usage: bun scripts/test-verification-mail.ts OR node scripts/test-verification-mail.ts

import { sendVerificationEmail } from "../lib/mail/mail";

async function main() {
  // Change this to your test recipient
  const to = "peterpausianlian2020@gmail.com";
  const token = "test-token-123";

  await sendVerificationEmail(to, token);
  console.log("Verification (confirm account) email sent to:", to);
}

main().catch((err) => {
  console.error("Failed to send verification email:", err);
  process.exit(1);
});
