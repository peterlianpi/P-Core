import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { UserRole } from "@prisma/client";

/**
 * PATCH /api/superadmin/users/[userId]/role
 * Update user role specifically
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
    const { role } = body;

    // Validate role
    if (!role || !Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: "Valid role is required" },
        { status: 400 }
      );
    }

    // Prevent superadmin from demoting themselves
    if (params.userId === session.user.id && role !== UserRole.SUPERADMIN) {
      return NextResponse.json(
        { error: "Cannot change your own superadmin role" },
        { status: 400 }
      );
    }

    // Check if target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: params.userId },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update the user role
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: { role: role as UserRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true
      }
    });

    // Log the role change for audit purposes
    console.log(`Role change: User ${session.user.id} changed ${targetUser.email} role from ${targetUser.role} to ${role}`);

    return NextResponse.json({ 
      message: "User role updated successfully",
      user: updatedUser,
      previousRole: targetUser.role
    });

  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}