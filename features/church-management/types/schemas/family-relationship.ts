import { z } from "zod";

export const FamilyRelationshipSchema = z.object({
  id: z.string(),
  fromId: z.string(),
  toId: z.string(),
  typeId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type FamilyRelationship = z.infer<typeof FamilyRelationshipSchema>;
