// app/organization/page.tsx

import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import OrganizationListsPage from "@/features/organization-management/components/organization-lists";
import { UserOrganizationView } from "@/features/organization-management/components/user-organization-view";
import { OrgDataProvider } from "@/features/organization-management/context/org-context";
import { getOrganizationsByUserId } from "@/actions/features/org/organization";

const OrganizationPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Fetch user's organizations
  const orgResult = await getOrganizationsByUserId(session.user.id);

  if (!orgResult.success) {
    console.error("Failed to fetch organizations:", orgResult.error);
  }

  const organizations = orgResult.success ? orgResult.data : [];

  // Check if user has admin privileges in any organization
  const hasAdminAccess = organizations.some((org: any) =>
    ["OWNER", "ADMIN", "SUPER_ADMIN"].includes(org.role)
  );

  // Check user system role
  const isSystemAdmin = session.user.role === "SUPERADMIN" || session.user.role === "ADMIN";

  return (
    <OrgDataProvider organizations={organizations} users={[]}>
      <div className="container mx-auto py-6">
        {hasAdminAccess || isSystemAdmin ? (
          <OrganizationListsPage />
        ) : (
          <UserOrganizationView />
        )}
      </div>
    </OrgDataProvider>
  );
};

export default OrganizationPage;
