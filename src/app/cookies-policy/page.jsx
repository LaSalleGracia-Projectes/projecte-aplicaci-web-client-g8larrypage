'use client';

import supabase from '@/helpers/supabaseClient';
import { useState, useEffect, useContext } from 'react';
import { Header, Footer } from "@/components/ui";
import { translationsCookiesPolicy } from '@/lang/translations';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function CookiesPolicy() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const translation = translationsCookiesPolicy[currentLanguage] || translationsCookiesPolicy['es'];
  const { isLoggedIn, setIsLoggedIn, setUserRole } = useContext(UserContext);

  // Verificar si el usuario tiene una sesión activa
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

  // Cargar el tema guardado en localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Cambiar el idioma de la página
  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  // Cambiar el tema de la página
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  }
  
  // Cerrar sesión del usuario
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
      router.push('/');
    } catch (err) {
      console.error("Error en el proceso de cierre de sesión:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <Header language={currentLanguage} changeLanguage={changeLanguage} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <section className="text-center py-10 bg-white-100 mt-40">
        <h2 className="font-[Electrolize] text-4xl font-bold lg:mb-12">{translation.title}</h2>
        <div className="text-lg text-black-600 px-4 lg:px-0 text-left max-w-4xl mx-auto space-y-6">
          <p className="text-xl"><strong>{translation.effective_date}</strong></p>
          {translation.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mt-6 mb-6">{section.title}</h3>
              {section.content.map((paragraph, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
              ))}
            </div>
          ))}
          <p className="mt-6">{translation.contact} <strong>{translation.contact_email}</strong></p>
        </div>
      </section>
      <Footer language={currentLanguage} />

      {/* Botón de tema */}
      <div className="fixed bottom-4 right-4">
        <button onClick={toggleTheme} className="bg-gray-800 text-white p-4 rounded-full">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
}