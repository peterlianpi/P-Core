"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { auth } from "@/auth"
import { UserRole } from "@prisma/client"

// User validation schemas
export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(UserRole).default(UserRole.USER),
  image: z.string().url().optional(),
  emailVerified: z.date().optional(),
  isTwoFactorEnabled: z.boolean().default(false),
})

export const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  role: z.nativeEnum(UserRole).optional(),
  image: z.string().url().optional(),
  emailVerified: z.date().optional(),
  isTwoFactorEnabled: z.boolean().optional(),
})

export const GetUserSchema = z.object({
  id: z.string(),
})

// Create a new user
export async function createUser(values: z.infer<typeof CreateUserSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Only superadmin and admin can create users
    if (session.user.role !== UserRole.SUPERADMIN && session.user.role !== UserRole.ADMIN) {
      return { error: "Insufficient permissions" }
    }

    const validatedFields = CreateUserSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { name, email, password, role, image, emailVerified, isTwoFactorEnabled } = validatedFields.data

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { error: "User already exists with this email" }
    }

    // Hash password (you'll need to import bcryptjs)
    const bcrypt = await import("bcryptjs")
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        image,
        emailVerified,
        isTwoFactorEnabled,
      },
    })

    return { success: "User created successfully", user: { ...user, password: undefined } }
  } catch (error) {
    console.error("Error creating user:", error)
    return { error: "Failed to create user" }
  }
}

// Get user by ID
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

    const user = await db.user.findUnique({
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

// Get all users (with pagination)
export async function getUsers(page: number = 1, limit: number = 10, search?: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Only admin and superadmin can view all users
    if (session.user.role !== UserRole.SUPERADMIN && session.user.role !== UserRole.ADMIN) {
      return { error: "Insufficient permissions" }
    }

    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}

    const [users, total] = await Promise.all([
      db.user.findMany({
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
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.user.count({ where }),
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

// Update user
export async function updateUser(values: z.infer<typeof UpdateUserSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = UpdateUserSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { id, ...updateData } = validatedFields.data

    // Users can only update themselves unless they're admin/superadmin
    if (
      session.user.id !== id &&
      session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.SUPERADMIN
    ) {
      return { error: "Insufficient permissions" }
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return { error: "User not found" }
    }

    // If updating email, check if it's already taken
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await db.user.findUnique({
        where: { email: updateData.email },
      })

      if (emailExists) {
        return { error: "Email already in use" }
      }
    }

    const updatedUser = await db.user.update({
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

// Delete user
export async function deleteUser(values: z.infer<typeof GetUserSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Only superadmin can delete users
    if (session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Insufficient permissions" }
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
    const existingUser = await db.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return { error: "User not found" }
    }

    await db.user.delete({
      where: { id },
    })

    return { success: "User deleted successfully" }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { error: "Failed to delete user" }
  }
}