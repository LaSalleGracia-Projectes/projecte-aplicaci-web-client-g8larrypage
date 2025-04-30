'use client';

import Image from "next/image";
import Link from "next/link";
import supabase from "@/helpers/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useContext, useState } from "react";
import { Header, Footer } from "@/components/ui";
import { GalleryWithCarousel } from "@/components/Carrusel";
import { translations } from '@/lang/translations';
import { FaSun, FaMoon } from 'react-icons/fa';
import { UserContext } from '@/context/UserContext';

export default function Home() {
  const router = useRouter();
  const { userRole, isLoggedIn, setIsLoggedIn, setUserRole, language, changeLanguage } = useContext(UserContext);
  const translation = translations[language] || translations['es'];
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Verifica el tema guardado al cargar la página
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserRole(null);
    router.push('/');
  };
  
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

  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      {userRole === 'admin' && (
        <div className="fixed bottom-4 left-4 z-50">
          <Link href="/admin-panel">
            <button className="bg-gray-800 text-white p-4 rounded-full">
              Panel Admin
            </button>
          </Link>
        </div>
      )}
      <div className="flex-1">
        <Header language={language} changeLanguage={changeLanguage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
        {/* Imagen principal */}
        <section className="w-full h-[90vh] relative">
          <Image
            src="/assets/img/imagen-principal2.png"
            alt="Imagen Principal"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
        </section>

        {/* Descarga */}
        <section className="py-16 px-6 bg-white dark:bg-gray-900 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">  
          <div className="w-full md:w-1/2">
            <Image
              src="/assets/img/anuncio-app.png"
              alt="Imagen Descarga"
              width={700}
              height={400}
              className="w-full h-auto"
              quality={100}
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {translation.download_title}
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              {translation.download_description}
            </p>
            <div className="flex justify-center md:justify-start">
              <a href="#" className="mt-4">
                <Image
                  src="/assets/img/googleplay.png"
                  alt="Google Play"
                  width={180}
                  height={60}
                />
              </a>
            </div>
          </div>
        </div>
        </section>



        {/* Noticias */}
        <section className="py-4 dark:bg-gray-900">
          <GalleryWithCarousel language={language}/>
        </section>

        <Footer language={language}/>

        {/* Botón de tema */}
        <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
          <button onClick={toggleTheme} className="bg-gray-800 text-white p-4 rounded-full">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
}