import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { currentUser } from "@/lib/auth";
import OrganizationUserManagenentPage from "./_components/organization-user-management";
import { getAllUsers } from "@/data/users";

const OrgUserManagementPage = async () => {
  const user = await currentUser();
  const organizations = await getOrganizationsByUserId(user?.id);
  const allUsers = await getAllUsers();

  const users = allUsers?.map((u) => ({
    id: u.id,
    name: u.name,
    organization: u.UserOrganization.map((i) => ({
      id: i.organizationId,
      role: i.role,
    })),
  }));

  return (
    <OrganizationUserManagenentPage
      organizations={organizations.data}
      users={users}
    />
  );
};

export default OrgUserManagementPage;
