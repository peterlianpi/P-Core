import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { currentUser } from "@/lib/auth";
import OrganizationListsPage from "./_components/organization-lists";
import { getAllUsers } from "@/data/users";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";

const OrganizationPage = async () => {
  const user = await currentUser();
  const rawOrganizations = await getOrganizationsByUserId(user?.id);
  const allUsers = await getAllUsers();

  const users = allUsers?.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    image: u.image,
    organization: u.UserOrganization.map((i) => ({
      id: i.organizationId,
      role: i.role as OrganizationUserRole,
    })),
  }));

  return (
    <>
      {rawOrganizations.data.length > 0 ? (
        <OrganizationListsPage
          organizations={rawOrganizations.data}
          users={users}
        />
      ) : (
        <p>No organization to show, create now</p>
      )}
    </>
  );
};

export default OrganizationPage;
