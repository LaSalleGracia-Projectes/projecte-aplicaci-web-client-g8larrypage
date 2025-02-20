'use client';

import { useState } from "react";
import Link from "next/link";
import {
    Card,
    Input,
    Button,
    CardBody,
    CardHeader,
    Typography,
} from "@/components/material-components";
import supabase from "@/helpers/supabaseClient";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (data) {
            setMessage("Registro exitoso! Revisa tu correo electrónico para confirmar tu cuenta.");
        }

        setEmail("");
        setPassword("");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <Typography variant="h4">Register</Typography>
                </CardHeader>
                <CardBody>
                    {message && <Typography color="red">{message}</Typography>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            label="Email"
                            required
                        />
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            label="Password"
                            required
                        />
                        <Button type="submit" fullWidth>
                            Registrarse
                        </Button>
                    </form>
                    <Typography className="mt-4 text-center">
                        Ya tienes una cuenta?{" "}
                        <Link href="/login" className="text-blue-500">
                            Log In
                        </Link>
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
}