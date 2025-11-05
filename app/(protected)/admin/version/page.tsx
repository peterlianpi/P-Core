import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { VersionManagement } from "@/features/system/version/components/version-management";

export default async function AdminVersionPage() {
  // Server-side guard using current user
  const user = await currentUser();
  const role = user?.role;

  if (role !== "SUPERADMIN" && role !== "DEVELOPMENT") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto py-8">
      <VersionManagement />
    </div>
  );
}
