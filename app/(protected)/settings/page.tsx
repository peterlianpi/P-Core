"use server";

import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import SettingsComponentPage from "./_components/setting-page";
import { currentUser } from "@/lib/auth";
import { getTelegramSetting } from "@/actions/settings/telegram-setting";

const SettingsPage = async () => {
  const user = await currentUser();
  const result = await getOrganizationsByUserId(user?.id ?? "");
  const telegramSetting = await getTelegramSetting({
    userId: user?.id ?? "",
    role: user?.role ?? "USER",
  });

  return (
    <SettingsComponentPage
      telegram={telegramSetting}
      organizations={result.data}
    />
  );
};
export default SettingsPage;
