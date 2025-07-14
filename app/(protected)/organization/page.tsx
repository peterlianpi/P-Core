// app/organization/page.tsx
import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { currentUser } from "@/lib/auth";
import { getAllUsers } from "@/data/users";
import OrganizationListsPage from "../../../features/org/components/organization-lists";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";
import { OrgDataProvider } from "@/features/org/context/org-context";
import { SelectedOrgProvider } from "@/features/org/context/selected-org-context";

const OrganizationPage = async () => {
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
    <OrgDataProvider organizations={organizations} users={users ?? []}>
      <SelectedOrgProvider>
        <OrganizationListsPage />
      </SelectedOrgProvider>
    </OrgDataProvider>
  );
};

export default OrganizationPage;
