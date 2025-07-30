import { UserSettingsForm } from "@/features/system/settings/user-settings-form";
import { currentUser } from "@/lib/auth";
import { getTelegramSetting } from "@/actions/settings/telegram-setting";

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

  return (
    <UserSettingsForm
      user={user}
      telegram={normalizedTelegram}
    />
  );
};
export default SettingsPage;