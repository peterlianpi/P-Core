import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import SettingsComponentPage from "./_components/setting-page";
import { currentUser } from "@/lib/auth";

const SettingsPage = async () => {
  const user = await currentUser();
  const result = await getOrganizationsByUserId(user?.id ?? "");

  return <SettingsComponentPage organizations={result.data} />;
};
export default SettingsPage;
