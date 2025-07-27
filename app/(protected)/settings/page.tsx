"use server";

import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import SettingsComponentPage from "./_components/setting-page";
import { currentUser } from "@/lib/auth";
import { getTelegramSetting } from "@/actions/settings/telegram-setting";
import { useOrgData } from "@/features";

const SettingsPage = async () => {
  const user = await currentUser();
 
   const telegramSetting = await getTelegramSetting({
    userId: user?.id ?? "",
    role: user?.role ?? "USER",
  });

  

  return (
    <SettingsComponentPage
      telegram={telegramSetting}
       />
  );
};
export default SettingsPage;
