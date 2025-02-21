'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "@/helpers/supabaseClient";
import Image from "next/image";
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleEmailLogin = async (event) => {
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
            console.log(data);
            setMessage("¡Log In exitoso!");
            // Redirigir al usuario a la página principal
            router.push('/');
        }
    }

    const handleGoogleLogin = async () => {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (user) {
            setMessage("¡Log In exitoso!");
            // Redirigir al usuario a la página principal
            router.push('/');
        }
    }

    const handleFacebookLogin = async () => {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: "facebook",
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (user) {
            setMessage("¡Log In exitoso!");
            // Redirigir al usuario a la página principal
            router.push('/');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card shadow={false} className="md:px-10 md:py-8 py-6 border border-gray-300">
                <CardHeader shadow={false} floated={false} className="text-center">
                    <div className="flex items-center justify-center">
                        <Link href="/">
                            <Image src="/assets/img/logo-principal.png" alt="Logo Principal" width={240} height={200} />
                        </Link>
                    </div>
                </CardHeader>
                <CardBody>
                    {message && <Typography color="red">{message}</Typography>}
                    <form onSubmit={handleEmailLogin} className="flex flex-col gap-4 md:mt-6">
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            label="Your email"
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
                        <Button type="submit" size="lg" color="gray" fullWidth>
                            Log In
                        </Button>
                        <Button
                            variant="outlined"
                            size="lg"
                            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                            fullWidth
                            onClick={handleGoogleLogin}
                        >
                            <img
                                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                alt="google"
                                className="h-6 w-6"
                            />{" "}
                            Log in with Google
                        </Button>
                        <Button
                            variant="outlined"
                            size="lg"
                            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                            fullWidth
                            onClick={handleFacebookLogin}
                        >
                            <img
                                src={`https://www.material-tailwind.com/logos/logo-facebook.png`}
                                alt="facebook"
                                className="h-8 w-8"
                            />{" "}
                            Log in with Facebook
                        </Button>
                        <Typography variant="small" className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600">
                            Upon signing in, you consent to abide by our{" "}
                            <a href="#" className="text-blue-500 hover:text-blue-700">
                                Terms of Service
                            </a>{" "}
                            &{" "}
                            <a href="#" className="text-blue-500 hover:text-blue-700">
                                Privacy Policy.
                            </a>
                        </Typography>
                    </form>
                    <Typography className="mt-4 text-center text-md">
                        Don't have an account yet?{" "}
                        <Link href="/register" className="text-blue-500">
                            Sign Up
                        </Link>
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
}