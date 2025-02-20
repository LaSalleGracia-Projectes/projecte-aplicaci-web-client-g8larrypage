'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header, Footer } from "@/components/ui";
import { ButtonColors } from "@/components/downloadbutton";
import { GalleryWithCarousel } from "@/components/carrusel";
import supabase from "@/helpers/supabaseClient";

export default function Home() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setIsLoggedIn(true);
            }
        };
        checkSession();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <div>
            <Header />
            {/* Main Image */}
            <section className="w-full h-[90vh] relative">
                <Image
                    src="/assets/img/preview.png"
                    alt="Imagen Principal"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </section>

            {/* Download Section */}
            <section className="text-center py-10 bg-white-100">
                <h2 className="font-[Electrolize] text-2xl font-bold lg:mb-5">DESCÁRGALO YA!</h2>
                <p className="lg:mb-10">Descarga el juego en tu dispositivo y comienza a jugar</p>
                <Image src="/assets/img/anuncio-app.png" alt="Imagen juego" width={400} height={300} className="mx-auto" />
                <ButtonColors />
            </section>

            {/* News Section */}
            <section className="py-10">
                <h2 className="text-2xl font-bold text-center mb-12">NOTICIAS</h2>
                <GalleryWithCarousel />
            </section>

            <Footer />

            {/* Botón de cierre de sesión */}
            {isLoggedIn && (
                <div className="fixed bottom-4 right-4">
                    <button onClick={handleLogout} className="bg-red-500 text-white p-4 rounded">
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}