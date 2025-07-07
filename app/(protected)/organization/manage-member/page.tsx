import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { currentUser } from "@/lib/auth";
import OrganizationUserManagementPage from "@/features/org/components/organization-user-management";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";
import { getAllUsers } from "@/data/users";

const AddUserToOrganizationPage = async () => {
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

  const orgs = rawOrganizations.data.map((entry) => ({
    id: entry.organization.id,
    name: entry.organization.name,
  }));
  return (
    <>
      {orgs.length > 0 ? (
        <OrganizationUserManagementPage
          organizations={orgs}
          users={users ?? []}
        />
      ) : (
        <p>No organization to show, create now</p>
      )}
    </>
  );
};

export default AddUserToOrganizationPage;
