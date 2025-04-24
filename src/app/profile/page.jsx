'use client';

import supabase from "@/helpers/supabaseClient";
import { v4 as uuid } from "uuid";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardBody, Typography } from "@/components/Material-Components";
import { FaGoogle, FaFacebook, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";
import { translationsProfile } from "@/lang/translations";
import { Header } from "@/components/ui";

export default function ProfileUser() {
  const { language, isLoggedIn, setIsLoggedIn, changeLanguage } = useContext(UserContext);
  const translation = translationsProfile[language] || translationsProfile['es'];

  const router = useRouter();
  const [userData, setUserData] = useState({
    legendId: "",
    email: "",
    provider: "",
    pasosTotales: 0,
  });
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  const fetchUserData = async () => {
    try {
      setError(null);

      // Verificar si hay una sesión activa
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        setError("¡Inicia sesión para acceder a tu perfil!");
        setInitialized(true);
        return;
      }

      const userId = sessionData.session.user.id;

      // Obtener datos del jugador de la tabla Jugador
      const { data: playerData, error: playerError } = await supabase
        .from("Jugador")
        .select("*")
        .eq("id_usuario", userId)
        .single();

      if (playerError) throw playerError;

      setUserData({
        legendId: sessionData.session.user.user_metadata.full_name || 
                 sessionData.session.user.user_metadata.display_name || 
                 "",
        email: sessionData.session.user.email || "",
        provider: sessionData.session.user.app_metadata.provider || "",
        pasosTotales: playerData?.pasos_totales || 0,
      });
      setAvatarUrl(playerData.avatar_url || "");
      setInitialized(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error al cargar los datos. Por favor, inténtalo de nuevo.");
      setInitialized(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        setError("¡Inicia sesión para actualizar tu perfil!");
        return;
      }

      const userId = sessionData.session.user.id;

      // Subir imagen
      let newAvatarUrl = avatarUrl;
      if (avatarFile) {
        newAvatarUrl = await uploadAvatar(userId);
        setAvatarUrl(newAvatarUrl);
      }

      // Actualizar los datos del usuario en la tabla "Usuario"
      const { error: updateError } = await supabase
        .from("Usuario")
        .update({
          nombre: userData.legendId,
          correo: userData.email,
          avatar_url: newAvatarUrl,
        })
        .eq("id", userId);

      if (updateError) throw updateError;

      alert("¡Perfil actualizado con éxito!");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setError("Error al actualizar el perfil. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (e) => {
    try {
      const file = e.target.files[0];
  
      // Obtener el usuario desde la sesión activa
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error("Error obteniendo la sesión del usuario:", sessionError);
        return;
      }
  
      const userId = sessionData.session.user.id;
  
      // Generar un identificador único para la imagen
      const uniqueId = uuid();
      const filePath = `${userId}/${uniqueId}`;
  
      // Subir la imagen al bucket de Supabase
      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, file);
  
      if (uploadError) {
        console.error("Error al subir la imagen:", uploadError);
        return;
      }
  
      // Obtener la URL pública de la imagen
      const { data: publicUrlData } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath);
  
      const avatarUrl = publicUrlData.publicUrl;
  
      // Actualizar la columna avatar_url en la tabla Jugador
      const { error: updateError } = await supabase
        .from('Usuario')
        .update({ avatar_url: avatarUrl })
        .eq('id', userId);
  
      if (updateError) {
        console.error("Error al actualizar avatar_url en la tabla Jugador:", updateError);
        return;
      }
  
      console.log("Imagen subida y avatar_url actualizado con éxito:", avatarUrl);
  
      // Actualizar el estado para reflejar la nueva imagen
      setAvatarUrl(avatarUrl);
    } catch (error) {
      console.error("Error en uploadImage:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderProviderIcon = () => {
    switch (userData.provider.toLowerCase()) {
      case "google":
        return (
          <div className="flex items-center gap-2">
            <FaGoogle className="text-red-500" /> Google
          </div>
        );
      case "facebook":
        return (
          <div className="flex items-center gap-2">
            <FaFacebook className="text-blue-600" /> Facebook
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" /> Correo
          </div>
        );
    }
  };

  const uploadAvatar = async (userId) => {
    if (!avatarFile) return avatarUrl;
  
    const fileExt = avatarFile.name.split('.').pop();
    const filePath = `avatars/${userId}.${fileExt}`;
  
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true });
  
    if (uploadError) throw uploadError;
  
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
  
    return data.publicUrl;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!initialized) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 p-6">
        <Header 
          language={language} 
          changeLanguage={changeLanguage} 
          isLoggedIn={isLoggedIn} 
          onLogout={() => supabase.auth.signOut().then(() => setIsLoggedIn(false))}
        />
        <div className="flex justify-center items-center flex-grow">
          <Typography variant="h5" color="white">
            Cargando datos del usuario...
          </Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 p-6">
        <Header 
          language={language} 
          changeLanguage={changeLanguage} 
          isLoggedIn={isLoggedIn} 
          onLogout={() => supabase.auth.signOut().then(() => setIsLoggedIn(false))}
        />
        <div className="flex justify-center items-center flex-grow">
          <Card className="w-full max-w-md">
            <CardBody>
              <Typography variant="h5" color="red" className="mb-4 text-center">
                ¡Inicia sesión!
              </Typography>
              <Typography className="mb-4 text-black text-center">
                Volver a la página principal
              </Typography>
              <Button 
                color="blue" 
                onClick={() => router.push("/")}
                fullWidth
              >
                Ir a la página principal
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 p-6">
      <Header 
        language={language} 
        changeLanguage={changeLanguage} 
        isLoggedIn={isLoggedIn} 
        onLogout={() => supabase.auth.signOut().then(() => setIsLoggedIn(false))}
      />

      <div className="flex justify-center items-center flex-grow mt-20">
        <Card className="w-full max-w-md shadow-2xl">
          <CardBody>
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h4" color="blue-gray" className="text-center font-electrolize ml-1">
                {translation.title}
              </Typography>
              <Button
                variant="text"
                color="blue"
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <FaArrowLeft /> {translation.home}
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar upload */}
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="avatar-upload" className="cursor-pointer group">
                <div className="w-28 h-28 rounded-full border-2 border-gray-300 bg-gray-100 overflow-hidden flex items-center justify-center transition hover:opacity-80">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553 2.276A2 2 0 0120 14.118V17a2 2 0 01-2 2h-1m-2-9l-1.447-2.276A2 2 0 0014 6.882V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.882a2 2 0 00.553 1.276L9 10m6 0v10m-6-10v10m0 0H6a2 2 0 01-2-2v-2.882a2 2 0 01.553-1.276L9 10"
                        />
                      </svg>
                      <span className="text-xs mt-1">Subir foto</span>
                    </div>
                  )}
                </div>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* Inputs separados del avatar */}
            <div className="space-y-4">
              <Input
                type="text"
                name="legendId"
                label={translation.name}
                value={userData.legendId}
                onChange={handleChange}
                size="lg"
                required
              />
              <Input
                type="email"
                name="email"
                label={translation.email}
                value={userData.email}
                onChange={handleChange}
                size="lg"
                required
              />
              <Input
                type="number"
                name="pasosTotales"
                label={translation.total_steps || "Pasos totales"}
                value={userData.pasosTotales}
                size="lg"
                min="0"
                readOnly
              />
              <div>
                <Typography variant="small" className="mb-2 font-medium">
                  {translation.provider}
                </Typography>
                <div className="bg-gray-200 p-3 rounded-md flex items-center">
                  {renderProviderIcon()}
                </div>
              </div>
            </div>

            <Button type="submit" color="blue" fullWidth disabled={loading}>
              {loading ? translation.saving : translation.save_changes}
            </Button>
          </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}