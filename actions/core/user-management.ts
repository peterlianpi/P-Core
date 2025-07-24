"use server"

import { userDBPrismaClient as prisma } from "@/lib/prisma-client/user-prisma-client"
import { z } from "zod"
import { auth } from "@/auth"
import { UserRole } from "../../prisma-user-database/user-database-client-types"
import bcrypt from "bcryptjs"

// User validation schemas for P-Core
export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(UserRole).default(UserRole.USER),
  image: z.string().url().optional(),
  isTwoFactorEnabled: z.boolean().default(false),
})

export const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  role: z.nativeEnum(UserRole).optional(),
  image: z.string().url().optional(),
  isTwoFactorEnabled: z.boolean().optional(),
})

export const GetUserSchema = z.object({
  id: z.string(),
})

// Create a new user (SUPERADMIN only)
export async function createUser(values: z.infer<typeof CreateUserSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Only SUPERADMIN can create users
    if (session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. Only superadmin can create users." }
    }

    const validatedFields = CreateUserSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields", details: validatedFields.error.flatten() }
    }

    const { name, email, password, role, image, isTwoFactorEnabled } = validatedFields.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { error: "User already exists with this email" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        image,
        isTwoFactorEnabled,
        emailVerified: new Date(), // Auto-verify for admin created users
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        emailVerified: true,
        isTwoFactorEnabled: true,
        createdAt: true,
      }
    })

    return { success: "User created successfully", user }
  } catch (error) {
    console.error("Error creating user:", error)
    return { error: "Failed to create user" }
  }
}

// Get user by ID (with role-based access)
export async function getUserById(values: z.infer<typeof GetUserSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = GetUserSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { id } = validatedFields.data

    // Users can only view themselves unless they're SUPERADMIN
    if (session.user.id !== id && session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. You can only view your own profile." }
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        emailVerified: true,
        isTwoFactorEnabled: true,
        createdAt: true,
        updatedAt: true,
        UserOrganization: {
          select: {
            id: true,
            organizationId: true,
            role: true,
            status: true,
            organization: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
                isActive: true,
              }
            }
          }
        }
      },
    })

    if (!user) {
      return { error: "User not found" }
    }

    return { success: "User found", user }
  } catch (error) {
    console.error("Error getting user:", error)
    return { error: "Failed to get user" }
  }
}

// Get all users (SUPERADMIN only, with pagination and search)
export async function getUsers(page: number = 1, limit: number = 10, search?: string, role?: UserRole) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Only SUPERADMIN can view all users
    if (session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. Only superadmin can view all users." }
    }

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }
    
    if (role) {
      where.role = role
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          emailVerified: true,
          isTwoFactorEnabled: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              UserOrganization: true,
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ])

    return {
      success: "Users retrieved successfully",
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("Error getting users:", error)
    return { error: "Failed to get users" }
  }
}

// Update user (self or SUPERADMIN)
export async function updateUser(values: z.infer<typeof UpdateUserSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = UpdateUserSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields", details: validatedFields.error.flatten() }
    }

    const { id, ...updateData } = validatedFields.data

    // Users can only update themselves unless they're SUPERADMIN
    if (session.user.id !== id && session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. You can only update your own profile." }
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return { error: "User not found" }
    }

    // Only SUPERADMIN can change roles
    if (updateData.role && session.user.role !== UserRole.SUPERADMIN) {
      delete updateData.role
    }

    // If updating email, check if it's already taken
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: updateData.email },
      })

      if (emailExists) {
        return { error: "Email already in use" }
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        emailVerified: true,
        isTwoFactorEnabled: true,
        updatedAt: true,
      },
    })

    return { success: "User updated successfully", user: updatedUser }
  } catch (error) {
    console.error("Error updating user:", error)
    return { error: "Failed to update user" }
  }
}

// Delete user (SUPERADMIN only)
export async function deleteUser(values: z.infer<typeof GetUserSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Only SUPERADMIN can delete users
    if (session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. Only superadmin can delete users." }
    }

    const validatedFields = GetUserSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { id } = validatedFields.data

    // Prevent self-deletion
    if (session.user.id === id) {
      return { error: "Cannot delete your own account" }
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: {
        UserOrganization: true,
      }
    })

    if (!existingUser) {
      return { error: "User not found" }
    }

    // Check if user has organization memberships
    if (existingUser.UserOrganization.length > 0) {
      return { 
        error: "Cannot delete user with active organization memberships. Remove from organizations first." 
      }
    }

    await prisma.user.delete({
      where: { id },
    })

    return { success: "User deleted successfully" }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { error: "Failed to delete user" }
  }
}

// Get user statistics (SUPERADMIN only)
export async function getUserStatistics() {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Only SUPERADMIN can view statistics
    if (session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. Only superadmin can view statistics." }
    }

    const [
      totalUsers,
      adminUsers,
      regularUsers,
      managerUsers,
      superadminUsers,
      verifiedUsers,
      twoFactorUsers,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.user.count({ where: { role: UserRole.USER } }),
      prisma.user.count({ where: { role: UserRole.MANAGER } }),
      prisma.user.count({ where: { role: UserRole.SUPERADMIN } }),
      prisma.user.count({ where: { emailVerified: { not: null } } }),
      prisma.user.count({ where: { isTwoFactorEnabled: true } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      }),
    ])

    const stats = {
      total: totalUsers,
      byRole: {
        admin: adminUsers,
        user: regularUsers,
        manager: managerUsers,
        superadmin: superadminUsers,
      },
      verified: verifiedUsers,
      twoFactorEnabled: twoFactorUsers,
      recentRegistrations: recentUsers,
      verificationRate: totalUsers > 0 ? (verifiedUsers / totalUsers) * 100 : 0,
      twoFactorRate: totalUsers > 0 ? (twoFactorUsers / totalUsers) * 100 : 0,
    }

    return { success: "Statistics retrieved successfully", stats }
  } catch (error) {
    console.error("Error getting user statistics:", error)
    return { error: "Failed to get user statistics" }
  }
}

// Change user password (self or SUPERADMIN)
export async function changeUserPassword(userId: string, currentPassword: string, newPassword: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Users can only change their own password unless they're SUPERADMIN
    if (session.user.id !== userId && session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. You can only change your own password." }
    }

    if (newPassword.length < 6) {
      return { error: "Password must be at least 6 characters long" }
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { error: "User not found" }
    }

    // For self-password change, verify current password
    if (session.user.id === userId) {
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password || "")
      if (!isCurrentPasswordValid) {
        return { error: "Current password is incorrect" }
      }
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    })

    return { success: "Password changed successfully" }
  } catch (error) {
    console.error("Error changing password:", error)
    return { error: "Failed to change password" }
  }
}