import { z } from "zod";

export const VengSchema = z.object({
  id: z.string(),
  name: z.string(),
  orgId: z.string(),
  khawkId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Veng = z.infer<typeof VengSchema>;
