// import { useState, useEffect } from "react";
// import { DataTable } from "./DataTable"; // Ensure you have this component
// import { SearchBar } from "./SearchBar";
// import axios from "axios";
// import { useSearchMember } from "@/features/members/api/use-search-member";
// import { useData } from "@/providers/data-provider";

// export default function MembersPage() {
//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
//   const [totalItems, setTotalItems] = useState(0);
//   const { orgId } = useData();
//   const { take, skip } = pagination;\
//   const {data:searchMembers,isLoading} = useSearchMember(searchQuery, take, skip, orgId);
     

//   const fetchMembers = async (searchQuery = "") => {
//     try {
//       const {data:searchMembers,isLoading} = useSearchMember(searchQuery, take, skip, orgId);
//       setData(searchMembers);
//       setTotalItems(response.data.total);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, [pagination]);

//   return (
//     <section className="space-y-4">
//       <div className="flex items-center gap-4 bg-secondary opacity-95 px-4 rounded-md sticky top-14 z-10 py-4">
//         <SearchBar onSearch={fetchMembers} placeholder="Search Name..." />
//       </div>
//     </section>
//   );
// }
