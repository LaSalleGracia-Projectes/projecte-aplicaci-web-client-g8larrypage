import supabase from "@/helpers/supabaseClient";

// Función para buscar contactos en la tabla 'Contacto' (o como se llame tu tabla de contactos)
export const searchEmailsByName = async (name) => {
    try {
        const { data, error } = await supabase
            .from("Contacto") // Cambia esto al nombre de tu tabla de contactos
            .select("*") // Seleccionar todos los campos
            .ilike("nombre", `%${name}%`); // Búsqueda insensible a mayúsculas/minúsculas

        if (error) {
            console.error("Error fetching contacts:", error);
            throw new Error("Error fetching contacts: " + error.message);
        }

        return data || []; // Retorna un arreglo vacío si no hay resultados
    } catch (error) {
        console.error("Error searching contacts:", error);
        throw new Error("Error searching contacts: " + error.message);
    }
};