"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

// Define the User type
type User = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: string;
  isTwoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Adjust API endpoint if necessary
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            (errorData as ErrorResponse)?.error || "Unknown error occurred"
          );
        }
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-4">User Lists</h1>
      {loading ? (
        <div className="space-y-2">
          <Skeleton className="w-full h-20 rounded-sm" />
          <Skeleton className="w-full h-20 rounded-sm" />
          <Skeleton className="w-full h-20 rounded-sm" />
        </div>
      ) : (
        <ul className="space-y-2">
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user.id}
                className="p-2 border flex gap-4 items-center rounded-md shadow-sm"
              >
                <p>
                  <Avatar className="border border-emerald-600">
                    {user.image ? (
                      <AvatarImage src={user.image} />
                    ) : (
                      <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </p>

                <p className="flex flex-grow ">{user.name || "N/A"}</p>
                <div>
                  <Button>
                    <Edit />
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserList;
