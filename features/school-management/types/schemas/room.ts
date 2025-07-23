import z from "zod";

// Room
export const roomSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  location: z.string().optional(),
  capacity: z.number().int().optional(),
  orgId: z.string(),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});
export type RoomForm = z.infer<typeof roomSchema>;
