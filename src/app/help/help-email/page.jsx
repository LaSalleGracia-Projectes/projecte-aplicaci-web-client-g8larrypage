'use client';

import { Header, Footer } from '@/components/ui';
import { FaEnvelope } from 'react-icons/fa';
import { translationsHelpEmail } from '@/lang/translations';
import { useState, useEffect, useContext } from 'react';
import supabase from '@/helpers/supabaseClient';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';

export default function EmailHelp() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const translation = translationsHelpEmail[currentLanguage] || translationsHelpEmail["es"];
  const { isLoggedIn, setIsLoggedIn, setUserRole } = useContext(UserContext);

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
    <div className="flex flex-col min-h-screen">
      <Header language={currentLanguage} changeLanguage={setCurrentLanguage} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">{translation.title}</h2>
          </div>
          <p className="text-gray-700 mb-4">{translation.description}</p>
          
          <h3 className="text-lg font-semibold mb-2">{translation.quick_solutions}</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            {translation.quick_solutions_list.map((solution, index) => (
              <li key={index}>{solution}</li>
            ))}
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">{translation.faq}</h3>
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