import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { UserRole } from "@prisma/client";

/**
 * GET /api/superadmin/organizations
 * Fetch all organizations with filtering capabilities
 * Requires SUPERADMIN role
 */
export async function GET(request: NextRequest) {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Build where clause for filtering
    const whereClause: any = {};

    // Add search filter
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Add type filter
    if (type && type !== '') {
      whereClause.type = type;
    }

    // Fetch organizations with pagination and filtering
    const [organizations, totalCount] = await Promise.all([
      prisma.organization.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          type: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              users: true
            }
          },
          createdBy: {
            select: {
              name: true,
              email: true
            }
          },
          users: {
            take: 5, // Get first 5 users for preview
            select: {
              role: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  image: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.organization.count({ where: whereClause })
    ]);

    return NextResponse.json({
      organizations,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/superadmin/organizations
 * Create a new organization (superadmin only)
 * Requires SUPERADMIN role
 */
export async function POST(request: NextRequest) {
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
    const { name, type, description, ownerId } = body;

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 }
      );
    }

    // Validate owner if provided
    if (ownerId) {
      const owner = await prisma.user.findUnique({
        where: { id: ownerId }
      });

      if (!owner) {
        return NextResponse.json(
          { error: "Invalid owner ID" },
          { status: 400 }
        );
      }
    }

    // Create the organization
    const organization = await prisma.organization.create({
      data: {
        name,
        type,
        description: description || null,
        createdById: session.user.id, // Superadmin creates it
        users: ownerId ? {
          create: {
            userId: ownerId,
            role: "OWNER",
            status: "ACTIVE"
          }
        } : undefined
      },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            users: true
          }
        }
      }
    });

    return NextResponse.json({ 
      message: "Organization created successfully",
      organization 
    });

  } catch (error) {
    console.error("Error creating organization:", error);
    
    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: "Organization name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}