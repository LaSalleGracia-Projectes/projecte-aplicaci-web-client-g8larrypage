'use client';

import { Header, Footer } from '@/components/ui';
import { FaBan } from 'react-icons/fa';
import { translationsHelpBans } from '@/lang/translations';
import { useState } from 'react';
import { useEffect } from 'react';
import supabase from '@/helpers/supabaseClient';
import { useRouter } from 'next/navigation';

export default function BanHelp() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const translation = translationsHelpBans[currentLanguage] || translationsHelpBans["es"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Header language={currentLanguage} changeLanguage={setCurrentLanguage} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaBan className="text-red-600 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">{translation.title}</h2>
          </div>
          <p className="text-gray-700 mb-4">{translation.description}</p>
          
          <h3 className="text-lg font-semibold mb-2">{translation.common_reasons}</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            {translation.reasons_list.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">{translation.faq_title}</h3>
          <div className="text-gray-600 mb-4">
            {translation.faq_list.map((faq, index) => (
              <div key={index}>
                <p className="font-semibold">{faq.question}</p>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer language={currentLanguage} />
    </div>
  );
}