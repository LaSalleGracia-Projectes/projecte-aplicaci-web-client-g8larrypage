'use client';

import { useState } from "react";
import Link from "next/link";
import supabase from "@/helpers/supabaseClient";
import {
    Card,
    Input,
    Button,
    CardBody,
    Typography,
    Checkbox
} from "@/components/material-components";

export default function Register() {
    const [email, setEmail] = useState("");
    const [fullName, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailSignUp = async (event) => {
        event.preventDefault();
        setMessage("");

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: fullName
                }
            }
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (data) {
            setMessage("Registro exitoso! Revisa tu correo electrónico para confirmar tu cuenta.");
        }

        setEmail("");
        setName("");
        setPassword("");
    };

    const handleGoogleSignUp = async () => {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: "google"
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (user) {
            setMessage("Registro exitoso! Revisa tu correo electrónico para confirmar tu cuenta.");
        }
    };

    const handleFacebookSignUp = async () => {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: "facebook"
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (user) {
            setMessage("Registro exitoso! Revisa tu correo electrónico para confirmar tu cuenta.");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm p-4">
                <Typography variant="h4" className="text-xl font-bold text-center mb-4">
                    Create your Account
                </Typography>
                <CardBody>
                    {message && <Typography color="red">{message}</Typography>}
                    <form onSubmit={handleEmailSignUp} className="space-y-3">
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            label="Your email"
                            size="sm"
                            required
                        />
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            value={fullName}
                            type="text"
                            label="Name"
                            size="sm"
                            required
                        />
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            label="Password"
                            size="sm"
                            required
                        />
                        <Button type="submit" fullWidth size="sm">
                            Create an account
                        </Button>
                    </form>
                    <div className="my-3 text-center">or</div>
                    <Button
                        variant="outlined"
                        size="lg"
                        className="flex h-12 border-blue-gray-200 items-center justify-center gap-2 mb-2"
                        fullWidth
                        onClick={handleGoogleSignUp}
                    >
                        <img
                            src={`https://www.material-tailwind.com/logos/logo-google.png`}
                            alt="google"
                            className="h-6 w-6"
                        />{" "}
                        Sign up with Google
                    </Button>
                    <Button
                        variant="outlined"
                        size="lg"
                        className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                        fullWidth
                        onClick={handleFacebookSignUp}
                    >
                        <img
                            src={`https://www.material-tailwind.com/logos/logo-facebook.png`}
                            alt="google"
                            className="h-6 w-6"
                        />{" "}
                        Sign up with Facebook
                    </Button>
                    
                    
                    <div className="mt-4 flex items-center gap-2">
                        <Checkbox />
                        <Typography color="blue-gray" className="text-sm font-medium">
                            I agree with the{" "}
                            <a href="#" className="text-blue-500 hover:text-blue-700">
                             terms and conditions
                            </a>.
                        </Typography>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                        <Checkbox />
                        <Typography color="blue-gray" className="text-sm font-medium">
                            I agree with the{" "}
                            <a href="#" className="text-blue-500 hover:text-blue-700">
                            privacy policy
                             </a>.
                        </Typography>
                    </div>

                    <Typography className="mt-3 text-center text-sm">
                        Already have an account? {" "}
                        <Link href="/login" className="text-blue-500">
                            Log In
                        </Link>
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
}