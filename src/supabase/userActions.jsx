import supabase from "@/helpers/supabaseClient";

export const selectUserById = async (id) => {
  const { data, error } = await supabase
    .from('Usuario')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error("ERROR", error);
    return null;
  }
  return data;
};

export const sendPasswordResetEmail = async (email) => {
  // Implementa la lógica para enviar un correo de recuperación de contraseña
  // Esto puede variar dependiendo de cómo manejes la autenticación y los correos en tu aplicación
};

export const removeUser = async (id) => {
  const { data, error } = await supabase
    .from('Usuario')
    .delete()
    .eq('id', id);
  if (error) {
    console.error("ERROR", error);
    return null;
  }
  return data;
};