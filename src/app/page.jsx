'use client';

import Image from "next/image";
import supabase from "@/helpers/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useContext, useState } from "react";
import { Header, Footer } from "@/components/ui";
import { GalleryWithCarousel } from "@/components/Carrusel";
import { translations } from '@/lang/translations';
import { Slide } from "react-awesome-reveal";
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
    <div className="flex min-h-screen">
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
        
        {/* Imagen principal - Ahora responsive */}
        <section className="w-full h-[50vh] md:h-[70vh] lg:h-[90vh] relative">
          <Image
            src="/assets/img/preview.png"
            alt="Imagen Principal"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
        </section>

        {/* Descarga - Ahora responsive */}
        <Slide>
          <section className="text-center py-12 md:py-20 lg:py-40 bg-white-100 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-4">
            <div className="w-full md:w-1/2 lg:w-2/5">
              <Image 
                src="/assets/img/anuncio-app.png" 
                alt="Imagen Descarga" 
                width={700} 
                height={400} 
                quality={100}
                className="max-w-full h-auto" 
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 text-left mt-6 md:mt-0">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">{translation.download_title}</h2>
              <p className="text-sm md:text-base lg:text-lg text-black-700 mb-4 md:mb-6">{translation.download_description}</p>
              <div className="flex justify-center md:justify-start">
                <a href="#" className="mt-2 md:mt-4">
                  <Image 
                    src="/assets/img/googleplay.png" 
                    alt="Google Play" 
                    width={140} 
                    height={46}
                    className="w-32 md:w-36 lg:w-44 h-auto" 
                  />
                </a>
              </div>
            </div>
          </section>
        </Slide>

        {/* Noticias - Corregir el acceso a translation */}
        <section className="py-4 px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-12">{translation.news}</h2>
          <GalleryWithCarousel language={language}/>
        </section>

        <Footer language={language}/>

        {/* Botón de tema */}
        <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
          <button onClick={toggleTheme} className="bg-gray-800 text-white p-3 md:p-4 rounded-full">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
}