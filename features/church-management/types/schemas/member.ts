import { z } from "zod";

export const MemberSchema = z.object({
  id: z.string(),
  number: z.number().optional(),
  name: z.string(),
  birthdate: z.date().optional(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  bloodType: z.string().optional(),
  image: z.string().optional(),
  fbLink: z.string().optional(),
  orgId: z.string(),
  homeId: z.string().optional(),
  spouseId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Member = z.infer<typeof MemberSchema>;
