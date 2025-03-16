'use client';

import { useEffect, useState } from "react";
import { selectUsers } from "@/supabase/selectUsers";
import Link from "next/link";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await selectUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Link href={`/admin-panel/users/${user.id}`} key={user.id}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{user.nombre}</h2>
              <p className="text-gray-600"><strong>Role:</strong> {user.role}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}