import supabase from "@/helpers/supabaseClient";

export const selectUsers = async() => {
    const { data, error } = await supabase.from('Usuario').select("id, role, nombre, correo, last_connexion");
    if (error) {
        throw new Error("Error fetching users: " + error.message);
    }

    return data;
}