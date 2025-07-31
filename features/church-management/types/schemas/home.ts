import { z } from "zod";

export const HomeSchema = z.object({
  id: z.string(),
  homeNumber: z.string(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  orgId: z.string(),
  vengId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Home = z.infer<typeof HomeSchema>;
