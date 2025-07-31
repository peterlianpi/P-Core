import { describe, it, expect, beforeAll } from 'vitest';
import * as emailTemplates from '../../../lib/mail/email-templates';

// Mock mailConfig used in email-templates.ts
beforeAll(() => {
  // @ts-ignore
  emailTemplates.mailConfig = {
    appUrl: 'https://mock-app.com',
    systemName: 'MockSystem',
    systemYear: '2099',
  };
});

const footer = `© 2099 MockSystem. All rights reserved.`;

describe('twoFactorTemplate', () => {
  it('should generate correct subject and include token and footer', () => {
    const token = '123456';
    const result = emailTemplates.twoFactorTemplate(token);
    expect(result.subject).toBe('Your 2FA Code');
    expect(result.html).toContain(token);
    expect(result.html).toContain(footer);
  });
});

describe('passwordResetTemplate', () => {
  it('should generate correct subject and include reset link and footer', () => {
    const token = 'reset-token';
    const result = emailTemplates.passwordResetTemplate(token);
    expect(result.subject).toBe('Reset Your Password');
    expect(result.html).toContain(`https://mock-app.com/auth/reset-password?token=${token}`);
    expect(result.html).toContain(footer);
  });
});

describe('verificationTemplate', () => {
  it('should generate correct subject and include verification link and footer', () => {
    const token = 'verify-token';
    const result = emailTemplates.verificationTemplate(token);
    expect(result.subject).toBe('Confirm Your Email');
    expect(result.html).toContain(`https://mock-app.com/auth/new-verification?token=${token}`);
    expect(result.html).toContain(footer);
  });
});

describe('inviteTemplate', () => {
  it('should generate correct subject and include invite link and footer', () => {
    const link = 'https://mock-app.com/invite/abc';
    const result = emailTemplates.inviteTemplate(link);
    expect(result.subject).toBe("You're Invited to Join P-Core System!");
    expect(result.html).toContain(link);
    expect(result.html).toContain(footer);
  });
});

describe('orgInviteTemplate', () => {
  it('should generate correct subject and include org name, link, and footer', () => {
    const link = 'https://mock-app.com/invite/org';
    const orgName = 'TestOrg';
    const result = emailTemplates.orgInviteTemplate(link, orgName);
    expect(result.subject).toContain(orgName);
    expect(result.html).toContain(link);
    expect(result.html).toContain(orgName);
    expect(result.html).toContain(footer);
  });
});
