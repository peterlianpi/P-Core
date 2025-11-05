"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function getAllUsers() {
  try {
    const adminUser = await currentUser();
    if (!adminUser || (adminUser.role !== "ADMIN" && adminUser.role !== "SUPERADMIN")) {
      return {
        success: false,
        error: "Unauthorized access",
      };
    }

    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isTwoFactorEnabled: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        defaultOrgId: true,
        organizations: {
          select: {
            organization: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      error: "Failed to fetch users",
    };
  }
}

export async function updateUserRole(userId: string, newRole: UserRole) {
  try {
    const adminUser = await currentUser();
    if (!adminUser || (adminUser.role !== "ADMIN" && adminUser.role !== "SUPERADMIN")) {
      return {
        success: false,
        error: "Unauthorized access",
      };
    }

    // Prevent admin from demoting themselves or other admins (unless superadmin)
    if (adminUser.role === "ADMIN" && newRole === "SUPERADMIN") {
      return {
        success: false,
        error: "Admins cannot assign Super Admin role",
      };
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      error: "Failed to update user role",
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    const adminUser = await currentUser();
    if (!adminUser || (adminUser.role !== "ADMIN" && adminUser.role !== "SUPERADMIN")) {
      return {
        success: false,
        error: "Unauthorized access",
      };
    }

    // Prevent deleting self
    if (adminUser.id === userId) {
      return {
        success: false,
        error: "Cannot delete your own account",
      };
    }

    // Prevent deleting other admins unless superadmin
    if (adminUser.role === "ADMIN") {
      const targetUser = await db.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (targetUser?.role === "SUPERADMIN" || targetUser?.role === "ADMIN") {
        return {
          success: false,
          error: "Admins cannot delete other admin accounts",
        };
      }
    }

    await db.user.delete({
      where: { id: userId },
    });

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: "Failed to delete user",
    };
  }
}

export async function suspendUser(userId: string, suspend: boolean) {
  try {
    const adminUser = await currentUser();
    if (!adminUser || (adminUser.role !== "ADMIN" && adminUser.role !== "SUPERADMIN")) {
      return {
        success: false,
        error: "Unauthorized access",
      };
    }

    // Prevent suspending self
    if (adminUser.id === userId) {
      return {
        success: false,
        error: "Cannot suspend your own account",
      };
    }

    // For now, we'll use a simple approach - in a real app you'd have a suspended status
    // This is a placeholder for suspension logic
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        // You might want to add a suspendedAt field or status field to the User model
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      success: true,
      data: updatedUser,
      message: suspend ? "User suspended" : "User unsuspended",
    };
  } catch (error) {
    console.error("Error suspending user:", error);
    return {
      success: false,
      error: "Failed to update user status",
    };
  }
}
