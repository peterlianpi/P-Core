"use client";

import { useGetMembers } from "@/features/members/api/use-get-members";
import { Member } from "@/helpers/formatMember";
import { useBulkCreateMembers } from "@/features/members/api/use-bulk-create-members";
import { usePagination } from "@/helpers/use-pagination";
import { ImportCard } from "@/components/import-data/import-card";
import { useImportData } from "@/components/import-data/import-helper/import-data";
import { TableLoading } from "@/components/use-server-table/data-table";
import ErrorBox from "@/components/error-box";
import { useData } from "@/providers/data-provider";
import MemberSearchPage from "@/features/members/components/members-search-box";

const MembersPage = () => {
  const { orgId } = useData();
  const { take, skip } = usePagination();
  const { data, isLoading, isError, error } = useGetMembers(take, skip, orgId);
  const allMembers = data?.data;
  const createMembers = useBulkCreateMembers(orgId ?? ""); // Assuming bulk create API for members

  const {
    variant,
    VARIANTS,
    importResults,
    onUpload,
    onCancelImport,
    onSubmitImport,
  } = useImportData({ entity: "Members", createMutation: createMembers });

  if (isLoading) {
    return <TableLoading />;
  }

  if (isError) return <ErrorBox error={error} />;

  const members: Member[] = allMembers
    ? allMembers.map((member) => ({
        id: member.id,
        name: member.name,
        phone: member.phone || "No Phone",
        gender: member.gender || "Unknown",
        roles: member.roles.map((role) => role?.name ?? "No Role"),
        homeNumber: member?.homeNumber || "Unknown",
        vengId: member?.vengId || "Unknown",
        vengName: member?.veng || "Unknown",
        khawkId: member?.khawkId || "Unknown",
        khawkName: member?.khawk || "Unknown",
        image: member?.image || "",
      }))
    : [];

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard
          entity="Members"
          data={importResults.data}
          requiredFields={["name", "gender", "phone", "home"]}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <section className="">
      <MemberSearchPage
        allMembers={members}
        items={data?.totalItems ?? 0}
        onUpload={onUpload}
      />
    </section>
  );
};

export default MembersPage;
