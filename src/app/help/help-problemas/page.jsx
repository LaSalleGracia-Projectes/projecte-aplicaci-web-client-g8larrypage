'use client';

import { Header, Footer } from '@/components/ui';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function ProblemDescription() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-red-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">Descripción de Problemas Comunes</h2>
          </div>
          <p className="text-gray-700 mb-4">Aquí encontrarás información sobre los problemas más comunes y cómo resolverlos de manera efectiva.</p>
          
          <h3 className="text-lg font-semibold mb-2">Problemas Frecuentes</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>No puedo acceder a mi cuenta</li>
            <li>No recibí mi compra de skins o pases</li>
            <li>El juego se cierra inesperadamente</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Preguntas y Soluciones</h3>
          <div className="text-gray-600 mb-4">
            <p className="font-semibold">Problema 1: No puedo acceder a mi cuenta</p>
            <p>Solución: Asegúrate de que tus credenciales sean correctas. Si olvidaste tu contraseña, usa la opción de recuperación de cuenta.</p>
            
            <p className="font-semibold mt-4">Problema 2: No recibí mi compra de skins o pases</p>
            <p>Solución: Verifica que el pago haya sido procesado correctamente y revisa tu historial de compras. Si el problema persiste, contacta al soporte.</p>
            
            <p className="font-semibold mt-4">Problema 3: El juego se cierra inesperadamente</p>
            <p>Solución: Asegúrate de que tu dispositivo cumple con los requisitos del juego y que tienes la última versión instalada. Si el problema continúa, prueba reinstalar el juego.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
