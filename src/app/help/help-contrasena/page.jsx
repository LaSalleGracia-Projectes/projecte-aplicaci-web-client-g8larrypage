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
            <h2 className="text-2xl font-bold">Contraseña</h2>
          </div>
          <p className="text-gray-700 mb-4">Descripción sobre la contraseña.</p>
          
          <h3 className="text-lg font-semibold mb-2">Consejos de seguridad</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>No compartas tu contraseña a nadie</li>
            <li>No poner tu nombre y apellido en tu contraseña</li>
            <li></li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Preguntas y Respuestas</h3>
          <div className="text-gray-600 mb-4">
            <p className="font-semibold">Pregunta 1: ¿Cómo puedo restablecer mi contraseña?</p>
            <p>Respuesta: Para restablecer tu contraseña, ve a la página de restablecimiento de contraseña y sigue las instrucciones.</p>
            
            <p className="font-semibold mt-4">Pregunta 2: ¿Cómo puedo cambiar mi contraseña?</p>
            <p>Respuesta: Para cambiar tu contraseña, ve a la página de cambio de contraseña y sigue las instrucciones.</p>
            
            <p className="font-semibold mt-4">Pregunta 3: ¿Qué debo hacer si olvido mi contraseña?</p>
            <p>Respuesta: Si olvidas tu contraseña, puedes restablecerla usando la opción de restablecimiento de contraseña en la página de inicio de sesión.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}