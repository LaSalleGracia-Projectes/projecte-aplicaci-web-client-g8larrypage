'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { selectUserById, sendPasswordResetEmail, removeUser } from "@/supabase/userActions";

export default function UserDetail({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await selectUserById(id);
      setUser(userData);
    };
    fetchUser();
  }, [id]);

  const handlePasswordReset = async () => {
    await sendPasswordResetEmail(user.correo);
    alert("Correo de recuperación enviado");
  };

  const handleRemoveUser = async () => {
    await removeUser(id);
    alert("Usuario removido");
    router.push("/admin-panel/users");
  };

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Detalles del Usuario</h1>
      <p><strong>Nombre:</strong> {user.nombre}</p>
      <p><strong>Correo:</strong> {user.correo}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <div className="mt-6 space-x-4">
        <button onClick={handlePasswordReset} className="bg-blue-500 text-white px-4 py-2 rounded">Enviar Correo de Recuperación</button>
        <button onClick={handleRemoveUser} className="bg-red-500 text-white px-4 py-2 rounded">Remover Usuario</button>
        <button onClick={() => router.back()} className="bg-gray-300 text-black px-4 py-2 rounded">Volver</button>
      </div>
    </div>
  );
}