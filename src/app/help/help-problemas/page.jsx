'use client';

import { Header, Footer } from '@/components/ui';
import { FaExclamationTriangle } from 'react-icons/fa';
import { translationsHelpProblems } from '@/lang/translations';
import { useState } from 'react';

export default function ProblemDescription() {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const translation = translationsHelpProblems[currentLanguage] || translationsHelpProblems["es"];

  return (
    <div className="flex flex-col min-h-screen">
      <Header language={currentLanguage} changeLanguage={setCurrentLanguage} />
      <main className="flex-grow container mx-auto px-4 mt-40">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-red-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold">{translation.title}</h2>
          </div>
          <p className="text-gray-700 mb-4">{translation.description}</p>
          
          <h3 className="text-lg font-semibold mb-2">{translation.common_problems}</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            {translation.problems_list.map((problem, index) => (
              <li key={index}>{problem}</li>
            ))}
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">{translation.faq_title}</h3>
          <div className="text-gray-600 mb-4">
            {translation.faq_list.map((faq, index) => (
              <div key={index}>
                <p className="font-semibold">{faq.question}</p>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer language={currentLanguage} />
    </div>
  );
}