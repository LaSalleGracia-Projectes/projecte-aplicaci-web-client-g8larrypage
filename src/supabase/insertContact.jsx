import supabase from "@/helpers/supabaseClient";

export async function insertContactMessage(contactData) {
  try {
    // Log the data being sent to help with debugging
    console.log("Intentando insertar datos:", contactData);
    
    // Check if the table exists first (optional)
    const { data: tableCheck, error: tableError } = await supabase
      .from('Contacto')
      .select('count')
      .limit(1);
      
    if (tableError) {
      return { success: false, error: tableError };
    }
    
    // Proceed with the insert - mapping email to correo
    const { data, error } = await supabase
      .from('Contacto')
      .insert([
        {
          nombre: contactData.nombre,
          correo: contactData.email,
          asunto: contactData.asunto,
          mensaje: contactData.mensaje,
          id_usuario: contactData.id_usuario,
        }
      ])
      .select('id, nombre, correo, asunto, mensaje','id_usuario');

    if (error) {
      return { success: false, error };
    }

    if (!data || data.length === 0) {
      return { 
        success: false, 
        error: { message: "No se ha devuelto ningún dato al insertar contacto" } 
      };
    }

    return { success: true, data: data[0] };
  } catch (error) {
    return { success: false, error: { message: error.message || "Error desconocido" } };
  }
}