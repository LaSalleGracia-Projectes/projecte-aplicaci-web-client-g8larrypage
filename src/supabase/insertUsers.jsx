import supabase from "@/helpers/supabaseClient";

export const insertUsers = async (userId, fullName, email, last_connexion) => {
    try {
        console.log("Checking if user exists:", { userId });

        // Verificar si el usuario ya existe
        const { data: existingUser, error: fetchError } = await supabase
            .from("Usuario")
            .select("id")
            .eq("id", userId)
            .single();

        if (fetchError && fetchError.code !== "PGRST116") { // Si no es un error de "no encontrado"
            throw new Error("Error checking existing user: " + fetchError.message);
        }

        // Si el usuario ya existe, no hacer nada
        if (existingUser) {
            console.log("El usuario ya existe en la base de datos, no se insertará.");
            return;
        }

        console.log("Inserting user:", { userId, fullName, email, last_connexion });

        const { data, error } = await supabase
            .from("Usuario")
            .insert([
                { id: userId, nombre: fullName, role: "user", correo: email, last_connexion: last_connexion }  // Corregido aquí
            ]);

        if (error) {
            console.error("Error inserting user data: ", error);
            throw new Error("Error inserting user into the 'Usuario' table");
        }

        console.log("User inserted successfully into 'Usuario' table:", data);
    } catch (error) {
        console.error("Unexpected error:", error);
        throw error;
    }
};
