"use client";

import { useState, useEffect, useContext } from 'react';
import { Header, Footer } from "@/components/ui";
import { useRouter } from "next/navigation";
import supabase from "@/helpers/supabaseClient";
import { insertContactMessage } from "@/supabase/insertContact";
import { UserContext } from '@/context/UserContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { translationsContact } from '@/lang/translations';

export default function ContactPage() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, setUserRole, language, changeLanguage } = useContext(UserContext);
  const translation = translationsContact[language] || translationsContact['es'];
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [mensajeEnvio, setMensajeEnvio] = useState({ tipo: '', texto: '' });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    checkSession();
  }, [setIsLoggedIn]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setIsLoggedIn(false);
        setUserRole(null);
        localStorage.removeItem('supabase.auth.token');
        router.push('/');
      }
    } catch (err) {
      console.error("Error en el proceso de cierre de sesión:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensajeEnvio({ tipo: '', texto: '' });

    const result = await insertContactMessage(formData);
    setMensajeEnvio({
      tipo: result.success ? 'exito' : 'error',
      texto: result.success
        ? translation.success_message
        : translation.error_message
    });

    if (result.success) setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    setEnviando(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Header language={language} changeLanguage={changeLanguage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 px-6 flex justify-center items-center mt-36">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-xl transform scale-110"></div>
          <div className="relative bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">{translation.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              {translation.description}
            </p>
            {mensajeEnvio.texto && (
              <div className={`p-4 mb-6 rounded-md ${mensajeEnvio.tipo === 'exito' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>{mensajeEnvio.texto}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="nombre" placeholder={translation.name_placeholder} value={formData.nombre} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white" />
              <input type="email" name="email" placeholder={translation.email_placeholder} value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white" />
              <input type="text" name="asunto" placeholder={translation.subject_placeholder} value={formData.asunto} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white" />
              <textarea name="mensaje" placeholder={translation.message_placeholder} value={formData.mensaje} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white" rows="5"></textarea>
              <button type="submit" disabled={enviando} className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70">{enviando ? translation.sending : translation.send_button}</button>
            </form>
          </div>
        </div>
      </div>
      <Footer language={language} />
      <div className="fixed bottom-4 right-4">
        <button onClick={toggleTheme} className="bg-gray-800 text-white p-4 rounded-full">{isDarkMode ? <FaSun /> : <FaMoon />}</button>
      </div>
    </div>
  );
}