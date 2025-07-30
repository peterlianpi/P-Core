"use client";
import { useState } from "react";
import { DynamicForm } from "@/features/system/dynamic-components/components/dynamic-form";
import { userSettingsSchema } from "./user-settings-schema";
import { userSettingsFields } from "./user-settings-fields";
import { toast } from "sonner";
import { settings } from "@/actions/settings/settings";
import { useSession } from "next-auth/react";
import { useOrgData } from "@/features/organization-management";
import { z } from "zod";
import type { UserRole } from "@prisma/client";

// --- Type Definitions ---
export type TelegramSetting = {
  telegramChatId?: string;
  telegramBotToken?: string;
  isActive?: boolean;
};

export type Organization = {
  organization: { id: string; name: string };
};

export type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  isTwoFactorEnabled?: boolean;
  defaultOrgId?: string;
  role?: UserRole;
};

export type UserSettingsUpdate = z.infer<typeof userSettingsSchema> & { role: UserRole };

type TabKey = "profile" | "security" | "organization" | "telegram";
const TABS: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "security", label: "Security" },
  { key: "organization", label: "Organization" },
  { key: "telegram", label: "Telegram" },
];

interface UserSettingsFormProps {
  user: User;
  telegram?: TelegramSetting;
}

export function UserSettingsForm({ user, telegram }: UserSettingsFormProps) {
  if (!user) return null;

  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const { organizations } = useOrgData();
  const { update } = useSession();

  // Normalize telegram fields to string | undefined
  const normalizedTelegram: TelegramSetting | undefined = telegram
    ? {
        telegramChatId: telegram.telegramChatId ?? undefined,
        telegramBotToken: telegram.telegramBotToken ?? undefined,
        isActive: telegram.isActive,
      }
    : undefined;

  // Fill organization options dynamically for the dropdown
  const orgOptions =
    organizations?.map((org) => ({
      value: org.organization.id,
      label: org.organization.name,
    })) || [];

  // Group fields by logical section
  const groupedFields = {
    profile: userSettingsFields
      .filter(f => f.group === "profile")
      .map(f => f.name === "defaultOrgId" ? { ...f, options: orgOptions } : f),
    security: userSettingsFields
      .filter(f => f.group === "security")
      .map(f => f.name === "defaultOrgId" ? { ...f, options: orgOptions } : f),
    organization: userSettingsFields
      .filter(f => f.group === "organization")
      .map(f => f.name === "defaultOrgId" ? { ...f, options: orgOptions } : f),
    telegram: userSettingsFields
      .filter(f => f.group === "telegram" && (f.name !== "telegramBotToken" || user.role === "SUPERADMIN"))
      .map(f => f.name === "defaultOrgId" ? { ...f, options: orgOptions } : f),
  };

  // Shared default values for all forms
  const defaultValues: Record<string, any> = {
    ...user,
    telegramChatId: normalizedTelegram?.telegramChatId || "",
    telegramBotToken: normalizedTelegram?.telegramBotToken || "",
  };

  // Submission handler
  async function handleUserSettingsSubmit(
    data: Partial<UserSettingsUpdate>,
    user: User,
    update: () => void
  ) {
    const updateData: UserSettingsUpdate = {
      role: user.role ?? "USER",
      ...(data.name !== undefined && data.name !== "" ? { name: data.name } : {}),
      ...(data.isTwoFactorEnabled !== undefined
        ? { isTwoFactorEnabled: data.isTwoFactorEnabled }
        : {}),
      ...(data.telegramChatId !== undefined && data.telegramChatId !== ""
        ? { telegramChatId: data.telegramChatId }
        : {}),
      ...(data.telegramBotToken !== undefined && data.telegramBotToken !== ""
        ? { telegramBotToken: data.telegramBotToken }
        : {}),
      ...(data.image !== undefined && data.image !== "" ? { image: data.image } : {}),
      ...(data.defaultOrgId !== undefined && data.defaultOrgId !== ""
        ? { defaultOrgId: data.defaultOrgId }
        : {}),
      ...(data.email !== undefined && data.email !== "" ? { email: data.email } : {}),
      ...(data.password !== undefined && data.password !== ""
        ? { password: data.password }
        : {}),
      ...(data.newPassword !== undefined && data.newPassword !== ""
        ? { newPassword: data.newPassword }
        : {}),
    };

    const result = await settings(updateData);
    if (result.error) toast.error(result.error);
    if (result.success) {
      update();
      toast.success(result.success);
    }
  }

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full bg-white dark:bg-muted rounded-xl shadow-md py-6 md:flex  space-y-4 md:space-y-0">
        {/* Profile Header (left on desktop, top on mobile) */}
        <div className="flex flex-col items-center justify-center 
        md:w-72 shrink-0">
          <img
            src={user.image || "/image/profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-emerald-200 mb-2 object-cover"
          />
          <div className="text-lg font-bold">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
          <span className="mt-2 inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200 text-xs font-semibold border border-emerald-300">
            {user.role}
          </span>
        </div>
        {/* Tabs and Content (right on desktop, below on mobile) */}
        <div className="flex-1 w-full h-[80vh] pr-4">
          {/* Tabs for Desktop, Scroll for Mobile */}
          <div className="hidden h-fit md:flex border-b mb-6 overflow-x-auto overflow-y-hidden">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`px-4 py-2 -mb-px border-b-2 transition font-medium whitespace-nowrap ${
                  activeTab === tab.key
                    ? "border-emerald-600 text-emerald-700 dark:text-emerald-300"
                    : "border-transparent text-muted-foreground hover:text-emerald-600"
                }`}
                onClick={() => setActiveTab(tab.key)}
                type="button"
                aria-current={activeTab === tab.key ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Mobile: show all sections, Desktop: show only active tab */}
          <div className="md:hidden space-y-4">
            {TABS.map(tab => (
              <div key={tab.key} className="w-full mb-8">
                <DynamicForm
                  id={user.id}
                  title={tab.label}
                  imageType={tab.key === "profile" ? "USER" : undefined}
                  schema={userSettingsSchema}
                  fields={groupedFields[tab.key]}
                  defaultValues={defaultValues}
                  submitLabel={`${tab.label}`}
                  onSubmit={async (data) => handleUserSettingsSubmit(data, user, update)}
                />
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <DynamicForm
              id={user.id}
              title={TABS.find(t => t.key === activeTab)?.label}
              imageType={activeTab === "profile" ? "USER" : undefined}
              schema={userSettingsSchema}
              fields={groupedFields[activeTab]}
              defaultValues={defaultValues}
              submitLabel={`${TABS.find(t => t.key === activeTab)?.label}`}
              onSubmit={async (data) => handleUserSettingsSubmit(data, user, update)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
