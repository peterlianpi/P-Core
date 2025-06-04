import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { currentUser } from "@/lib/auth";
import OrganizationListsPage from "./_components/organizations-list";

const AddUserToOrganizationPage = async () => {
  const user = await currentUser();
  const organizationsResult = await getOrganizationsByUserId(user?.id);

  return <OrganizationListsPage organizations={organizationsResult.data} />;
};

export default AddUserToOrganizationPage;
