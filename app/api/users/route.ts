/**
 * Mock Users API - Frontend Only
 *
 * Pure frontend mock data for development and demo purposes
 * No backend dependencies - works as static data
 */

import { NextRequest, NextResponse } from 'next/server';

// Mock users data - complete dataset for frontend demo
const MOCK_USERS = [
  {
    id: 'user-1',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'USER',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'user-2',
    email: 'admin@company.com',
    name: 'Admin User',
    role: 'ADMIN',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'user-3',
    email: 'superadmin@company.com',
    name: 'Super Admin',
    role: 'SUPERADMIN',
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: 'user-4',
    email: 'john.teacher@school.edu',
    name: 'John Teacher',
    role: 'USER',
    isActive: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'user-5',
    email: 'jane.student@university.edu',
    name: 'Jane Student',
    role: 'USER',
    isActive: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'user-6',
    email: 'inactive.user@old.com',
    name: 'Inactive User',
    role: 'USER',
    isActive: false,
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-01')
  },
  {
    id: 'user-7',
    email: 'manager@business.com',
    name: 'Business Manager',
    role: 'ADMIN',
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: 'user-8',
    email: 'support@help.com',
    name: 'Support Staff',
    role: 'USER',
    isActive: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  }
];

// GET /api/users - Get users with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');

    // Apply filters
    let filteredUsers = [...MOCK_USERS];

    // Role filter
    if (role && role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // Active status filter
    if (isActive !== null && isActive !== undefined && isActive !== 'all') {
      const activeFilter = isActive === 'true';
      filteredUsers = filteredUsers.filter(user => user.isActive === activeFilter);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    filteredUsers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const total = filteredUsers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const users = filteredUsers.slice(startIndex, endIndex);

    // Simulate API delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      success: true
    });

  } catch (error) {
    console.error('Mock API Error:', error);
    return NextResponse.json(
      { error: 'Mock API error', success: false },
      { status: 500 }
    );
  }
}

// Mock POST - Simulate user creation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, role, isActive = true } = body;

    // Basic validation
    if (!email || !name || !role) {
      return NextResponse.json(
        { error: 'Email, name, and role are required', success: false },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = MOCK_USERS.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists', success: false },
        { status: 409 }
      );
    }

    // Create mock user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    return NextResponse.json({
      user: newUser,
      message: 'User created successfully',
      success: true
    }, { status: 201 });

  } catch (error) {
    console.error('Mock API Error:', error);
    return NextResponse.json(
      { error: 'Mock API error', success: false },
      { status: 500 }
    );
  }
}

// Mock PUT - Simulate user update
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const id = pathParts[pathParts.length - 1];

    if (!id) {
      return NextResponse.json(
        { error: 'User ID required', success: false },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, role, isActive } = body;

    // Find user
    const userIndex = MOCK_USERS.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Update user
    const updatedUser = {
      ...MOCK_USERS[userIndex],
      ...(name !== undefined && { name }),
      ...(role !== undefined && { role }),
      ...(isActive !== undefined && { isActive }),
      updatedAt: new Date()
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));

    return NextResponse.json({
      user: updatedUser,
      message: 'User updated successfully',
      success: true
    });

  } catch (error) {
    console.error('Mock API Error:', error);
    return NextResponse.json(
      { error: 'Mock API error', success: false },
      { status: 500 }
    );
  }
}

// Mock DELETE - Simulate user deletion
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const id = pathParts[pathParts.length - 1];

    if (!id) {
      return NextResponse.json(
        { error: 'User ID required', success: false },
        { status: 400 }
      );
    }

    // Find user
    const user = MOCK_USERS.find(user => user.id === id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      message: 'User deleted successfully',
      success: true
    });

  } catch (error) {
    console.error('Mock API Error:', error);
    return NextResponse.json(
      { error: 'Mock API error', success: false },
      { status: 500 }
    );
  }
}
