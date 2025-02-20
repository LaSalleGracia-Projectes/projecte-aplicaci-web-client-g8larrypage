'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "@/helpers/supabaseClient";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            setEmail("");
            setPassword("");
            return;
        }

        if (data) {
            setMessage("¡Log In exitoso!");
            // Redirigir al usuario a la página principal
            router.push('/');
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                <br></br>

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                    required
                />
                <br></br>
                <br></br>

                <button type="submit">Log In</button>
            </form>
            <br></br>
            <span>No tienes una cuenta? </span>
            <Link href="/register">
                Registrarse
            </Link>
        </div>
    );
}