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

        // Insertar el usuario en la tabla 'Usuario'
        const { data: insertedUser, error: userInsertError } = await supabase
            .from("Usuario")
            .insert([
                { id: userId, nombre: fullName, role: "user", correo: email, last_connexion: last_connexion }
            ])
            .select();

        if (userInsertError) {
            console.error("Error inserting user data: ", userInsertError);
            throw new Error("Error inserting user into the 'Usuario' table");
        }

        console.log("User inserted successfully into 'Usuario' table:", insertedUser);

        // Insertar el jugador en la tabla 'Jugador'
        const { data: insertedPlayer, error: playerInsertError } = await supabase
            .from("Jugador")
            .insert([
                {
                    id_jugador: Math.floor(Math.random() * 1000000), // Generar un ID único para el jugador
                    nombre: fullName, // Usar el nombre del usuario
                    pasos_totales: 0, // Inicializar con 0 pasos
                    id_usuario: userId, // Relacionar con el ID del usuario
                    id_clan: null // Sin clan por defecto
                }
            ])
            .select();

        if (playerInsertError) {
            console.error("Error inserting player data: ", playerInsertError);
            throw new Error("Error inserting player into the 'Jugador' table");
        }

        console.log("Player inserted successfully into 'Jugador' table:", insertedPlayer);
    } catch (error) {
        console.error("Unexpected error:", error);
        throw error;
    }
};