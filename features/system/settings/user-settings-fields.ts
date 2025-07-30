// Field config for user settings (reusable for DynamicForm)
// Each field is assigned a group for modular section rendering
export const userSettingsFields = [
  // Profile group
  { name: "name", label: "Name", type: "text", group: "profile" },
  { name: "email", label: "Email", type: "email", group: "profile" },
  // { name: "image", label: "Profile Image", type: "image", group: "profile" },

  // Security group
  { name: "password", label: "Current Password", type: "password", helperText: "Leave blank to keep current password", group: "security" },
  { name: "newPassword", label: "New Password", type: "password", helperText: "Leave blank to keep current password", group: "security" },
  { name: "isTwoFactorEnabled", label: "Two-Factor Authentication", type: "switch", helperText: "Enable 2FA for your account", group: "security" },

  // Organization group
  { name: "defaultOrgId", label: "Default Organization", type: "select", options: [], group: "organization" }, // Fill options dynamically

  // Telegram group
  { name: "telegramChatId", label: "Telegram Chat ID", type: "text", group: "telegram" },
  { name: "telegramBotToken", label: "Telegram Bot Token", type: "text", group: "telegram" },
];
