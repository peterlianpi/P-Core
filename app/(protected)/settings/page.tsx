import { currentUser } from "@/lib/auth";
import { getTelegramSetting } from "@/actions/settings/telegram-setting";
import { UserProfileSettings } from "@/features/system/settings/components/settings-profile-form";
 
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

  // Fetch organizations (assuming you have a function or hook for this)
  // If useOrgData is a hook, you can't use it in a server component. Replace with a server-side fetch if needed.
  // For now, let's assume you have a function getOrganizations() that returns the organizations array.
  // const organizations = await getOrganizations();
  // For demonstration, we'll use an empty array:
  const organizations = [];

  return (
    <UserProfileSettings
      user={user}
      telegram={normalizedTelegram}
    />
  );
};
export default SettingsPage;
