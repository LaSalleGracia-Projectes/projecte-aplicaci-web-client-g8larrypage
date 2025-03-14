// helpers/insertsUsers.jsx
import supabase from "@/helpers/supabaseClient";

export const insertUsers = async (userId, fullName) => {
    const { data, error } = await supabase
        .from('Usuario')
        .insert([
            { id: userId, nombre: fullName, role: 'user' }  // Suponiendo que 'role' tiene valor 'user' por defecto
        ]);

    if (error) {
        console.error("Error inserting user data: ", error);
        throw new Error("Error inserting user into the 'Usuario' table");
    }

    console.log("User inserted successfully into 'Usuario' table:", data);
};
