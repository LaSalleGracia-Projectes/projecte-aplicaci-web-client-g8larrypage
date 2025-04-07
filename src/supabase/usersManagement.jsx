import supabase from "@/helpers/supabaseClient";

// Función para buscar usuarios según el nombre
export const searchUsersByName = async (name) => {
    try {
        const { data, error } = await supabase
            .from("Usuario")
            .select("*")
            .ilike("nombre", `%${name}%`);

        if (error) {
            console.error("Error fetching users:", error);
            throw new Error("Error fetching users: " + error.message);
        }

        return data || [];
    } catch (error) {
        console.error("Error searching users:", error);
        throw new Error("Error searching users: " + error.message);
    }
}