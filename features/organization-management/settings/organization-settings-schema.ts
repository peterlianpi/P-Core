import { z } from "zod";

export const organizationSettingsSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  description: z.string().optional(),
  logoImage: z.string().url().optional(),
  type: z.enum(["SCHOOL", "TRAINING_CENTER",  "CORPORATE", "CHURCH", "OTHER"]),
  startedAt: z.string().optional(),
});
