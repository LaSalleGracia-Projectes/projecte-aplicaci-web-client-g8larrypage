'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { selectUserById, sendPasswordResetEmail, removeUser } from "@/supabase/userActions";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Avatar
} from "@/components/Material-Components";
import { Loader } from "lucide-react";

export default function UserDetail({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await selectUserById(id);
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  const handlePasswordReset = async () => {
    await sendPasswordResetEmail(user.correo);
    alert("Correo de recuperación enviado");
  };

  const handleRemoveUser = async () => {
    await removeUser(id);
    alert("Usuario eliminiado");
    router.push("/admin-panel/users");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin" size={32} /></div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <CardBody>
          <Typography variant="h5" className="text-gray-800 font-semibold">Detalles del Usuario</Typography>
          <div className="flex items-center gap-4 mt-4">
            <Avatar src={user.avatar} alt="User Avatar" size="lg" />
            <div className="text-gray-700">
              <Typography variant="h6">{user.nombre}</Typography>
              <Typography variant="small" color="gray">{user.correo}</Typography>
              <Typography variant="small" color="blue-gray">{user.role}</Typography>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button onClick={handlePasswordReset} color="blue">Enviar Correo de Recuperación</Button>
            <Button onClick={handleRemoveUser} color="red">Eliminar Usuario</Button>
            <Button onClick={() => router.back()} color="gray">Volver</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
