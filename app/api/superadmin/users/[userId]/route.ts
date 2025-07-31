import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { UserRole } from "@prisma/client";

/**
 * GET /api/superadmin/users/[userId]
 * Fetch specific user details
 * Requires SUPERADMIN role
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user is superadmin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== UserRole.SUPERADMIN) {
      return NextResponse.json(
        { error: "Superadmin access required" },
        { status: 403 }
      );
    }

    // Fetch the specific user
    const targetUser = await prisma.user.findUnique({
      where: { id: params.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
        isTwoFactorEnabled: true,
        image: true,
        organizations: {
          select: {
            role: true,
            status: true,
            joinedAt: true,
            organization: {
              select: {
                id: true,
                name: true,
                type: true
              }
            }
          }
        }
      }
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: targetUser });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/superadmin/users/[userId]
 * Update user details (role, status, etc.)
 * Requires SUPERADMIN role
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user is superadmin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== UserRole.SUPERADMIN) {
      return NextResponse.json(
        { error: "Superadmin access required" },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { role, name, email } = body;

    // Validate role if provided
    if (role && !Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    // Prevent superadmin from demoting themselves
    if (params.userId === session.user.id && role && role !== UserRole.SUPERADMIN) {
      return NextResponse.json(
        { error: "Cannot change your own superadmin role" },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: any = {};
    if (role) updateData.role = role;
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ 
      message: "User updated successfully",
      user: updatedUser 
    });

  } catch (error) {
    console.error("Error updating user:", error);
    
    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/superadmin/users/[userId]
 * Delete a user (soft delete recommended)
 * Requires SUPERADMIN role
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user is superadmin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== UserRole.SUPERADMIN) {
      return NextResponse.json(
        { error: "Superadmin access required" },
        { status: 403 }
      );
    }

    // Prevent superadmin from deleting themselves
    if (params.userId === session.user.id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Check if user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: params.userId }
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // For safety, we'll implement a soft delete by updating the email
    // This preserves data integrity while making the account unusable
    await prisma.user.update({
      where: { id: params.userId },
      data: {
        email: `deleted_${Date.now()}_${targetUser.email}`,
        name: `[DELETED] ${targetUser.name}`,
        emailVerified: null
      }
    });

    return NextResponse.json({ 
      message: "User deleted successfully" 
    });

  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}