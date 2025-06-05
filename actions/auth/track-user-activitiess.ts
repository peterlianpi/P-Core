"use server";
import { loginDate } from "@/helpers/date-format";
import { notifySuperAdmins } from "@/lib/notify-superadmin";

type UserEvent = { value: string };

export const trackRegister = async ({ value }: UserEvent) => {
  await {
    title: "\n*👤 P-Core User Registration Notification*",
    message: `A new user has been registered in the system.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n__This registration event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  };
};

export const trackLogout = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Logout Notification*",
    message: `A user has successfully signed out from the system.\n\n*User:* ${value}\n*Date:* ${loginDate}\n\n_This logout event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackLogin = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Login Notification*",
    message: `A user has successfully signed in to the system.\n\n*User:* ${value}\n*Date:* ${loginDate}\n\n_This login event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackReset = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Password Reset Requested*",
    message: `A user has requested a password reset.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This login event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackUpdate = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core User Update Notification*",
    message: `A user has updated their profile information.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This update event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackDelete = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core User Deletion Notification*",
    message: `A user has been deleted from the system.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This deletion event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackTwoFactorEnabled = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Two-Factor Authentication Notification*",
    message: `A user has enabled two-factor authentication.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This two-factor event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackTwoFactorDisabled = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Two-Factor Authentication Disabled Notification*",
    message: `A user has disabled two-factor authentication.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This two-factor disabled event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackEmailChange = async ({
  old,
  new: newEmail,
}: {
  old: string;
  new: string;
}) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Email Change Notification*",
    message: `A user has changed their email address.\n\n*Previous Email:* ${old || "Unknown"}\n*New Email:* ${newEmail || "Unknown"}\n*Date:* ${loginDate}\n\n_This email change event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackPasswordChange = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Password Change Notification*",
    message: `A user has changed their password.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This password change event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackTwoFactorToken = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Two-Factor Token Notification*",
    message: `A user has requested a two-factor authentication token.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This two-factor token event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackVerification = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Email Verification Notification*",
    message: `A user has requested an email verification.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This verification event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackLoginAttempt = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Login Attempt Notification*",
    message: `A user has attempted to log in to the system.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This login attempt event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

type OrganizationEvent = { userId: string; organizationId: string };

export const trackOrganizationCreatedBy = async ({
  userId,
  organizationId,
}: OrganizationEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Organization Created Notification*",
    message: `A new organization ${organizationId} has been created by ${userId} in the system.\n\n*Date:* ${loginDate}\n\n_This organization creation event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};

export const trackTelegramSetting = async ({ value }: UserEvent) => {
  await notifySuperAdmins({
    title: "\n*👤 P-Core Telegram Setting Notification*",
    message: `A user has updated their Telegram settings.\n\n*User:* ${value ?? "Unknown"}\n*Date:* ${loginDate}\n\n_This Telegram setting event is for monitoring purposes only._\n\n_P-Core Activity Log_`,
    type: "INFO",
  });
};
