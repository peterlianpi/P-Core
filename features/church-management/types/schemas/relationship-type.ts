import { z } from "zod";

export const RelationshipTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type RelationshipType = z.infer<typeof RelationshipTypeSchema>;
