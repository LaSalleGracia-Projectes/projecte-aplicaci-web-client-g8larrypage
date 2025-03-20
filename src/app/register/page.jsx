'use client';

import supabase from "@/helpers/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Input, Button, CardBody, Typography, Checkbox } from "@/components/Material-Components";
import { insertUsers } from "@/supabase/insertUsers";

export default function Register() {
    const [email, setEmail] = useState("");
    const [fullName, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    useEffect(() => {
        const fetchAuth = async () => {
            await useCheckAuth();
        };

        fetchAuth();
    }, []);

    const handleEmailSignUp = async (event) => {
        event.preventDefault();
        setMessage("");
    
        if (!termsAccepted || !privacyAccepted) {
            setMessage("You must accept the terms and conditions and the privacy policy.");
            return;
        }
    
        try {
            // Verificar si el correo ya está registrado en la tabla Usuario
            const { data: existingUser, error: userError } = await supabase
                .from('Usuario')
                .select('correo')
                .eq('correo', email)
                .single();
    
            if (userError && userError.code !== 'PGRST116') {
                // Si ocurre un error que no sea "no rows found", manejarlo
                throw userError;
            }
    
            if (existingUser) {
                setMessage("Correo ya registrado. Por favor, inicia sesión.");
                return;
            }
    
            // Verificar si el correo ya está registrado en auth/users
            const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
            if (authError) {
                throw authError;
            }
    
            const authUser = authUsers.users.find((u) => u.email === email);
    
            if (authUser) {
                setMessage("Correo ya registrado con otro proveedor. Por favor, inicia sesión.");
                return;
            }
    
            // Registrar al usuario si el correo no está registrado
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
                if (error.message.includes("Password should be at least 10 characters")) {
                    setMessage("The password must be at least 10 characters long.");
                } else if (error.message.includes("Password should contain at least one character")) {
                    setMessage("The password must include lowercase, uppercase, numbers, and symbols.");
                } else {
                    setMessage(error.message);
                }
                return;
            }
    
            if (data) {
                try {
                    await insertUsers(data.user.id, fullName, email, data.user.updated_at);
                    setMessage("Registration successful! Check your email to confirm your account.");
                } catch (error) {
                    setMessage("Error inserting user data: " + error.message);
                }
            }
    
            setEmail("");
            setName("");
            setPassword("");
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("An error occurred during registration. Please try again.");
        }
    };

    const handleGoogleSignUp = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: "http://localhost:3000/register" } // Redirige aquí tras el login
        });
    
        if (error) {
            console.error("Error al autenticar con Google:", error);
            return;
        }
    };

    const useCheckAuth = async () => {    
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Error al obtener la sesión:", error);
            return;
        }

        const user = data?.session?.user;

        if (user) {

            try {
                await insertUsers(user.id, user.user_metadata?.full_name || "", user.email, user.last_sign_in_at);
            } catch (error) {
                console.error("Error al insertar usuario en BD:", error);
            }
        }
    };

    const handleFacebookSignUp = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "facebook",
            options: { redirectTo: "http://localhost:3000/register" } // Redirige aquí tras el login
        });

        if (error) {
            console.error("Error al autenticar con Facebook:", error);
            return;
        }
    }
    

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm p-4">
                <Typography variant="h4" className="text-xl font-bold text-center mt-10 mb-4" style={{ fontFamily: 'Electrolize, sans-serif' }}>
                    Create your Account
                </Typography>
                <CardBody>
                    {message && (
                        <Typography
                            className={`text-center mb-8 ${message.includes("Registration successful") ? "text-green-600" : "text-red-600"}`}
                            style={{ fontFamily: 'Electrolize, sans-serif' }}
                        >
                            {message}
                        </Typography>
                    )}
                    <form onSubmit={handleEmailSignUp} className="space-y-3">
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            label="Your email"
                            size="sm"
                            required
                            style={{ fontFamily: 'Electrolize, sans-serif' }}
                        />
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            value={fullName}
                            type="text"
                            label="Full name"
                            size="sm"
                            required
                            style={{ fontFamily: 'Electrolize, sans-serif' }}
                        />
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            label="Password"
                            size="sm"
                            required
                            style={{ fontFamily: 'Electrolize, sans-serif' }}
                        />
                        <Button type="submit" fullWidth size="sm" style={{ fontFamily: 'Electrolize, sans-serif' }}>
                            Create an account
                        </Button>
                    </form>
                    <div className="my-3 text-center" style={{ fontFamily: 'Electrolize, sans-serif' }}>or</div>
                    <Button
                        variant="outlined"
                        size="lg"
                        className="flex h-12 border-blue-gray-200 items-center justify-center gap-2 mb-2"
                        fullWidth
                        onClick={handleGoogleSignUp}
                        style={{ fontFamily: 'Electrolize, sans-serif' }}
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
                        style={{ fontFamily: 'Electrolize, sans-serif' }}
                    >
                        <img
                            src={`https://www.material-tailwind.com/logos/logo-facebook.png`}
                            alt="facebook"
                            className="h-6 w-6"
                        />{" "}
                        Sign up with Facebook
                    </Button>
                    
                    <div className="mt-4 flex items-center gap-2">
                        <Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                        <Typography color="blue-gray" className="text-sm font-medium" style={{ fontFamily: 'Electrolize, sans-serif' }}>
                            I agree with the{" "}
                            <Link href="/terms-service" className="text-blue-500 hover:text-blue-700">
                                terms and conditions
                            </Link>
                        </Typography>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                        <Checkbox checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} />
                        <Typography color="blue-gray" className="text-sm font-medium" style={{ fontFamily: 'Electrolize, sans-serif' }}>
                            I agree with the{" "}
                            <Link href="/privacy-policy" className="text-blue-500 hover:text-blue-700">
                                privacy policy
                            </Link>
                        </Typography>
                    </div>

                    <Typography className="mt-4 text-center text-base" style={{ fontFamily: 'Electrolize, sans-serif' }}>
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