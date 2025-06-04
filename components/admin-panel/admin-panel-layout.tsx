"use server";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import HeaderPage from "./header";
import { getAllVersions } from "@/actions/features/versions/get-version";
import AddTeamPage from "./add-team";
import { getOrganizationsByUserId } from "@/actions/features/org/organization";
import { currentUser } from "@/lib/auth";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export async function AdminPanelLayoutPage({ children }: ProtectedLayoutProps) {
  const user = await currentUser();
  const versions = await getAllVersions();
  const organizations = await getOrganizationsByUserId(user?.id);

  return (
    <SidebarProvider>
      <AppSidebar organizations={organizations.data} />
      <SidebarInset>
        <header className="flex w-full sticky top-0 opacity-95 z-10 bg-secondary mb-2 h-[53px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[53px]">
          <HeaderPage versions={versions.data} />
        </header>

        <div className="relative flex flex-1 flex-col gap-4 p-4 pt-0 w-full">
          <AddTeamPage />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
