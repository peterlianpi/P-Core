import { z } from "zod";
import { OrganizationType } from "@prisma/client";

export const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  description: z.string().optional(),
  logoImage: z.string().url().optional().or(z.literal('')),
  startedAt: z.date().optional(),
  type:  z.enum(OrganizationType)
    .optional(),
});

export type OrganizationSchema = z.infer<typeof organizationSchema>; 