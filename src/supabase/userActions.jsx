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
  if (!email) {
    throw new Error("El correo electrónico es requerido");
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    console.error("Error al enviar el correo de recuperación:", error.message);
    throw new Error("No se pudo enviar el correo de recuperación. Por favor, verifica el correo ingresado.");
  }

  return data;
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