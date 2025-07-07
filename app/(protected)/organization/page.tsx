import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { currentUser } from "@/lib/auth";
import OrganizationListsPage from "./_components/organization-lists";

const OrganizationPage = async () => {
  const user = await currentUser();
  const organizationsResult = await getOrganizationsByUserId(user?.id);

  return (
    <>
      {organizationsResult.data.length > 0 ? (
        <OrganizationListsPage organizations={organizationsResult.data} />
      ) : (
        <p>No organization to show, create now</p>
      )}
    </>
  );
};

export default OrganizationPage;
