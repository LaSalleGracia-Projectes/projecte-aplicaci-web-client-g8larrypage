'use client';

import supabaseAdmin from "@/helpers/supabaseAdmin";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { selectUsers } from "@/supabase/selectUsers";
import { sendPasswordResetEmail } from "@/supabase/userActions";
import { formatDate } from "@/utils/formatDate";
import { FaEdit, FaEnvelope, FaTrash } from "react-icons/fa";

export default function UserList({ filteredUsers, searchActive }) {
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await selectUsers();
        setAllUsers(usersData);
        setDisplayedUsers(usersData);
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchActive && filteredUsers) {
      setDisplayedUsers(filteredUsers);
    } else if (!searchActive) {
      setDisplayedUsers(allUsers);
    }
  }, [filteredUsers, searchActive, allUsers]);

  const handlePasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(email);
      toast.success("Password reset email sent successfully");
    } catch (err) {
      console.error("Error sending password reset email:", err);
      toast.error("Error sending password reset email: " + err.message);
    }
  };

  const handleRemoveUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    try {
      // Obtener el auth_id del usuario desde la tabla "Usuario" relacionada con "auth/users"
      const { data: user, error: fetchUserError } = await supabaseAdmin
        .from('Usuario')
        .select('correo')
        .eq('id', id)
        .single();
  
      if (fetchUserError) throw fetchUserError;
  
      if (!user || !user.correo) {
        throw new Error("No email found for this user.");
      }
  
      const userEmail = user.correo;
  
      // Buscar el auth_id en la tabla auth/users usando el correo
      const { data: authUser, error: fetchAuthUserError } = await supabaseAdmin.auth.admin.listUsers();
  
      if (fetchAuthUserError) throw fetchAuthUserError;
  
      const authId = authUser.users.find((u) => u.email === userEmail)?.id;
  
      if (!authId) {
        throw new Error("No auth_id found for this user.");
      }
  
      // Eliminar el usuario de la tabla "Usuario"
      const { error: deleteTableError } = await supabaseAdmin
        .from('Usuario')
        .delete()
        .eq('id', id);
  
      if (deleteTableError) throw deleteTableError;
  
      // Eliminar los metadatos del usuario registrado en auth
      const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(authId);
  
      if (deleteAuthError) throw deleteAuthError;
  
      toast.success("User deleted successfully");
      setAllUsers(allUsers.filter(user => user.id !== id));
      setDisplayedUsers(displayedUsers.filter(user => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Error deleting user: " + err.message);
    }
  };

  if (loading) return <div className="text-center py-10">Loading users...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (displayedUsers.length === 0) return <div className="text-center py-10">
    {searchActive ? "No users match your search" : "No users found"}
  </div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Last Connection</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {displayedUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-4 px-4">{user.nombre || 'N/A'}</td>
              <td className="py-4 px-4">{user.correo || 'N/A'}</td>
              <td className="py-4 px-4">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold 
                  ${user.role === 'admin' ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'}`}>
                  {user.role || 'N/A'}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-800">
                  {formatDate(user.last_connexion) || 'N/A'}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handlePasswordReset(user.correo)}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                    title="Send Password Reset"
                  >
                    <FaEnvelope size={18} />
                  </button>

                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete User"
                  >
                    <FaTrash size={18} />
                  </button>

                  <Link href={`/admin-panel/users/${user.id}`}>
                    <button
                      className="text-gray-600 hover:text-gray-900 transition-colors mt-2"
                      title="Edit User"
                    >
                      <FaEdit size={18} />
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}