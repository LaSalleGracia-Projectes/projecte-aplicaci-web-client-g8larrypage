'use client';

import { Header, Footer } from '@/components/ui';
import { FaExclamationTriangle, FaBan } from 'react-icons/fa';

export default function BanHelp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaBan className="text-red-600 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">Ayuda con Bloqueos y Baneos</h2>
          </div>
          <p className="text-gray-700 mb-4">Aquí encontrarás información sobre bloqueos y baneos en el juego, sus posibles causas y cómo solucionarlos.</p>
          
          <h3 className="text-lg font-semibold mb-2">Motivos Comunes de Baneos</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Uso de software no autorizado o hacks</li>
            <li>Conducta tóxica o lenguaje inapropiado</li>
            <li>Incumplimiento de las normas de la comunidad</li>
            <li>Abuso de errores o glitches del juego</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Preguntas y Soluciones</h3>
          <div className="text-gray-600 mb-4">
            <p className="font-semibold">Problema 1: ¿Por qué me han baneado?</p>
            <p>Solución: Revisa el correo de notificación del baneo y las reglas del juego para entender la razón específica de la sanción.</p>
            
            <p className="font-semibold mt-4">Problema 2: ¿Puedo apelar un baneo?</p>
            <p>Solución: Sí, si consideras que el baneo fue un error, contacta al soporte del juego y proporciona toda la información relevante.</p>
            
            <p className="font-semibold mt-4">Problema 3: ¿Cuánto dura un baneo?</p>
            <p>Solución: Dependiendo de la gravedad de la infracción, puede ser temporal o permanente. Consulta los términos del juego para más detalles.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
