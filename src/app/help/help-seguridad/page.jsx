'use client';

import { Header, Footer } from '@/components/ui';
import { FaEnvelope, FaKey, FaShieldAlt } from 'react-icons/fa';

export  default function SecurityDescription() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaShieldAlt className="text-green-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">Descripción de la Seguridad</h2>
          </div>
          <p className="text-gray-700 mb-4">La seguridad en línea es fundamental para proteger tu información personal y evitar accesos no autorizados.</p>
          
          <h3 className="text-lg font-semibold mb-2">Medidas de seguridad recomendadas</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Usa contraseñas seguras y únicas para cada cuenta</li>
            <li>Habilita la autenticación en dos pasos (2FA) cuando sea posible</li>
            <li>No compartas información confidencial en correos electrónicos o mensajes</li>
            <li>Verifica siempre la autenticidad de los sitios web antes de ingresar credenciales</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Preguntas y Respuestas</h3>
          <div className="text-gray-600 mb-4">
            <p className="font-semibold">Pregunta 1: ¿Cómo protejo mi cuenta de accesos no autorizados?</p>
            <p>Respuesta: Usa contraseñas fuertes, habilita la autenticación en dos pasos y mantén actualizados tus dispositivos.</p>
            
            <p className="font-semibold mt-4">Pregunta 2: ¿Es seguro utilizar redes Wi-Fi públicas?</p>
            <p>Respuesta: No es recomendable. Si necesitas usarlas, emplea una VPN para cifrar tu conexión.</p>
            
            <p className="font-semibold mt-4">Pregunta 3: ¿Qué hacer si sospecho que mi cuenta ha sido comprometida?</p>
            <p>Respuesta: Cambia tu contraseña de inmediato, revisa la actividad reciente y contacta al soporte técnico.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
