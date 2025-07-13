import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { currentUser } from "@/lib/auth";
import OrganizationUserManagementPage from "@/features/org/components/organization-user-management";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";
import { getAllUsers } from "@/data/users";
import { OrgDataProvider } from "@/context/org-context";
import { SelectedOrgProvider } from "@/context/selected-org-context";

const AddUserToOrganizationPage = async () => {
  const user = await currentUser();
  const rawOrganizations = await getOrganizationsByUserId(user?.id);
  const allUsers = await getAllUsers();

  const users = allUsers?.map((u) => ({
    id: u.id,
    name: u.name ?? "",
    email: u.email,
    image: u.image,
    organization: u.UserOrganization.map((i) => ({
      id: i.organizationId,
      role: i.role as OrganizationUserRole,
      status: i.status,
    })),
  }));

  const organizations = rawOrganizations.data;

  if (!organizations.length) {
    return <p>No organization to show, create now</p>;
  }

  return (
    <>
      <OrgDataProvider organizations={organizations} users={users ?? []}>
        <SelectedOrgProvider>
          <OrganizationUserManagementPage />
        </SelectedOrgProvider>
      </OrgDataProvider>
    </>
  );
};

export default AddUserToOrganizationPage;
