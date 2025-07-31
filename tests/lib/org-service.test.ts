import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient, OrganizationType, OrganizationRole, UserOrganizationStatus, OrganizationInviteStatus } from '@prisma/client';
import {
  createOrg,
  updateOrg,
  inviteUserToOrg,
  acceptOrgInvite,
  removeUserFromOrg,
  deleteOrg,
} from '../../lib/org-service';

const prisma = new PrismaClient();

describe('Org Service', () => {
  let orgId: string;
  let inviteToken: string;
  const ownerUserId = 'test-owner-1';
  const invitedUserEmail = 'test-invitee@example.com';
  const invitedUserId = 'test-user-2';

  beforeAll(async () => {
    // Clean up any existing test data in the correct order
    await prisma.userOrganization.deleteMany({ where: { userId: { in: [ownerUserId, invitedUserId] } } });
    await prisma.organizationInvite.deleteMany({ where: { email: invitedUserEmail } });
    await prisma.organization.deleteMany({ where: { createdById: ownerUserId } });
    await prisma.user.deleteMany({ where: { id: { in: [ownerUserId, invitedUserId] } } });

    // Create owner user
    await prisma.user.create({
      data: {
        id: ownerUserId,
        email: 'owner@example.com',
        name: 'Owner User',
        password: 'test',
      },
    });
    // Create invitee user (for accept test)
    await prisma.user.create({
      data: {
        id: invitedUserId,
        email: invitedUserEmail,
        name: 'Invited User',
        password: 'test',
      },
    });
  });

  afterAll(async () => {
    // Clean up test data in the correct order
    await prisma.userOrganization.deleteMany({ where: { userId: { in: [ownerUserId, invitedUserId] } } });
    await prisma.organizationInvite.deleteMany({ where: { email: invitedUserEmail } });
    await prisma.organization.deleteMany({ where: { createdById: ownerUserId } });
    await prisma.user.deleteMany({ where: { id: { in: [ownerUserId, invitedUserId] } } });
    await prisma.$disconnect();
  });

  it('should create an organization', async () => {
    const orgData = {
      name: 'Test Org',
      description: 'A test organization',
      logoImage: null,
      startedAt: new Date(),
      type: OrganizationType.SCHOOL,
    };
    const org = await createOrg(prisma, ownerUserId, orgData);
    expect(org).toHaveProperty('id');
    orgId = org.id;
  });

  it('should invite a user to the organization', async () => {
    const invite = await inviteUserToOrg(prisma, orgId, invitedUserEmail, ownerUserId, OrganizationRole.MEMBER);
    expect(invite).toHaveProperty('status', OrganizationInviteStatus.PENDING);
    expect(invite).toHaveProperty('token');
    inviteToken = invite.token;
  });

  it('should accept an organization invite', async () => {
    const accepted = await acceptOrgInvite(prisma, inviteToken, invitedUserId);
    expect(accepted).toHaveProperty('status', UserOrganizationStatus.ACTIVE);
    expect(accepted).toHaveProperty('userId', invitedUserId);
    expect(accepted).toHaveProperty('organizationId', orgId);
  });

  it('should update the organization', async () => {
    const updated = await updateOrg(prisma, orgId, ownerUserId, { name: 'Updated Org Name' });
    expect(updated).toHaveProperty('name', 'Updated Org Name');
  });

  it('should remove a member from the organization', async () => {
    const removed = await removeUserFromOrg(prisma, orgId, invitedUserId);
    expect(removed).toHaveProperty('status', UserOrganizationStatus.REMOVED);
  });

  it('should delete the organization', async () => {
    // Clean up invites first to avoid FK constraint error
    await prisma.organizationInvite.deleteMany({ where: { organizationId: orgId } });
    const deleted = await deleteOrg(prisma, orgId);
    expect(deleted).toHaveProperty('id', orgId);
  });
});
