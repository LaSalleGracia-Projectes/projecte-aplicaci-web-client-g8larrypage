'use client';

import { Header, Footer } from '@/components/ui';
import { FaEnvelope, FaKey } from 'react-icons/fa';

export default function EmailHelp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">Problemas con el Correo Electrónico</h2>
          </div>
          <p className="text-gray-700 mb-4">Aquí encontrarás soluciones a problemas comunes con tu correo electrónico.</p>
          
          <h3 className="text-lg font-semibold mb-2">Soluciones rápidas</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Verifica que ingresaste el correo correctamente</li>
            <li>Revisa la bandeja de spam o correo no deseado</li>
            <li>Asegúrate de que tu buzón no esté lleno</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Preguntas y Respuestas</h3>
          <div className="text-gray-600 mb-4">
            <p className="font-semibold">Pregunta 1: ¿No recibí el correo de verificación?</p>
            <p>Respuesta: Asegúrate de revisar la carpeta de spam o intenta reenviar el correo desde la configuración de tu cuenta.</p>
            
            <p className="font-semibold mt-4">Pregunta 2: ¿Qué hago si olvidé mi correo asociado?</p>
            <p>Respuesta: Intenta recordar posibles correos que usaste o comunícate con el soporte técnico para asistencia.</p>
            
            <p className="font-semibold mt-4">Pregunta 3: ¿Por qué no puedo cambiar mi correo en la cuenta?</p>
            <p>Respuesta: Algunas cuentas tienen restricciones para cambiar el correo. Consulta la configuración o contacta al soporte.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}