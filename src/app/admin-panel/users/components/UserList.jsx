'use client';

import supabaseAdmin from "@/helpers/supabaseAdmin";
import { useEffect, useState } from "react";
import { selectUsers } from "@/supabase/selectUsers";
import { sendPasswordResetEmail } from "@/supabase/userActions";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

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

  const handlePasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(email);
      alert("Correo de recuperación enviado");
    } catch (err) {
      console.error("Error al enviar correo de recuperación:", err);
    }
  };

  const handleRemoveUser = async (id) => {
    try {
      // Obtener el auth_id del usuario desde la tabla "Usuario" relacionada con "auth/users"
      const { data: user, error: fetchUserError } = await supabaseAdmin
        .from('Usuario')
        .select('correo') // Selecciona el correo del usuario
        .eq('id', id)
        .single();
  
      if (fetchUserError) throw fetchUserError;
  
      if (!user || !user.correo) {
        throw new Error("No se encontró el correo para este usuario.");
      }
  
      const userEmail = user.correo;
  
      // Buscar el auth_id en la tabla auth/users usando el correo
      const { data: authUser, error: fetchAuthUserError } = await supabaseAdmin.auth.admin.listUsers();
  
      if (fetchAuthUserError) throw fetchAuthUserError;
  
      const authId = authUser.users.find((u) => u.email === userEmail)?.id;
  
      if (!authId) {
        throw new Error("No se encontró el auth_id para este usuario.");
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
  
      alert("Usuario eliminado correctamente");
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      alert("Error al eliminar el usuario: " + err.message);
    }
  };

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
            <th className="py-3 px-4 text-left">Last Connection</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
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
                <button
                  onClick={() => handlePasswordReset(user.correo)}
                  className="text-blue-600 hover:text-blue-900 mx-1"
                >
                  Enviar Correo
                </button>
                <button
                  onClick={() => handleRemoveUser(user.id)}
                  className="text-red-600 hover:text-red-900 mx-1"
                >
                  Eliminar
                </button>
                <Link href={`/admin-panel/users/${user.id}`}>
                <button
                  className="text-gray-600 hover:text-gray-900 mx-1"
                >
                  Editar
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}