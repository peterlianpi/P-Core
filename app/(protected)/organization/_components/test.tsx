"use client";

import { useRouter } from "next/navigation";
import { createOrganization } from "@/actions/features/org/organization";

export default function CreateOrgForm({ userId }: { userId: string }) {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString();
    // other fields...

    const res = await createOrganization({
      userId,
      value: { name, description },
    });

    if ("error" in res) {
      alert("Error: " + res.error);
    } else {
      alert("Organization created successfully!");
      router.refresh(); // Refresh server components to show new data
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Organization Name" required />
      <input name="description" placeholder="Description" />
      <button type="submit">Create Organization</button>
    </form>
  );
}
