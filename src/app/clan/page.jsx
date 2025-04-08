'use client';

import supabase from "@/helpers/supabaseClient";
import { useEffect, useState, useContext } from "react";
import { Header, Footer } from "@/components/ui";
import { UserContext } from "@/context/UserContext";

export default function ClanPage() {
    const [clans, setClans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inserting, setInserting] = useState(false);
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

    // Obtener los clanes con información del líder
    const fetchClans = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("Clan")  // Nota: minúsculas para coincidir con Supabase
                .select(`
                    id_clan,
                    created_at,
                    ranking_global,
                    id_leader,
                    nombre,
                    jugador: id_leader (nombre)
                `)
                .order("ranking_global", { ascending: true });

            if (error) {
                console.error("Error fetching clans:", error);
                alert(`Error al obtener clanes: ${error.message}`);
                return;
            }

            setClans(data || []);
        } catch (error) {
            console.error("Unexpected error fetching clans:", error);
            alert("Error inesperado al obtener clanes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClans();
    }, []);

    // Insertar clanes de prueba
    const insertSampleClans = async () => {
        setInserting(true);
        try {
            // Primero obtenemos algunos jugadores para ser líderes
            const { data: players, error: playersError } = await supabase
                .from("Jugador")  // Nota: minúsculas
                .select("id_jugador")
                .limit(5);

            if (playersError) {
                console.error("Error fetching players:", playersError);
                alert(`Error al obtener jugadores: ${playersError.message}`);
                return;
            }

            if (!players || players.length === 0) {
                alert("No hay jugadores disponibles para ser líderes de clan");
                return;
            }

            const sampleClans = [
                { 
                    nombre: "Dragones Legendarios", 
                    id_leader: players[0].id_jugador, 
                    ranking_global: 1,
                    created_at: new Date().toISOString()
                },
                { 
                    nombre: "Caballeros de la Noche", 
                    id_leader: players[1]?.id_jugador || players[0].id_jugador, 
                    ranking_global: 2,
                    created_at: new Date().toISOString()
                },
                { 
                    nombre: "Guardianes del Sol", 
                    id_leader: players[2]?.id_jugador || players[0].id_jugador, 
                    ranking_global: 3,
                    created_at: new Date().toISOString()
                },
                { 
                    nombre: "Sombras Elficas", 
                    id_leader: players[3]?.id_jugador || players[0].id_jugador, 
                    ranking_global: 4,
                    created_at: new Date().toISOString()
                },
                { 
                    nombre: "Hijos de Thor", 
                    id_leader: players[4]?.id_jugador || players[0].id_jugador, 
                    ranking_global: 5,
                    created_at: new Date().toISOString()
                }
            ];

            // Insertamos los clanes
            const { error } = await supabase
                .from("Clan")  // Nota: minúsculas
                .insert(sampleClans)
                .select();  // Esto devuelve los datos insertados

            if (error) {
                console.error("Error inserting clans:", error);
                alert(`Error al insertar clanes: ${error.message}`);
                return;
            }

            alert("Clanes de prueba insertados correctamente");
            fetchClans(); // Actualizamos la lista
        } catch (error) {
            console.error("Error inserting sample clans:", error);
            alert("Error inesperado al insertar clanes");
        } finally {
            setInserting(false);
        }
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (err) {
            console.error("Error en el proceso de cierre de sesión:", err);
        }
    };

    // Formatear fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

            <main className="flex-1 py-12 mt-36">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-yellow-400 mb-4 font-[Electrolize] tracking-wide">
                            Clanes Legendarios
                        </h1>
                        <p className="text-xl text-white opacity-80">
                            Las agrupaciones más poderosas de Ciudad de las Leyendas
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                        </div>
                    ) : clans.length > 0 ? (
                        <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-yellow-500 shadow-lg shadow-purple-500/20">
                            
                            <div className="grid grid-cols-12 bg-yellow-600 text-gray-900 font-bold p-4 items-center">
                                <div className="col-span-1 text-center">Rank</div>
                                <div className="col-span-5 pl-4">Nombre del Clan</div>
                                <div className="col-span-3">Líder</div>
                                <div className="col-span-3 text-center">Fundación</div>
                            </div>
                        <div className="divide-y divide-purple-800">
                            {clans.map((clan, index) => (
                                <div key={clan.id_clan} className={`grid grid-cols-12 p-4 items-center hover:bg-purple-900 hover:bg-opacity-50 transition-colors ${
                                    index === 0 ? "bg-yellow-500 bg-opacity-10" : 
                                    index % 2 === 0 ? "bg-gray-800 bg-opacity-30" : ""
                                }`}>
                                    <div className="col-span-1 text-center">
                                        <span className={`${
                                            index === 0 ? "text-yellow-400 font-bold" : "text-white"
                                        }`}>
                                            {clan.ranking_global}
                                        </span>
                                    </div>
                                    <div className="col-span-5 pl-4">
                                        <span className={`${
                                            index === 0 ? "text-yellow-400 font-bold text-lg" : 
                                            index < 3 ? "text-white font-medium" : "text-gray-300"
                                        }`}>
                                            {clan.nombre}
                                        </span>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="flex items-center">
                                            {index === 0 && <span className="mr-2 text-yellow-400">👑</span>}
                                            <span className={`${
                                                index === 0 ? "text-yellow-400" : 
                                                index < 3 ? "text-white" : "text-gray-300"
                                            }`}>
                                                {clan.jugador?.nombre || 'Desconocido'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-center text-gray-300">
                                        {clan.created_at ? formatDate(clan.created_at) : 'No registrada'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-900 bg-opacity-50 rounded-xl">
                            <p className="text-2xl text-white">No hay clanes registrados aún...</p>
                            <p className="text-gray-400 mt-2">Crea el primer clan y escribe tu leyenda</p>
                            
                            <button 
                                onClick={insertSampleClans}
                                disabled={inserting}
                                className={`mt-6 bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30 ${
                                    inserting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {inserting ? 'Insertando...' : 'Insertar Clanes de Prueba'}
                            </button>
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <button className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30">
                            Crear mi clan
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}