import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { AdminPanelLayoutPage } from "@/components/admin-panel/admin-panel-layout";
import { getAllUsers } from "@/data/users";
import { OrgDataProvider } from "@/features/organization-management/context/org-context";
import { SelectedOrgProvider } from "@/features/organization-management/context/selected-org-context";
import { currentUser } from "@/lib/auth";
import type { OrganizationRole } from "@/lib/types/database";

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
    organization: u.organizations.map((i) => ({
      id: i.organizationId,
      role: i.role as OrganizationRole,
      status: i.status,
    })),
  }));

  const organizations = rawOrganizations.data;
 console.log("Organizations : ",organizations)
  
  return (
    <OrgDataProvider organizations={organizations} users={users ?? []}>
      <SelectedOrgProvider>
        <AdminPanelLayoutPage>{children}</AdminPanelLayoutPage>
      </SelectedOrgProvider>
    </OrgDataProvider>
  );
};

export default ProtectedLayout;
