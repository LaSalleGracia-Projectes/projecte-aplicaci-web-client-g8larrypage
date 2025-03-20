'use client';

import { useState, useEffect, useContext } from 'react';
import { Header, Footer } from "@/components/ui";
import { translationsPrivacyPolicy } from '@/lang/translations';
import supabase from '@/helpers/supabaseClient';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';

export default function PrivacyPolicy() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const translation = translationsPrivacyPolicy[currentLanguage] || translationsPrivacyPolicy['es'];
  const { isLoggedIn, setIsLoggedIn, setUserRole } = useContext(UserContext);

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
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
    <div>
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
        </div>
      </section>
      <Footer language={currentLanguage} />
    </div>
  );
}