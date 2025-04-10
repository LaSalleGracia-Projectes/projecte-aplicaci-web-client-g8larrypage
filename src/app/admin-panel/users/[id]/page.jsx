'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/helpers/supabaseClient";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Spinner
} from "@/components/Material-Components";
import { FaArrowLeft, FaSave, FaTimes, FaUserEdit } from "react-icons/fa";

export default function EditUserPage({ params }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    role: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Usuario')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data) {
          setUser(data);
          setFormData({
            nombre: data.nombre || '',
            correo: data.correo || '',
            role: data.role || 'user'
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("No se pudo cargar la información del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setSaving(true);
  
      // Actualizar la tabla "Usuario"
      const { error: updateTableError } = await supabase
        .from('Usuario')
        .update({
          nombre: formData.nombre,
          correo: formData.correo,
          role: formData.role,
        })
        .eq('id', id); // Asegúrate de usar el ID del usuario que estás editando
  
      if (updateTableError) throw updateTableError;
  
      alert('Usuario actualizado correctamente');
      router.push('/admin-panel/users');
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setError("Error al actualizar el usuario: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Button color="blue" onClick={() => router.back()}>
          <FaArrowLeft className="mr-2" /> Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-xl shadow-lg mt-16">
        <div className="bg-black p-4 text-white flex justify-between items-center">
          <Typography variant="h5" className="flex items-center gap-2">
            <FaUserEdit size={20} /> Editar Usuario
          </Typography>
          <Button 
            variant="text" 
            color="white" 
            onClick={() => router.push('/admin-panel/users')}
            className="p-2"
          >
            <FaTimes size={18} />
          </Button>
        </div>
        
        <CardBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Typography variant="small" className="mb-2 font-medium">ID de Usuario</Typography>
                <Input
                  disabled
                  value={id}
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <Typography variant="small" className="mb-2 font-medium">Nombre</Typography>
                <Input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Typography variant="small" className="mb-2 font-medium">Correo Electrónico</Typography>
                <Input
                    disabled
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleChange}
                />
              </div>
              
              <div>
                <Typography variant="small" className="mb-2 font-medium">Rol</Typography>
                <Select
                  value={formData.role}
                  onChange={handleRoleChange}
                  name="role"
                  className="w-full"
                >
                  <Option value="user">Usuario</Option>
                  <Option value="employee">Empleado</Option>
                  <Option value="admin">Administrador</Option>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outlined"
                color="gray"
                className="flex-1 inline-flex items-center justify-center gap-2"
                onClick={() => router.back()}
              >
                <FaArrowLeft className="mr-2" /> Cancelar
              </Button>
              
              <Button 
                type="submit" 
                color="black" 
                className="flex-1 inline-flex items-center justify-center gap-2"
                disabled={saving}
              >
                {saving ? (
                  <Spinner className="h-4 w-4 mr-2" />
                ) : (
                  <FaSave className="mr-2" />
                )}
                Guardar Cambios
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}