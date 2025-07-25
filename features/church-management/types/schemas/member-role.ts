import { z } from "zod";

export const MemberRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type MemberRole = z.infer<typeof MemberRoleSchema>;
