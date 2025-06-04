import { AdminPanelLayoutPage } from "@/components/admin-panel/admin-panel-layout";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  return <AdminPanelLayoutPage>{children}</AdminPanelLayoutPage>;
};

export default ProtectedLayout;
