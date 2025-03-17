'use client';

import { useEffect, useState } from "react";
import { selectUsers } from "@/supabase/selectUsers";
import Link from "next/link";
import { FaBan, FaUser, FaEnvelope } from "react-icons/fa";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await selectUsers();
        setUsers(usersData);
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  if (loading) return <div className="text-center py-10">Loading users...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (users.length === 0) return <div className="text-center py-10">No users found</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Last Connexion</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">{user.nombre || 'N/A'}</td>
              <td className="py-3 px-4">{user.correo || 'N/A'}</td>
              <td className="py-3 px-4">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold 
                  ${user.role === 'admin' ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'}`}>
                  {user.role || 'user'}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-800">
                  {user.last_connexion || 'N/A'}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <Link href={`/admin-panel/users/${user.id}`} className="text-blue-600 hover:text-blue-900 mx-1">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
