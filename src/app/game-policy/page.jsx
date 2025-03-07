'use client';

import { useState } from 'react';
import { Header, Footer } from "@/components/ui";
import { translationsGamePolicy } from '@/lang/translations';
import { useEffect } from 'react';
import supabase from '@/helpers/supabaseClient';

export default function GamePolicy() {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const translation = translationsGamePolicy[currentLanguage] || translationsGamePolicy['es'];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <div>
      <Header language={currentLanguage} changeLanguage={changeLanguage} isLoggedIn={isLoggedIn}/>
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
    </div>
  );
}