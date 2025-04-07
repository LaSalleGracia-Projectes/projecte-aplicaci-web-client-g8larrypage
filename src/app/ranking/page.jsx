'use client';

import supabase from "@/helpers/supabaseClient";
import { useEffect, useState, useContext } from "react";
import { Header, Footer } from "@/components/ui";
import { UserContext } from "@/context/UserContext";

export default function RankingPage() {
    const [ranking, setRanking] = useState([]);
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

    // Obtener el ranking de jugadores
    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const { data, error } = await supabase
                    .from("Jugador")
                    .select("nombre, pasos_totales")
                    .order("pasos_totales", { ascending: false });

                if (error) {
                    console.error("Error fetching ranking:", error);
                    return;
                }

                setRanking(data || []);
            } catch (error) {
                console.error("Unexpected error fetching ranking:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, []);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error("Error al cerrar sesión: ", error.message);
                return;
            }
        } catch (err) {
            console.error("Error en el proceso de cierre de sesión:", err);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
            {/* Header */}
            <Header
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
            />

            {/* Contenido principal */}
            <main className="flex-1 py-12 mt-36">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-yellow-400 mb-4 font-[Electrolize] tracking-wide">
                            Salón de los Leyendas
                        </h1>
                        <p className="text-xl text-white opacity-80">
                            Los aventureros más legendarios de Ciudad de las Leyendas
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                        </div>
                    ) : ranking.length > 0 ? (
                        <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-yellow-500 shadow-lg shadow-purple-500/20">
                            {/* Encabezado de la tabla */}
                            <div className="grid grid-cols-12 bg-yellow-600 text-gray-900 font-bold p-4 items-center">
                                <div className="col-span-1 text-center">#</div>
                                <div className="col-span-8 pl-4">Jugador</div>
                                <div className="col-span-3 text-right pr-4">Pasos Totales</div>
                            </div>
                            
                            {/* Lista de jugadores */}
                            <div className="divide-y divide-purple-800">
                                {ranking.map((player, index) => (
                                    <div 
                                        key={index}
                                        className={`grid grid-cols-12 p-4 items-center hover:bg-purple-900 hover:bg-opacity-50 transition-colors ${
                                            index === 0 ? "bg-yellow-500 bg-opacity-10" : 
                                            index % 2 === 0 ? "bg-gray-800 bg-opacity-30" : ""
                                        }`}
                                    >
                                        <div className="col-span-1 text-center">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                                index === 0 ? "bg-yellow-500 text-gray-900 font-bold" : 
                                                index < 3 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
                                            }`}>
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className="col-span-8 pl-4">
                                            <div className="flex items-center">
                                                {index === 0 && (
                                                    <span className="mr-2 text-yellow-400">👑</span>
                                                )}
                                                <span className={`${
                                                    index === 0 ? "text-yellow-400 font-bold text-lg" : 
                                                    index < 3 ? "text-white font-medium" : "text-gray-300"
                                                }`}>
                                                    {player.nombre}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-span-3 text-right pr-4">
                                            <span className={`${
                                                index === 0 ? "text-yellow-400 font-bold" : "text-white"
                                            }`}>
                                                {player.pasos_totales.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-900 bg-opacity-50 rounded-xl">
                            <p className="text-2xl text-white">El salón de las Leyendas está vacío...</p>
                            <p className="text-gray-400 mt-2">Sé el primero en dejar tu marca en la historia</p>
                        </div>
                    )}

                    {/* Elementos decorativos */}
                    <div className="mt-12 text-center">
                        <button className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30">
                            Ver mis estadísticas
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}