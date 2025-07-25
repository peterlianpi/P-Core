import { z } from "zod";

export const KhawkSchema = z.object({
  id: z.string(),
  name: z.string(),
  orgId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Khawk = z.infer<typeof KhawkSchema>;
