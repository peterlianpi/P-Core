import { Hono } from "hono";
import { db } from "@/lib/db"; // Make sure this path is correct for your db setup

const app = new Hono()

  // GET: Retrieve all member role assignments
  .get("/", async (c) => {
    try {
      const roleAssignments = await db.memberRoleAssignment.findMany({
        include: {
          role: true, // Include the related role data
          member: true, // Include the related member data
        },
      });

      return c.json(roleAssignments);
    } catch (err) {
      console.error("Error fetching role assignments:", err);
      return c.json({ error: "Error fetching role assignments" }, 500);
    }
  })

  // GET: Retrieve all members with their id and name, and all roles with their id and name
  .get("/assign-role", async (c) => {
    try {
      // Fetch all members with only id and name
      const members = await db.member.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      // Fetch all roles with only id and name
      const roles = await db.memberRole.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      // Return both members and roles
      return c.json({ members, roles });
    } catch (err) {
      console.error("Error fetching members or roles:", err);
      return c.json(
        {
          error: "Error fetching members or roles",
        },
        500
      );
    }
  })

  // POST: Create a new role assignment
  .post("/role-assignments", async (c) => {
    try {
      const { memberId, roleId } = await c.req.json();

      // Check if the member and role exist
      const member = await db.member.findUnique({ where: { id: memberId } });
      const role = await db.memberRole.findUnique({ where: { id: roleId } });

      if (!member || !role) {
        return c.json({ error: "Member or Role not found" }, 404);
      }

      // Create the new role assignment
      const newRoleAssignment = await db.memberRoleAssignment.create({
        data: {
          memberId,
          roleId,
        },
      });

      return c.json(newRoleAssignment);
    } catch (err) {
      console.error("Error creating role assignment:", err);
      return c.json(
        {
          error: "Error creating role assignment",
        },
        500
      );
    }
  })

  // PATCH: Update an existing role assignment
  .patch("/role-assignments/:id", async (c) => {
    try {
      const roleAssignmentId = parseInt(c.req.param("id"));
      const { roleId, startedAt, endedAt } = await c.req.json();

      // Find the existing role assignment
      const roleAssignment = await db.memberRoleAssignment.findUnique({
        where: { id: roleAssignmentId },
      });

      if (!roleAssignment) {
        return c.json({ error: "Role Assignment not found" }, 404);
      }

      // Update the role assignment
      const updatedRoleAssignment = await db.memberRoleAssignment.update({
        where: { id: roleAssignmentId },
        data: {
          roleId,
          startedAt,
          endedAt,
        },
      });

      return c.json(updatedRoleAssignment);
    } catch (err) {
      console.error("Error updating role assignment:", err);
      return c.json(
        {
          error: "Error updating role assignment",
        },
        500
      );
    }
  })

  // DELETE: Delete a role assignment
  .delete("/role-assignments/:id", async (c) => {
    try {
      const roleAssignmentId = parseInt(c.req.param("id"));

      // Check if the role assignment exists
      const roleAssignment = await db.memberRoleAssignment.findUnique({
        where: { id: roleAssignmentId },
      });

      if (!roleAssignment) {
        return c.json({ error: "Role Assignment not found" }, 404);
      }

      // Delete the role assignment
      await db.memberRoleAssignment.delete({
        where: { id: roleAssignmentId },
      });

      return c.json({
        message: "Role Assignment deleted successfully",
      });
    } catch (err) {
      console.error("Error deleting role assignment:", err);
      return c.json(
        {
          error: "Error deleting role assignment",
        },
        500
      );
    }
  });

export default app;
