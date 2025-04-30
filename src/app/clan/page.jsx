'use client';


import supabase from "@/helpers/supabaseClient";
import { useEffect, useState, useContext } from "react";
import { Header, Footer } from "@/components/ui";
import { UserContext } from "@/context/UserContext";
import { translationsClan } from "@/lang/translations";
import { useRouter } from "next/navigation";


export default function ClanPage() {
    const [clans, setClans] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, setIsLoggedIn, language, changeLanguage } = useContext(UserContext);
    const translation = translationsClan[language] || translationsClan['es'];
    const router = useRouter();


    // Verificar sesión al cargar
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            setIsLoggedIn(!!data.session);
        };
        checkSession();
    }, [setIsLoggedIn]);


    // Obtener los clanes con información del líder
    useEffect(() => {
        const fetchClans = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from("Clan")
                    .select(`
                        id_clan,
                        created_at,
                        clan_code,
                        id_leader,
                        nombre,
                        jugador: id_leader (nombre)
                    `)
                    .order("nombre", { ascending: true });


                if (error) {
                    console.error("Error fetching clans:", error);
                    return;
                }


                setClans(data || []);
            } catch (error) {
                console.error("Unexpected error fetching clans:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchClans();
    }, []);


    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (!error) {
                setIsLoggedIn(false);
                router.push('/'); // Redirigir al home después de cerrar sesión
            }
        } catch (err) {
            console.error("Error en el proceso de cierre de sesión:", err);
        }
    };


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(language === 'ca' ? 'ca-ES' : language === 'en' ? 'en-US' : 'es-ES', options);
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
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-yellow-400 mb-4 font-[Electrolize] tracking-wide">
                            {translation.title}
                        </h1>
                        <p className="text-xl text-white opacity-80">
                            {translation.description}
                        </p>
                    </div>


                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                        </div>
                    ) : clans.length > 0 ? (
                        <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-yellow-500 shadow-lg shadow-purple-500/20">
                            <div className="grid grid-cols-12 bg-yellow-600 text-gray-900 font-bold p-4 items-center text-xs sm:text-base">
                                <div className="col-span-5 pl-4">{translation.clan_name}</div>
                                <div className="col-span-3">{translation.leader}</div>
                                <div className="col-span-3 text-center">{translation.foundation}</div>
                            </div>
                            <div className="divide-y divide-purple-800">
                                {clans.map((clan, index) => (
                                <div key={clan.id_clan} className={`grid grid-cols-12 p-4 items-center hover:bg-purple-900 hover:bg-opacity-50 transition-colors ${
                                    index === 0 ? "bg-yellow-500 bg-opacity-10" :
                                    index % 2 === 0 ? "bg-gray-800 bg-opacity-30" : ""
                                }`}>
                                    <div className="col-span-5 pl-4 flex items-center gap-4">
                                    {/* Avatar generado automáticamente */}
                                    <img
                                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(clan.nombre)}`}
                                        alt={`Avatar de ${clan.nombre}`}
                                        className="w-8 h-8 rounded-full bg-gray-700 p-1"
                                    />
                                    {/* Nombre del clan */}
                                    <span className={`${
                                        index === 0 ? "text-yellow-400 font-bold text-sm sm:text-base" :
                                        index < 3 ? "text-white font-medium" : "text-gray-300"
                                    }`}>
                                        {clan.nombre}
                                    </span>
                                    </div>
                                    <div className="col-span-3">
                                    <span className="text-gray-300 text-xs sm:text-base">{clan.jugador?.nombre || 'Desconocido'}</span>
                                    </div>
                                    <div className="col-span-3 text-center text-gray-300 text-xs sm:text-base">
                                    {clan.created_at ? formatDate(clan.created_at) : 'No registrada'}
                                    </div>
                                </div>
                                ))}
                            </div>
                            </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-900 bg-opacity-50 rounded-xl">
                            <p className="text-2xl text-white">{translation.no_clans}</p>
                            <p className="text-gray-400 mt-2">{translation.create_first_clan}</p>
                        </div>
                    )}


                    <div className="mt-12 text-center">
                        <button className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30">
                            {translation.create_clan}
                        </button>
                    </div>
                </div>
            </main>


            <Footer />
        </div>
    );
}
