'use client';

import supabase from "@/helpers/supabaseClient";
import { useEffect, useState, useContext } from "react";
import { Header, Footer } from "@/components/ui";
import { UserContext } from "@/context/UserContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ShopPage() {
    const [loading, setLoading] = useState(true);
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);

    // Verificar sesión al cargar
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };
        checkSession();
    }, [setIsLoggedIn]);

    useEffect(() => {
        // Simular carga de datos
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (err) {
            console.error("Error en el proceso de cierre de sesión:", err);
        }
    };

    // Configuración del slider
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        appendDots: dots => (
            <div className="bg-black bg-opacity-50 rounded-full py-2">
                <ul className="m-0 p-0">{dots}</ul>
            </div>
        ),
    };

    // Imágenes de ejemplo (reemplazar con tus propias imágenes)
    const skinImages = [
        { id: 1, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9ibWtSOVJ0ek1SejdpRlNTUGtHWi5wbmcifQ:supercell:gAVHMW6FXbQ8pudBGC0aB8DIkxOkhgzLU5cA5IXkODo?width=2400", alt: "Skin Épica", price: "5000 pasos" },
        { id: 2, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC83azZrN2l2d1RFYXFiQ3BYMm9LNS5wbmcifQ:supercell:Cqi2U1k1aphzpItPhJnuWWzB4fcJVJ_QAxY2aCpnVJU?width=2400", alt: "Skin Legendaria", price: "15000 pasos" },
        { id: 3, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9rc2RYeTZCV01Bd0VEV0VEZnphZy5wbmcifQ:supercell:RpMJcap9wP2dpim2O8xiQDk03ZuLRR8LbygwNs3ZCqY?width=2400", alt: "Skin Legendario", price: "8000 pasos" },
    ];

    const buildingImages = [
        { id: 1, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9Oek1qZGJHTTE1VXRQQVNQYnRFdS5wbmcifQ:supercell:PXm5pJv7aKrgM0STguSRuMyegtrAgNDGOzS5mde1k94?width=2400", alt: "Cañon", price: "200 pasos" },
        { id: 2, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC8zTjJLcnJNNFZUVEZ4RUtGc0R4Yi5wbmcifQ:supercell:z2X32Q6D-f1CdlCWtzNKmTl1nTNH_JpuobH49N0vx5I?width=2400", alt: "Ayuntamiento", price: "10000 pasos" },
        { id: 3, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC93dzdTeDFEYnFHYTlSV2JSZ0N3bS5wbmcifQ:supercell:U4rx54AiTcrcIkD-OA8i6eWjAl5v4pctiMouQB6h9i8?width=2400", alt: "Tesla", price: "1000 pasos" },
    ];

    const boosters = [
        { id: 1, name: "X2 Pasos", price: "5000 pasos", src: "/assets/img/boosters/vainilla_power.png" },
        { id: 2, name: "Defensa Nocturna", price: "15000 pasos", src: "/assets/img/boosters/asesino_noche.png" },
        { id: 3, name: "+50 ataque", price: "2000 pasos", src: "/assets/img/boosters/50_ataque.png" },
        { id: 4, name: "+200 defensa", price: "50000 pasos", src: "/assets/img/boosters/200_defensa.png" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

            <main className="flex-1 py-12 mt-36">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 font-[Electrolize] tracking-wide">
                            Pases de Leyendas
                        </h1>
                        <p className="text-lg sm:text-xl text-white opacity-80">
                            Mejora tu experiencia con nuestros potenciadores y skins
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {/* Sección Skins */}
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center">Skins</h2>
                                <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-yellow-500 shadow-lg shadow-purple-500/20">
                                    <Slider {...sliderSettings} className="relative">
                                        {skinImages.map((image) => (
                                            <div key={image.id} className="relative h-64 sm:h-96">
                                                <img 
                                                    src={image.src} 
                                                    alt={image.alt}
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <h3 className="text-lg sm:text-2xl font-bold text-white">{image.alt}</h3>
                                                        </div>
                                                        <div className="flex items-center space-x-2 sm:space-x-4">
                                                            <span className="text-yellow-400 text-base sm:text-xl">{image.price}</span>
                                                            <button className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-1 sm:py-2 px-4 sm:px-6 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30">
                                                                Comprar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>

                            {/* Sección Edificios */}
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center">Edificios</h2>
                                <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-yellow-500 shadow-lg shadow-purple-500/20">
                                    <Slider {...sliderSettings} className="relative">
                                        {buildingImages.map((image) => (
                                            <div key={image.id} className="relative h-64 sm:h-96">
                                                <img 
                                                    src={image.src} 
                                                    alt={image.alt}
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <h3 className="text-lg sm:text-2xl font-bold text-white">{image.alt}</h3>
                                                        </div>
                                                        <div className="flex items-center space-x-2 sm:space-x-4">
                                                            <span className="text-yellow-400 text-base sm:text-xl">{image.price}</span>
                                                            <button className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-1 sm:py-2 px-4 sm:px-6 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30">
                                                                Comprar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>

                            {/* Sección Potenciadores */}
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center">Potenciadores</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {boosters.map((booster) => (
                                        <div key={booster.id} className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-yellow-500 shadow-lg shadow-purple-500/20 hover:transform hover:scale-105 transition-transform">
                                            <div className="h-32 sm:h-48 overflow-hidden">
                                                <img 
                                                    src={booster.src} 
                                                    alt={booster.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="p-4 sm:p-6">
                                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{booster.name}</h3>
                                                <div className="flex justify-between items-center mt-4">
                                                    <span className="text-yellow-400">{booster.price}</span>
                                                    <button className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-1 sm:py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30">
                                                        Comprar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-16 text-center text-white">
                        <p className="mb-4 text-xl">¿Necesitas más pasos de oro?</p>
                        <button className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30">
                            ¡Compra ahora!
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}