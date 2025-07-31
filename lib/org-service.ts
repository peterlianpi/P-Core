// lib/org-service.ts
// Pure service functions for organization CRUD and user management
// These functions are decoupled from any framework and can be tested directly

import { PrismaClient, OrganizationType, OrganizationRole, UserOrganizationStatus, OrganizationInviteStatus } from '@prisma/client';

/**
 * Create a new organization and assign the creator as OWNER
 */
export async function createOrg(prisma: PrismaClient, userId: string, orgData: {
  name: string;
  description?: string | null;
  logoImage?: string | null;
  startedAt: Date;
  type: OrganizationType;
}) {
  return await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: {
        ...orgData,
        createdById: userId,
      },
    });
    await tx.userOrganization.create({
      data: {
        userId,
        organizationId: organization.id,
        role: OrganizationRole.OWNER,
        status: UserOrganizationStatus.ACTIVE,
      },
    });
    return organization;
  });
}

/**
 * Update organization details
 */
export async function updateOrg(prisma: PrismaClient, orgId: string, userId: string, updateData: Partial<{
  name?: string;
  description?: string | null;
  logoImage?: string | null;
  startedAt?: Date;
  type?: OrganizationType;
}>) {
  // Add permission checks as needed
  return await prisma.organization.update({
    where: { id: orgId },
    data: updateData,
  });
}

/**
 * Invite a user to an organization (creates an OrganizationInvite entry)
 */
export async function inviteUserToOrg(
  prisma: PrismaClient,
  orgId: string,
  email: string,
  invitedBy: string,
  role: OrganizationRole = OrganizationRole.MEMBER
) {
  return await prisma.organizationInvite.create({
    data: {
      invitedBy,
      email,
      organizationId: orgId,
      role,
      token: crypto.randomUUID(), // or your token logic
      status: OrganizationInviteStatus.PENDING,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week expiry
    },
  });
}

/**
 * Accept an organization invite (marks invite as accepted and adds user to org)
 */
export async function acceptOrgInvite(
  prisma: PrismaClient,
  inviteToken: string,
  userId: string
) {
  // Find the invite
  const invite = await prisma.organizationInvite.findUnique({
    where: { token: inviteToken },
  });
  if (!invite || invite.status !== OrganizationInviteStatus.PENDING) {
    throw new Error('Invalid or expired invite');
  }

  // Mark invite as accepted
  await prisma.organizationInvite.update({
    where: { token: inviteToken },
    data: { status: OrganizationInviteStatus.ACCEPTED },
  });

  // Add user to organization
  return await prisma.userOrganization.create({
    data: {
      userId,
      organizationId: invite.organizationId,
      role: invite.role ?? OrganizationRole.MEMBER,
      status: UserOrganizationStatus.ACTIVE,
    },
  });
}

/**
 * Remove a user from an organization (soft delete)
 */
export async function removeUserFromOrg(prisma: PrismaClient, orgId: string, userId: string) {
  return await prisma.userOrganization.update({
    where: {
      userId_organizationId: { userId, organizationId: orgId },
    },
    data: { status: UserOrganizationStatus.REMOVED, removedAt: new Date() },
  });
}

/**
 * Delete an organization
 */
export async function deleteOrg(prisma: PrismaClient, orgId: string) {
  return await prisma.organization.delete({ where: { id: orgId } });
}
