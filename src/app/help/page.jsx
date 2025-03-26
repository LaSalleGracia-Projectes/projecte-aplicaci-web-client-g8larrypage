'use client';

import { Header, Footer } from "@/components/ui";
import { Card } from "@/components/Material-Components";
import { FaKey, FaEnvelope, FaShieldAlt, FaShoppingCart, FaFolderOpen, FaHandPaper, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { translationsHelp } from "@/lang/translations";
import { useEffect, useState, useContext } from "react";
import supabase from "@/helpers/supabaseClient";
import { useRouter } from "next/navigation";
import { UserContext } from '@/context/UserContext';

export default function HelpPage() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUserRole } = useContext(UserContext);
  const translation = translationsHelp[currentLanguage] || translationsHelp["es"];
  const changeLanguage = (newLanguage) => setCurrentLanguage(newLanguage);

  // Manejar el cambio de tema
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      
      if (newMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }

      return newMode;
    });
  };

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

  // Verificar tema al cargar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(savedTheme === 'dark');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Actualiza la función de cierre de sesión
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error al cerrar sesión:", error.message);
        return;
      }
      
      setIsLoggedIn(false);
      setUserRole(null);
      
      localStorage.removeItem('supabase.auth.token');
      
      // Redirige al home
      router.push('/');
    } catch (err) {
      console.error("Error en el proceso de cierre de sesión:", err);
    }
  };
  
  const helpOptions = [
    { icon: <FaKey className="text-red-500 text-2xl" />, title: translation.password, description: translation.password_description, link: "/help/help-contrasena" },
    { icon: <FaEnvelope className="text-red-500 text-2xl" />, title: translation.email, description: translation.email_description, link: "/help/help-email" },
    { icon: <FaShieldAlt className="text-red-500 text-2xl" />, title: translation.security, description: translation.security_description, link: "/help/help-seguridad" },
    { icon: <FaShoppingCart className="text-red-500 text-2xl" />, title: translation.orders, description: translation.orders_description, link: "/help/help-pedidos" },
    { icon: <FaFolderOpen className="text-red-500 text-2xl" />, title: translation.issues, description: translation.issues_description, link: "/help/help-problemas" },
    { icon: <FaHandPaper className="text-red-500 text-2xl" />, title: translation.block_history, description: translation.block_history_description, link: "/help/help-bloqueos" },
  ];

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <Header language={currentLanguage} changeLanguage={changeLanguage} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <main className="container mx-auto px-4 py-8 mt-60 mb-60">
        <h1 className="text-3xl font-bold mb-6">{translation.manage_account}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {helpOptions.map((option, index) => (
          <Link key={index} href={option.link || "#"} passHref>
            <Card className="p-4 border shadow-lg rounded-lg flex flex-col items-start transition-transform duration-300 cursor-pointer 
                            hover:scale-105 
                            bg-white dark:bg-gray-800 
                            text-gray-800 dark:text-gray-200 
                            hover:bg-gray-100 dark:hover:bg-gray-700">
              {option.icon}
              <h2 className="text-lg font-semibold mt-2">{option.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
            </Card>
          </Link>
        ))}
      </div>
      </main>
      <Footer language={currentLanguage}/>

      {/* Botón de tema */}
      <div className="fixed bottom-4 right-4">
        <button onClick={toggleTheme} className="bg-gray-800 text-white p-4 rounded-full">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
}