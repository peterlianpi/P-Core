// E2E test for org API using Playwright
// Run with: npx playwright test
// Make sure your dev server is running (bun run dev or npm run dev)

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'; // Adjust if your dev server runs on a different port

test.describe('Organization API E2E', () => {
  let orgId: string;
  let inviteToken: string;
  const ownerEmail = 'owner-e2e@example.com';
  const ownerPassword = 'test';
  const inviteeEmail = 'invitee-e2e@example.com';
  const inviteePassword = 'test';

  test('should create an organization', async ({ request }) => {
    // Simulate user signup/login if your API requires auth (adjust as needed)
    // For demo, assume you can POST directly
    const res = await request.post(`${BASE_URL}/api/org`, {
      data: {
        name: 'E2E Org',
        description: 'E2E test org',
        logoImage: null,
        startedAt: new Date().toISOString(),
        type: 'SCHOOL',
        userId: 'owner-e2e', // Adjust if your API expects userId in query/body
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('id');
    orgId = body.id;
  });

  test('should invite a user to the organization', async ({ request }) => {
    // Adjust endpoint and payload as per your API
    const res = await request.post(`${BASE_URL}/api/org/invite`, {
      data: {
        orgId,
        email: inviteeEmail,
        invitedBy: 'owner-e2e',
        role: 'MEMBER',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('token');
    inviteToken = body.token;
  });

  test('should accept an organization invite', async ({ request }) => {
    // Adjust endpoint and payload as per your API
    const res = await request.post(`${BASE_URL}/api/org/accept-invite`, {
      data: {
        token: inviteToken,
        userId: 'invitee-e2e',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('status', 'ACTIVE');
  });

  test('should update the organization', async ({ request }) => {
    const res = await request.patch(`${BASE_URL}/api/org/${orgId}`, {
      data: {
        name: 'E2E Org Updated',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('name', 'E2E Org Updated');
  });

  test('should remove a member from the organization', async ({ request }) => {
    const res = await request.patch(`${BASE_URL}/api/org/${orgId}/remove-member`, {
      data: {
        userId: 'invitee-e2e',
        adminUserId: 'owner-e2e',
      },
    });
    expect([200, 204]).toContain(res.status());
    const body = await res.json();
    expect(body).toHaveProperty('message');
  });

  test('should delete the organization', async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/api/org/${orgId}`, {
      data: {
        userId: 'owner-e2e',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('message');
  });
});
