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
import { CpuChipIcon } from "@heroicons/react/24/solid";

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
        <div className="flex justify-center items-center h-200">
            <Card shadow={false} className="md:px-10 md:py-8 py-6 border border-gray-300">
                <CardHeader shadow={false} floated={false} className="text-center">
                    <div className="flex items-center justify-center">
                            <Image src="/assets/img/logo-principal.png" alt="Logo Principal" width={300} height={200} />
                    </div>
                </CardHeader>
                <CardBody>
                    {message && <Typography color="red">{message}</Typography>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:mt-12">
                        <div>
                            <label htmlFor="email">
                                <Typography variant="small" color="blue-gray" className="block font-medium mb-2">
                                    Your Email
                                </Typography>
                            </label>
                            <Input
                                id="email"
                                color="gray"
                                size="lg"
                                type="email"
                                name="email"
                                placeholder="name@mail.com"
                                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                                labelProps={{ className: "hidden" }}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">
                                <Typography variant="small" color="blue-gray" className="block font-medium mb-2">
                                    Password
                                </Typography>
                            </label>
                            <Input
                                id="password"
                                color="gray"
                                size="lg"
                                type="password"
                                name="password"
                                placeholder="********"
                                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                                labelProps={{ className: "hidden" }}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <Button type="submit" size="lg" color="gray" fullWidth>
                            Log In
                        </Button>
                        <Button
                            variant="outlined"
                            size="lg"
                            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                            fullWidth
                        >
                            <img
                                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                alt="google"
                                className="h-6 w-6"
                            />{" "}
                            Sign in with Google
                        </Button>
                        <Button
                            variant="outlined"
                            size="lg"
                            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                            fullWidth
                        >
                            <img
                                src={`https://www.material-tailwind.com/logos/logo-facebook.png`}
                                alt="facebook"
                                className="h-8 w-8"
                            />{" "}
                            Sign in with Facebook
                        </Button>
                        <Typography variant="small" className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600">
                            Upon signing in, you consent to abide by our{" "}
                            <a href="#" className="text-gray-900">
                                Terms of Service
                            </a>{" "}
                            &{" "}
                            <a href="#" className="text-gray-900">
                                Privacy Policy.
                            </a>
                        </Typography>
                    </form>
                    <Typography className="mt-4 text-center">
                        No tienes una cuenta?{" "}
                        <Link href="/register" className="text-blue-500">
                            Registrarse
                        </Link>
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
}