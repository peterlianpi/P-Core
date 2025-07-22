// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function EditUser() {
//   const router = useRouter();
//   const { id } = router.query; // Get the id from the URL
//   const [user, setUser] = useState(null); // State for user data
//   const [loading, setLoading] = useState(true); // State for loading
//   const [error, setError] = useState(null); // State for error messages

//   // Fetch the user data when the component mounts or `id` changes
//   useEffect(() => {
//     if (id) {
//       fetch(`/api/members/${id}`)
//         .then((res) => {
//           if (!res.ok) throw new Error("Failed to fetch user data");
//           return res.json();
//         })
//         .then((data) => {
//           setUser(data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   const handleSave = () => {
//     if (!user?.name) {
//       alert("Name is required");
//       return;
//     }
//     fetch(`/api/members/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to update user");
//         return res.json();
//       })
//       .then(() => {
//         router.push("/"); // Redirect to the members page
//       })
//       .catch((err) => {
//         setError(err.message);
//         console.error(err.message);
//       });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl mb-4">Edit User</h1>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Name</label>
//           {/* <Input
//             value={user.name || ""}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//           /> */}
//         </div>
//         {/* <div>
//           <label className="block text-sm font-medium">Phone</label>
//           <Input
//             value={user.phone || ""}
//             onChange={(e) => setUser({ ...user, phone: e.target.value })}
//           />
//         </div> */}
//         {/* Add more fields as necessary */}
//         <Button variant="default" onClick={handleSave}>
//           Save Changes
//         </Button>
//       </div>
//     </div>
//   );
// }
