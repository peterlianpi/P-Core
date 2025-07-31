import { z } from "zod";

export const MemberRoleAssignmentSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  roleId: z.string(),
  assignedAt: z.date(),
  startedAt: z.date().optional(),
  endedAt: z.date().optional(),
});

export type MemberRoleAssignment = z.infer<typeof MemberRoleAssignmentSchema>;
