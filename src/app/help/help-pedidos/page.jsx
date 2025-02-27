'use client';

import { Header, Footer } from '@/components/ui';
import { FaEnvelope, FaKey, FaShieldAlt, FaShoppingCart } from 'react-icons/fa';

export default function OrderHelp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaShoppingCart className="text-purple-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">Ayuda con Compras de Skins y Pases</h2>
          </div>
          <p className="text-gray-700 mb-4">Aquí encontrarás respuestas a preguntas frecuentes sobre la compra de skins, pases de batalla y otros artículos digitales.</p>
          
          <h3 className="text-lg font-semibold mb-2">Preguntas Frecuentes</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>¿Cómo puedo verificar mi compra de skins o pases?</li>
            <li>¿Cuánto tiempo tarda en acreditarse mi compra?</li>
            <li>¿Qué hago si no recibí mi skin o pase después de pagar?</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Preguntas y Respuestas</h3>
          <div className="text-gray-600 mb-4">
            <p className="font-semibold">Pregunta 1: ¿Cómo puedo verificar mi compra de skins o pases?</p>
            <p>Respuesta: Puedes revisar el historial de compras en la configuración de tu cuenta dentro del juego o en la tienda en línea.</p>
            
            <p className="font-semibold mt-4">Pregunta 2: ¿Cuánto tiempo tarda en acreditarse mi compra?</p>
            <p>Respuesta: Normalmente, las compras se acreditan en unos minutos, pero en algunos casos puede tardar hasta 24 horas. Revisa tu correo de confirmación.</p>
            
            <p className="font-semibold mt-4">Pregunta 3: ¿Qué hago si no recibí mi skin o pase después de pagar?</p>
            <p>Respuesta: Primero, verifica que el pago haya sido exitoso. Luego, revisa tu inventario dentro del juego. Si el problema persiste, contacta al soporte del juego con el comprobante de pago.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
