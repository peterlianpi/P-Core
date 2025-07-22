// import { useData } from "@/providers/data-provider";
// import { useEffect, useState } from "react";
// import { SearchBar } from "./search-bar";
// import { DataTable } from "./data-table";
// import { usePagination } from "@/helpers/use-pagination";
// import ErrorBox from "../error-box";
// import { INITIAL_IMPORT_RESULTS } from "../import-data/import-helper/import-data";

// type Props = {
//   data: Member[];
//   items: number;
//   onUpload?: (results: typeof INITIAL_IMPORT_RESULTS) => void;
// };

// export default function SearchPage({ data, items, onUpload }: Props) {
//   const [searchQuery, setSearchQuery] = useState(""); // Track search input
//   const { orgId, setLoading } = useData();
//   const { take, skip, onPaginationChange, pagination } = usePagination();
//   const [total, setTotal] = useState(items);
//   const [myMembers, setMyMembers] = useState(data);

//   // Call the hook **at the top level** of the component
//   const { data, isLoading, isError, error } = useSearchMember(
//     take,
//     skip,
//     searchQuery,
//     orgId
//   );

//   useEffect(() => {
//     if (isLoading !== undefined) {
//       setLoading(isLoading);
//     }
//   }, [isLoading, setLoading]);

//   // Update myMembers and total based on search query and API response
//   useEffect(() => {
//     // Extract members data safely
//     const searchMembers = data?.data || [];

//     const members: Member[] = searchMembers.map((member) => ({
//       id: member.id,
//       name: member.name,
//       phone: member.phone || "No Phone",
//       gender: member.gender || "Unknown",
//       roles: member.roles.map((role) => role?.name ?? "No Role"),
//       homeNumber: member?.homeNumber || "Unknown",
//       vengId: member?.vengId || "Unknown",
//       vengName: member?.veng || "Unknown",
//       khawkId: member?.khawkId || "Unknown",
//       khawkName: member?.khawk || "Unknown",
//       image: member?.image || "",
//     }));

//     setMyMembers(members);
//     setTotal(data?.totalItems ?? 0);
//   }, [data?.data, data?.totalItems, error]);

//   if (isError) {
//     return <ErrorBox error={error} />;
//   }

//   // Handle search updates
//   const handleSearch = (query: string) => {
//     setSearchQuery(query); // Update searchQuery state
//   };

//   return (
//     <section className="space-y-4">
//       <div className="flex items-center gap-4 bg-secondary opacity-95 px-4 rounded-md sticky top-14 z-10 py-4">
//         <SearchBar onSearch={handleSearch} placeholder="Search ..." />
//       </div>
//       <DataTable
//         data={myMembers}
//         items={total}
//         columns={columns}
//         searchField="name"
//         onUpload={onUpload}
//         pagination={pagination}
//         onPaginationChange={onPaginationChange}
//       />
//     </section>
//   );
// }
