'use client'

import supabase from "@/helpers/supabaseClient";
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
  });
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (data) {
        setUserData({
          legendId: data.user.user_metadata.full_name || data.user.user_metadata.display_name || "",
          email: data.user.email || "",
          provider: data.user.app_metadata.provider || "",
        });
        console.log("User data fetched successfully:", data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user.id;

      // Actualizar la tabla "Usuario"
      const { error: updateError } = await supabase
        .from("Usuario")
        .update({
          nombre: userData.legendId,
          correo: userData.email,
        })
        .eq("id", userId);

      if (updateError) throw updateError;

      // Actualizar los metadatos del usuario autenticado
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          full_name: userData.legendId,
          display_name: userData.legendId,
        },
      });

      if (metadataError) throw metadataError;

      alert(translation.update_success);

      // Volver a cargar los datos actualizados
      await fetchUserData();
    } catch (error) {
      console.error("Error updating user data:", error);
      alert(translation.update_error);
    } finally {
      setLoading(false);
    }
  };

  const renderProvider = () => {
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 p-6">
      {/* Header */}
      <Header 
        language={language} 
        changeLanguage={changeLanguage} 
        isLoggedIn={isLoggedIn} 
        onLogout={() => supabase.auth.signOut().then(() => setIsLoggedIn(false))}
      />

      {/* Contenido principal */}
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
              <div>
                <Input
                  type="text"
                  name="legendId"
                  label={translation.name}
                  value={userData.legendId}
                  onChange={handleChange}
                  size="lg"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  label={translation.email}
                  value={userData.email}
                  onChange={handleChange}
                  size="lg"
                />
              </div>
              <div>
                <Typography variant="small" className="mb-2 font-medium">
                  {translation.provider}
                </Typography>
                <div className="bg-gray-200 p-3 rounded-md flex items-center">
                  {renderProvider()}
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