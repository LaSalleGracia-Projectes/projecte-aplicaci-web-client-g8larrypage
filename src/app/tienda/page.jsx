'use client';

import supabase from "@/helpers/supabaseClient";
import { useEffect, useState, useContext } from "react";
import { Header, Footer } from "@/components/ui";
import { UserContext } from "@/context/UserContext";
import Slider from "react-slick";
import { translationsShop } from "@/lang/translations";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ShopPage() {
    const [loading, setLoading] = useState(true);
    const [playerLoading, setPlayerLoading] = useState(true);
    const { isLoggedIn, setIsLoggedIn, language, changeLanguage } = useContext(UserContext);
    const translation = translationsShop[language] || translationsShop['es'];
    const [player, setPlayer] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [isInventoryExpanded, setIsInventoryExpanded] = useState(false);
    const router = useRouter();

    // Verificar sesión y cargar jugador e inventario
    useEffect(() => {
        let isMounted = true;
    
        const loadPlayerData = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            const session = sessionData.session;
    
            if (session && isMounted) {
                setIsLoggedIn(true);
                
                // Cargar datos del jugador
                const { data: playerData, error: playerError } = await supabase
                    .from("Jugador")
                    .select("*")
                    .eq("id_usuario", session.user.id)
                    .single();
    
                if (playerError) {
                    console.error("Error al cargar jugador:", playerError);
                } else if (isMounted) {
                    console.log("Jugador cargado:", playerData);
                    setPlayer(playerData);
                    
                    // Cargar inventario del jugador
                    const { data: inventoryData, error: inventoryError } = await supabase
                        .from("Inventario")
                        .select("item_guardados")
                        .eq("id_jugador", playerData.id_jugador);
                    
                    if (!inventoryError) {
                        setInventory(inventoryData.map(item => item.item_guardados));
                    }
                }
            } else if (isMounted) {
                setIsLoggedIn(false);
            }
            
            if (isMounted) {
                setPlayerLoading(false);
                setLoading(false);
            }
        };
    
        loadPlayerData();
    
        return () => {
            isMounted = false;
        };
    }, [setIsLoggedIn]);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (!error) {
                setIsLoggedIn(false);
                router.push(`/?lang=${language}`);
            }
        } catch (err) {
            console.error("Error en el proceso de cierre de sesión:", err);
        }
    };

    const handlePurchase = async (priceStr, itemName, itemId) => {
        try {
            // Validaciones iniciales
            if (!player?.id_jugador) {
                return alert(translation.alerts.login_required);
            }
    
            const price = parseInt(priceStr.replace(/\D/g, ""));
            if (isNaN(price)) return alert(translation.alerts.invalid_price);
            if (player.pasos_totales < price) {
                return alert(
                  translation.alerts.insufficient_steps
                    .replace("{required}", price)
                    .replace("{available}", player.pasos_totales)
                );
              }
    
            // 1. Actualizar pasos del jugador
            const { error: updateError } = await supabase
                .from("Jugador")
                .update({ pasos_totales: player.pasos_totales - price })
                .eq("id_jugador", player.id_jugador);
    
            if (updateError) throw updateError;
    
            // 2. Añadir ítem al inventario
            const { error: inventoryError } = await supabase
                .from("Inventario")
                .insert([{
                    id_jugador: player.id_jugador,
                    item_guardados: itemId,
                    capacidad_max: 1
                }]);
    
            if (inventoryError) throw inventoryError;
    
            // Actualizar estados locales
            setPlayer(prev => ({
                ...prev,
                pasos_totales: prev.pasos_totales - price
            }));
            
            setInventory(prev => [...prev, itemId]);
    
            alert(
                translation.alerts.purchase_success
                  .replace("{itemName}", itemName)
                  .replace("{price}", price)
              );
        } catch (error) {
            console.error("Error en la compra:", error);
            alert(`Error al procesar la compra: ${error.message}`);
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

    const skinImages = [
        { id: 1, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9ibWtSOVJ0ek1SejdpRlNTUGtHWi5wbmcifQ:supercell:gAVHMW6FXbQ8pudBGC0aB8DIkxOkhgzLU5cA5IXkODo?width=2400", alt: translation.items.skins.epic_skin, price: "5000 pasos" },
        { id: 2, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC83azZrN2l2d1RFYXFiQ3BYMm9LNS5wbmcifQ:supercell:Cqi2U1k1aphzpItPhJnuWWzB4fcJVJ_QAxY2aCpnVJU?width=2400", alt: translation.items.skins.legendary_skin, price: "15000 pasos" },
        { id: 3, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9rc2RYeTZCV01Bd0VEV0VEZnphZy5wbmcifQ:supercell:RpMJcap9wP2dpim2O8xiQDk03ZuLRR8LbygwNs3ZCqY?width=2400", alt: translation.items.skins.legendary_skin, price: "8000 pasos" },
    ];

    const buildingImages = [
        { id: 101, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9Oek1qZGJHTTE1VXRQQVNQYnRFdS5wbmcifQ:supercell:PXm5pJv7aKrgM0STguSRuMyegtrAgNDGOzS5mde1k94?width=2400", alt: translation.items.buildings.cannon, price: "200 pasos" },
        { id: 102, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC8zTjJLcnJNNFZUVEZ4RUtGc0R4Yi5wbmcifQ:supercell:z2X32Q6D-f1CdlCWtzNKmTl1nTNH_JpuobH49N0vx5I?width=2400", alt: translation.items.buildings.town_hall, price: "10000 pasos" },
        { id: 103, src: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC93dzdTeDFEYnFHYTlSV2JSZ0N3bS5wbmcifQ:supercell:U4rx54AiTcrcIkD-OA8i6eWjAl5v4pctiMouQB6h9i8?width=2400", alt: translation.items.buildings.tesla, price: "1000 pasos" },
    ];

    const boosters = [
        { id: 201, name: translation.items.boosters.x2_steps, price: "5000 pasos", src: "/assets/img/boosters/vainilla_power.png" },
        { id: 202, name: translation.items.boosters.night_defense, price: "15000 pasos", src: "/assets/img/boosters/asesino_noche.png" },
        { id: 203, name: translation.items.boosters.attack_boost, price: "2000 pasos", src: "/assets/img/boosters/50_ataque.png" },
        { id: 204, name: translation.items.boosters.defense_boost, price: "50000 pasos", src: "/assets/img/boosters/200_defensa.png" },
    ];

    // Función para obtener la información completa de un ítem del inventario
    const getItemInfo = (itemId) => {
        const allItems = [...skinImages, ...buildingImages, ...boosters];
        return allItems.find(item => item.id === itemId);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
            <Header
                language={language}
                changeLanguage={changeLanguage}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
            />

            <main className="flex-1 py-12 mt-36">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 font-[Electrolize] tracking-wide">
                            {translation.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-white opacity-80">
                            {translation.description}
                        </p>
                    </div>

                    {loading || playerLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                        </div>
                    ) : (
                        <div className="space-y-16">

                            <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl border-2 border-yellow-500 shadow-lg shadow-purple-500/30 overflow-hidden">
                            <button
                                onClick={() => setIsInventoryExpanded(!isInventoryExpanded)}
                                className="w-full flex justify-between items-center p-4 text-left"
                            >
                                <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">
                                    {translation.inventory}
                                </h2>
                                {player && (
                                    <p className="text-white">
                                    {player.nombre} • {player.pasos_totales} pasos
                                    </p>
                                )}
                                </div>
                                <svg
                                className={`w-6 h-6 text-yellow-400 transition-transform duration-200 ${
                                    isInventoryExpanded ? "rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                                </svg>
                            </button>

                            {isInventoryExpanded && (
                                <div className="p-4 border-t border-yellow-500/30">
                                {inventory.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {inventory.map((itemId, index) => {
                                        const item = getItemInfo(itemId);
                                        return item ? (
                                        <div
                                            key={`${itemId}-${index}`}
                                            className="bg-gradient-to-br from-purple-900/70 to-indigo-900/70 rounded-lg p-3 border border-yellow-500/30 hover:border-yellow-400 transition-all hover:scale-[1.02]"
                                        >
                                            <img
                                            src={item.src}
                                            alt={item.alt || item.name}
                                            className="w-full h-24 object-contain mb-2"
                                            />
                                            <p className="text-white text-center font-medium truncate">
                                            {item.alt || item.name}
                                            </p>
                                            <p className="text-yellow-300 text-xs text-center">
                                            {item.price}
                                            </p>
                                        </div>
                                        ) : null;
                                    })}
                                    </div>
                                ) : (
                                    <p className="text-gray-300 text-center py-4">
                                    {translation.empty_inventory}
                                    </p>
                                )}
                                </div>
                            )}
                            </div>

                            {/* Sección Skins */}
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center">
                                    {translation.skins}
                                </h2>
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
                                                            <button
                                                                onClick={() => handlePurchase(image.price, image.alt, image.id)}
                                                                className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-1 sm:py-2 px-4 sm:px-6 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30"
                                                            >
                                                                {translation.buy}
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
                                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center">
                                    {translation.buildings}
                                </h2>
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
                                                            <button 
                                                                onClick={() => handlePurchase(image.price, image.alt, image.id)}
                                                                className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-1 sm:py-2 px-4 sm:px-6 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30"
                                                            >
                                                                {translation.buy}
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
                                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center">
                                    {translation.boosters}
                                </h2>
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
                                                    <button 
                                                        onClick={() => handlePurchase(booster.price, booster.name, booster.id)}
                                                        className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-1 sm:py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30"
                                                    >
                                                        {translation.buy}
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
                        <p className="mb-4 text-xl">{translation.more_gold_steps}</p>
                        <button className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30">
                            {translation.buy_now}
                        </button>
                    </div>
                </div>
            </main>

            <Footer language={language}/>
        </div>
    );
}