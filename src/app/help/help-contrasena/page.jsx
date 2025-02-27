'use client';

import { Header, Footer } from '@/components/ui';
import { FaKey } from 'react-icons/fa';

export default function PasswordHelp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaKey className="text-red-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">Ayuda con la Contraseña</h2>
          </div>
          <p className="text-gray-700 mb-4">Aquí encontrarás información útil sobre la seguridad y recuperación de tu contraseña.</p>
          
          <h3 className="text-lg font-semibold mb-2">Consejos de seguridad</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>No compartas tu contraseña con nadie</li>
            <li>Evita usar información personal en tu contraseña</li>
            <li>Usa combinaciones de letras, números y símbolos</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Preguntas y Respuestas</h3>
          <div className="text-gray-600 mb-4">
            <p className="font-semibold">Pregunta 1: ¿Cómo puedo restablecer mi contraseña?</p>
            <p>Respuesta: Ve a la página de restablecimiento de contraseña y sigue las instrucciones proporcionadas.</p>
            
            <p className="font-semibold mt-4">Pregunta 2: ¿Cómo puedo cambiar mi contraseña?</p>
            <p>Respuesta: Accede a la configuración de tu cuenta y elige la opción para cambiar tu contraseña.</p>
            
            <p className="font-semibold mt-4">Pregunta 3: ¿Qué debo hacer si olvidé mi contraseña?</p>
            <p>Respuesta: Usa la opción de restablecimiento de contraseña en la página de inicio de sesión.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}