'use client';

import { Header, Footer } from '@/components/ui';
import { FaShoppingCart } from 'react-icons/fa';
import { translationsHelpOrders } from '@/lang/translations';
import { useState } from 'react';

export default function OrderHelp() {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const translation = translationsHelpOrders[currentLanguage] || translationsHelpOrders["es"];

  return (
    <div className="flex flex-col min-h-screen">
      <Header language={currentLanguage} changeLanguage={setCurrentLanguage} />
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaShoppingCart className="text-purple-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">{translation.title}</h2>
          </div>
          <p className="text-gray-700 mb-4">{translation.description}</p>
          
          <h3 className="text-lg font-semibold mb-2">{translation.faq_title}</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            {translation.faq_list.map((faq, index) => (
              <li key={index}>{faq}</li>
            ))}
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">{translation.qa_title}</h3>
          <div className="text-gray-600 mb-4">
            {translation.qa_list.map((qa, index) => (
              <div key={index}>
                <p className="font-semibold">{qa.question}</p>
                <p>{qa.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer language={currentLanguage} />
    </div>
  );
}