import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { AdminPanelLayoutPage } from "@/components/admin-panel/admin-panel-layout";
import { getAllUsers } from "@/data/users";
import { OrgDataProvider } from "@/features/org/context/org-context";
import { SelectedOrgProvider } from "@/features/org/context/selected-org-context";
import { currentUser } from "@/lib/auth";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
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
    return (
      <div className="flex justify-center items-center p-4">
        No organization to show, create now
      </div>
    );
  }
  return (
    <OrgDataProvider organizations={organizations} users={users ?? []}>
      <SelectedOrgProvider>
        <AdminPanelLayoutPage>{children}</AdminPanelLayoutPage>
      </SelectedOrgProvider>
    </OrgDataProvider>
  );
};

export default ProtectedLayout;
