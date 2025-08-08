import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { VersionManagement } from "@/features/system/version/components/version-management";

export default async function AdminVersionPage() {
  // Server-side guard using NextAuth auth()
  const session = await auth();
  const role = session?.user?.role;

  if (role !== "SUPERADMIN" && role !== "DEVELOPMENT") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto py-8">
      <VersionManagement userRole="SUPERADMIN" />
    </div>
  );
}
