// "use client";
// import * as React from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"; // Assuming you've imported ShadCN's table components
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useMediaQuery } from "@/lib/custom-utils";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   DataTablePagination,
//   DataTablePaginationLoading,
// } from "./data-table-pagination";
// import { UploadButton } from "../import-data/upload-button";
// import { INITIAL_IMPORT_RESULTS } from "../import-data/import-helper/import-data";
// import { SearchBar } from "./search-bar";
// import { useSearchMember } from "@/features/members/api/use-search-member";
// import { useData } from "@/providers/data-provider";
// import { Member } from "@/helpers/formatMember";
// import ErrorBox from "../error-box";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   onUpload?: (results: typeof INITIAL_IMPORT_RESULTS) => void;
//   items: number;
//   searchField: string;
//   pagination: {
//     pageIndex: number;
//     pageSize: number;
//   };
//   onPaginationChange: React.Dispatch<
//     React.SetStateAction<{
//       pageIndex: number;
//       pageSize: number;
//     }>
//   >;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   onUpload,
//   pagination,
//   onPaginationChange,
//   items,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   searchField,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [tableData, setTableData] = React.useState(data);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const { orgId } = useData();
//   const {
//     data: searchMembers,
//     isLoading,
//     isError,
//     error,
//   } = useSearchMember(
//     searchQuery,
//     pagination.pageSize.toString(),
//     pagination.pageIndex.toString(),
//     orgId
//   );
//   const allMembers = searchMembers?.data;
//   if (isError || !allMembers) return <ErrorBox error={error} />;

//   const members: errorallMembers.map((member) => ({
//     id: member.id,
//     name: member.name,
//     phone: member.phone || "No Phone",
//     gender: member.gender || "Unknown",
//     roles: member.roles.map((role) => role?.name ?? "No Role"),
//     homeNumber: member?.homeNumber || "Unknown",
//     vengId: member?.vengId || "Unknown",
//     vengName: member?.veng || "Unknown",
//     khawkId: member?.khawkId || "Unknown",
//     khawkName: member?.khawk || "Unknown",
//     image: member?.image || "",
//   }));

//   React.useEffect(() => {
//     setTableData(members);
//   }, [members]);

//   const table = useReactTable({
//     data: tableData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     // manualPagination: true, //turn off client-side pagination
//     rowCount: items, //pass in the total row count so the table knows how many pages there are (pageCount calculated internally if not provided)
//     // pageCount: dataQuery.data?.pageCount, //alternatively directly pass in pageCount instead of rowCount
//     manualPagination: true,
//     onPaginationChange, //update the pagination state when internal APIs mutate the pagination state
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       pagination,
//     },
//   });

//   // Handle search query update
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     console.log("Search : ", query);
//   };

//   return (
//     <section className="space-y-4">
//       <div className="flex items-center gap-4 bg-secondary opacity-95 px-4 rounded-md sticky top-14 z-10 py-4">
//         <div className="flex gap-4 flex-grow">
//           <SearchBar onSearch={handleSearch} />
//         </div>
//         {onUpload && <UploadButton onUpload={onUpload} />}
//         <div className="max-md:hidden">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   if (isMobile && header.column.columnDef.meta) {
//                     return null;
//                   }
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {row.getVisibleCells().map((cell) => {
//                     if (isMobile && cell.column.columnDef.meta) {
//                       return null;
//                     }
//                     return (
//                       <TableCell key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="py-4">
//         <DataTablePagination table={table} />
//       </div>
//     </section>
//   );
// }

// export const TableLoading = () => {
//   return (
//     <section className="space-y-4">
//       <div className="flex items-center gap-4 bg-secondary px-4 rounded-md sticky top-14 z-10 py-4">
//         <div className="flex gap-4 flex-grow">
//           <Input
//             placeholder="Search name..."
//             className="max-md:w-full flex-grow"
//           />
//         </div>
//         <div className="max-md:hidden">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end"></DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//       <div className="rounded-md flex flex-col gap-2">
//         <Skeleton className="h-10 w-full" />
//         <Skeleton className="h-10 w-full" />
//         <Skeleton className="h-10 w-full" />
//         <Skeleton className="h-10 w-full" />
//       </div>
//       <div className="py-4">
//         <DataTablePaginationLoading />
//       </div>
//     </section>
//   );
// };
