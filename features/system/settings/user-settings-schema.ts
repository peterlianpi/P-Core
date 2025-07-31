import { z } from "zod";

// Zod schema for PATCH (all fields optional, including role)
// export const userSettingsSchema = z.object({
//   id: z.string().optional(),
//   name: z.string().optional(),
//   email: z.string().email().optional(),
//   image: z.any().optional(),
//   password: z.string().min(8).optional(),
//   newPassword: z.string().min(8).optional(),
//   isTwoFactorEnabled: z.boolean().optional(),
//   defaultOrgId: z.string().optional(),
//   telegramChatId: z.string().optional(),
//   telegramBotToken: z.string().optional(),
//   role: z.enum(["SUPERADMIN", "ADMIN", "USER"]).optional(),
// });

export const userSettingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  image: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  newPassword: z.string().min(8, "Password must be at least 8 characters").optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  defaultOrgId: z.string().optional(),
  telegramChatId: z.string().optional(),
  telegramBotToken: z.string().optional(),
})