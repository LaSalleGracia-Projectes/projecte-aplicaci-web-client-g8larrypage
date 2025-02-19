import React, { useState } from "react";
import supabase from "@/helpers/supabaseClient";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (data) {
            setMessage("¡Registro exitoso! Por favor, revisa tu bandeja de entrada para verificar tu correo electrónico.");
        }

        setEmail("");
        setPassword("");
    };

    return (
        <div>
            <h2>Register</h2>
            <br></br>
            {message && <span>{message}</span>}

            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email" 
                    placeholder="Email"
                    required
                />
                <br></br>

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password" 
                    placeholder="Password"
                    required
                />
                <br></br>

                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}