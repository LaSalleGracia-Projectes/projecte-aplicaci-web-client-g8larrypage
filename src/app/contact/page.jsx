"use client";

import { useState, useEffect, useContext } from 'react';
import { Header, Footer } from "@/components/ui";
import { useRouter } from "next/navigation";
import supabase from "@/helpers/supabaseClient";
import { insertContactMessage } from "@/supabase/insertContact";
import { UserContext } from '@/context/UserContext';

export default function ContactPage() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, setUserRole } = useContext(UserContext);
  const [language, setLanguage] = useState('es');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [mensajeEnvio, setMensajeEnvio] = useState({ tipo: '', texto: '' });

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
  
  const changeLanguage = (lang) => {
    setLanguage(lang);
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
    
    if (result.success) {
      setMensajeEnvio({ 
        tipo: 'exito', 
        texto: '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.' 
      });
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    } else {
      setMensajeEnvio({ 
        tipo: 'error', 
        texto: 'Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.' 
      });
    }
    
    setEnviando(false);
  };
    
  //   // Simulación temporal del envío
  //   setTimeout(() => {
  //     setMensajeEnvio({ 
  //       tipo: 'exito', 
  //       texto: '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.' 
  //     });
  //     setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  //     setEnviando(false);
  //   }, 1000);
  // };

  return (
    <div>
      <Header language={language} changeLanguage={changeLanguage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="pt-32"></div>

      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Contacto</h1>
            <p className="text-gray-600">Si en la página de ayuda no encuentras tu respuesta, rellena el formulario y nos pondremos en contacto contigo lo antes posible.</p>
          </div>

          {mensajeEnvio.texto && (
            <div className={`p-4 mb-6 rounded-md ${mensajeEnvio.tipo === 'exito' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {mensajeEnvio.texto}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto
              </label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Asunto de tu mensaje"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={enviando}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {enviando ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}