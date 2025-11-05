import { currentUser } from "@/lib/auth";
import { getTelegramSetting } from "@/actions/settings/telegram-setting";
import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { UserProfileSettings } from "@/features/system/settings/components/settings-profile-form";
import { OrgDataProvider } from "@/features/organization-management/context/org-context";

const SettingsPage = async () => {
  const user = await currentUser();
  if (!user || !user.id) return null; // or a loading spinner

  const telegramSetting = await getTelegramSetting({
    userId: user.id,
    role: user.role,
  });

  const normalizedTelegram = telegramSetting
    ? {
      telegramChatId: telegramSetting.telegramChatId ?? undefined,
      telegramBotToken: telegramSetting.telegramBotToken ?? undefined,
      isActive: telegramSetting.isActive,
    }
    : undefined;

  // Fetch organizations for the current user
  const orgResult = await getOrganizationsByUserId(user.id);
  const rawOrganizations = orgResult.success ? orgResult.data : [];

  // Transform organizations to match the expected Org type
  const organizations = (rawOrganizations || []).map((org: any) => ({
    organization: {
      id: org.id,
      name: org.name,
      logoImage: org.logoImage,
      description: org.description,
      startedAt: org.startedAt,
      type: org.type,
    },
    role: org.role,
  }));

  return (
    <OrgDataProvider organizations={organizations} users={[]}>
      <UserProfileSettings
        user={{
          ...user,
          name: user.name ?? undefined,
          email: user.email ?? undefined,
          image: user.image ?? undefined,
          role: user.role as any,
          defaultOrgId: user.defaultOrgId ?? undefined
        }}
        telegram={normalizedTelegram}
      />
    </OrgDataProvider>
  );
};
export default SettingsPage;
