'use client';

import Image from "next/image";
import supabase from "@/helpers/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header, Footer } from "@/components/ui";
import { GalleryWithCarousel } from "@/components/Carrusel";
import { translations } from '@/lang/translations';
import { Slide } from "react-awesome-reveal";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push('/');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div>
      <Header language={language} changeLanguage={changeLanguage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      {/* Main Image */}
      <section className="w-full h-[90vh] relative">
          <Image
            src="/assets/img/preview.png"
            alt="Imagen Principal"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
      </section>

      {/* Download Section */}
      <Slide>
        <section className="text-center py-40 bg-white-100 flex items-center justify-center gap-10">
          <div className="w-3/5">
            <Image src="/assets/img/anuncio-app.png" alt="Imagen Descarga" width={700} height={400} quality={100} />
          </div>
          <div className="w-3/5 text-left">
            <h2 className="text-4xl font-bold mb-4">{translations[language].download_title}</h2>
            <p className="max-w-lg text-black-700 mb-6">{translations[language].download_description}</p>
            <div className="flex">
              <a href="#" className="ml-40 mt-4">
                <Image src="/assets/img/googleplay.png" alt="Google Play" width={180} height={60} />
              </a>
            </div>
          </div>
        </section>
      </Slide>

      {/* News Section */}
      <section className="py-4">
        <h2 className="text-2xl font-bold text-center mb-12">{translations[language].news}</h2>
        <GalleryWithCarousel language={language}/>
      </section>

      <Footer language={language}/>
    </div>
  );
}
