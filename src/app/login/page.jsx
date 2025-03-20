'use client';

import supabase from "@/helpers/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { Card, Input, Button, CardBody, CardHeader, Typography } from "@material-tailwind/react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setUserRole, setIsLoggedIn } = useContext(UserContext);

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
            const { user } = data;

            const { data: userData, error: userError } = await supabase
                .from('Usuario')
                .select('role')
                .eq('id', user.id)
                .single();

            if (userError) {
                console.error('Error fetching user role:', userError);
                setMessage('Error fetching user role');
                return;
            }

            if (userData) {
                setUserRole(userData.role);
                setIsLoggedIn(true);

                // Redirigir al usuario a la página principal
                router.push('/');
            } else {
                console.error('User role data is null');
                setMessage('User role data is null');
            }
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
            <Card shadow={false} className="md:px-8 md:py-6 py-4 border border-gray-300 max-w-md">
                <CardHeader shadow={false} floated={false} className="text-center">
                    <div className="flex items-center justify-center">
                        <Link href="/">
                            <Image src="/assets/img/logo-principal.png" alt="Logo Principal" width={200} height={160} />
                        </Link>
                    </div>
                </CardHeader>
                <CardBody>
                    {message && <Typography color="red" className="font-electrolize">{message}</Typography>}
                    <form onSubmit={handleEmailLogin} className="flex flex-col gap-3 md:mt-4">
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            label="Your email"
                            size="sm"
                            required
                            className="font-electrolize"
                        />
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            label="Password"
                            size="sm"
                            required
                            className="font-electrolize"
                        />
                        <Button type="submit" size="md" color="gray" fullWidth className="font-electrolize">
                            Log In
                        </Button>
                        <Button
                            variant="outlined"
                            size="md"
                            className="flex h-10 border-blue-gray-200 items-center justify-center gap-2 font-electrolize"
                            fullWidth
                            onClick={handleGoogleLogin}
                        >
                            <img
                                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                alt="google"
                                className="h-5 w-5"
                            />{" "}
                            Log in with Google
                        </Button>
                        <Button
                            variant="outlined"
                            size="md"
                            className="flex h-10 border-blue-gray-200 items-center justify-center gap-2 font-electrolize"
                            fullWidth
                            onClick={handleFacebookLogin}
                        >
                            <img
                                src={`https://www.material-tailwind.com/logos/logo-facebook.png`}
                                alt="facebook"
                                className="h-6 w-6"
                            />{" "}
                            Log in with Facebook
                        </Button>
                        <Typography variant="small" className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600 mt-4 font-electrolize">
                            Upon signing in, you consent to abide by our{" "}
                            <Link href="/terms-service" className="text-blue-500 hover:text-blue-700">
                                Terms of Service
                            </Link>{" "}
                            &{" "}
                            <Link href="/privacy-policy" className="text-blue-500 hover:text-blue-700">
                                Privacy Policy
                            </Link>
                        </Typography>
                    </form>
                    <Typography className="mt-4 text-center text-base font-electrolize">
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