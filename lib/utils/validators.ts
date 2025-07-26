import { z } from "zod";

export const paramSchema = z.object({
  id: z.string().optional(),
});

export const querySchema = z.object({
  orgId: z.string().optional(),
});
