'use client';

import { useState } from 'react';
import { Header, Footer } from "@/components/ui";
import { translationsAboutUs } from '@/lang/translations';
import { useEffect } from 'react';
import supabase from '@/helpers/supabaseClient';
import { useRouter } from 'next/navigation';


export default function AboutUs() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const translation = translationsAboutUs[currentLanguage] || translationsAboutUs['es'];

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header language={currentLanguage} changeLanguage={changeLanguage} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <div className="flex-grow overflow-y-auto p-4 mt-44">
        {/* Título y descripción principal */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mt-8 mb-8">{translation.title}</h2>
          <p className="text-lg mb-20 max-w-2xl mx-auto">{translation.description}</p>
        </div>

        {/* Elementos clave */}
        <h2 className="text-2xl font-semibold text-center mb-8">{translation.key_elements}</h2>
        <div className="text-left max-w-2xl mx-auto">
          {/* Divisas de pasos */}
          <h3 className="text-xl font-semibold mb-4">{translation.currency}</h3>
          <ul className="list-disc list-inside mb-8">
            {translation.currency_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          {/* Construcción y Mejoras de Edificios */}
          <h3 className="text-xl font-semibold mb-4">{translation.building_construction}</h3>
            <ul className="list-disc list-inside mb-8">
              {translation.building_details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          {/* Competencias Semanales de Grupos */}
          <h3 className="text-xl font-semibold mb-4">{translation.weekly_competitions}</h3>
          <ul className="list-disc list-inside mb-8">
            {translation.weekly_competitions_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          {/* Desbloqueo de Áreas y construcciones */}
          <h3 className="text-xl font-semibold mb-4">{translation.area_unlocking}</h3>
          <p className="mb-4">{translation.area_unlocking_details}</p>
          {/* Tienda de Lucky Boxes y Potenciadores */}
          <h3 className="text-xl font-semibold mb-4">{translation.lucky_boxes}</h3>
          <ul className="list-disc list-inside mb-4">
            {translation.lucky_boxes_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          {/* Estadísticas y Clasificación Global */}
          <h3 className="text-xl font-semibold mb-4">{translation.global_stats}</h3>
          <ul className="list-disc list-inside mb-4">
            {translation.global_stats_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          {/* Raids */}
          <h3 className="text-xl font-semibold mb-4">{translation.raids}</h3>
          <ul className="list-disc list-inside mb-4">
            {translation.raids_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          {/* Resumen de la experiencia */}
          <h3 className="text-xl font-semibold mb-4">{translation.summary_experience}</h3>
          <p>{translation.summary_experience_details}</p>
        </div>
      </div>
      <Footer language={currentLanguage} />
    </div>
  );
}