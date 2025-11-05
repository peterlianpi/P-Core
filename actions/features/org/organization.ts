/**
 * Organization Actions
 * Mock server actions for organization management (frontend-only system)
 */

'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { currentUser } from '@/lib/auth';
import { teamFormSchema } from '@/lib/schemas';

// Mock organization data
let mockOrganizations = [
  {
    id: '1',
    name: 'Springfield Elementary School',
    description: 'A community-focused elementary school',
    type: 'SCHOOL',
    logoImage: null,
    startedAt: new Date('2020-01-01'),
    createdBy: 'user-1',
    role: 'OWNER',
  },
  {
    id: '2',
    name: 'Grace Community Church',
    description: 'A welcoming church for all',
    type: 'CHURCH',
    logoImage: null,
    startedAt: new Date('2015-01-01'),
    createdBy: 'user-1',
    role: 'ADMIN',
  },
  {
    id: '3',
    name: 'City Public Library',
    description: 'Knowledge center for the community',
    type: 'LIBRARY',
    logoImage: null,
    startedAt: new Date('2010-01-01'),
    createdBy: 'user-1',
    role: 'MEMBER',
  },
];

const updateOrganizationSchema = z.object({
  organizationId: z.string(),
  value: teamFormSchema.omit({ id: true }),
});

type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;

export async function updateOrganization(input: UpdateOrganizationInput) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const validatedInput = updateOrganizationSchema.parse(input);

    // Find the organization
    const orgIndex = mockOrganizations.findIndex(org => org.id === validatedInput.organizationId);

    if (orgIndex === -1) {
      return {
        success: false,
        error: 'Organization not found',
      };
    }

    // Check if user has permission to update this organization
    const organization = mockOrganizations[orgIndex];
    if (!['OWNER', 'ADMIN', 'SUPER_ADMIN'].includes(organization.role)) {
      return {
        success: false,
        error: 'Insufficient permissions',
      };
    }

    // Update the organization
    mockOrganizations[orgIndex] = {
      ...organization,
      name: validatedInput.value.name,
      description: validatedInput.value.description || '',
      logoImage: null,
      startedAt: validatedInput.value.startedAt || new Date(),
      type: validatedInput.value.type || 'OTHER',
    };

    revalidatePath('/organization');
    revalidatePath('/dashboard');

    return {
      success: true,
      data: mockOrganizations[orgIndex],
    };
  } catch (error) {
    console.error('Failed to update organization:', error);
    return {
      success: false,
      error: 'Failed to update organization',
    };
  }
}

export async function getOrganizationsByUserId(userId: string) {
  try {
    // Return mock organizations for the current user
    return {
      success: true,
      data: mockOrganizations,
    };
  } catch (error) {
    console.error('Failed to fetch organizations:', error);
    return {
      success: false,
      error: 'Failed to fetch organizations',
    };
  }
}

export async function createOrganization(input: {
  name: string;
  description?: string;
  type?: string;
  logoImage?: string;
}) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Create a new mock organization
    const newOrg = {
      id: Date.now().toString(),
      name: input.name,
      description: input.description || '',
      type: input.type || 'OTHER',
      logoImage: null,
      startedAt: new Date(),
      createdBy: user.id,
      role: 'OWNER' as const,
    };

    mockOrganizations.push(newOrg);

    revalidatePath('/organization');
    revalidatePath('/dashboard');

    return {
      success: true,
      data: newOrg,
    };
  } catch (error) {
    console.error('Failed to create organization:', error);
    return {
      success: false,
      error: 'Failed to create organization',
    };
  }
}

export async function deleteOrganization(organizationId: string) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Find the organization
    const orgIndex = mockOrganizations.findIndex(org => org.id === organizationId);

    if (orgIndex === -1) {
      return {
        success: false,
        error: 'Organization not found',
      };
    }

    // Check if user is the owner
    const organization = mockOrganizations[orgIndex];
    if (organization.role !== 'OWNER') {
      return {
        success: false,
        error: 'Only owners can delete organizations',
      };
    }

    // Remove the organization
    mockOrganizations.splice(orgIndex, 1);

    revalidatePath('/organization');
    revalidatePath('/dashboard');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Failed to delete organization:', error);
    return {
      success: false,
      error: 'Failed to delete organization',
    };
  }
}
