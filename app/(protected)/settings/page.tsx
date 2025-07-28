"use server";

 import SettingsComponentPage from "./_components/setting-page";
import { currentUser } from "@/lib/auth";
import { getTelegramSetting } from "@/actions/settings/telegram-setting";
 
const SettingsPage = async () => {
  const user = await currentUser();
  console.log("Server session user : ",user)
 
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
