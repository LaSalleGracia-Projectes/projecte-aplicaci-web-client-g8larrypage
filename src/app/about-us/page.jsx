'use client';

import { useState } from 'react';
import { Header, Footer } from "@/components/ui";
import { translationsAboutUs } from '@/lang/translations';

export default function AboutUs() {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const translation = translationsAboutUs[currentLanguage] || translationsAboutUs['es'];

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header language={currentLanguage} changeLanguage={changeLanguage} />
      <div className="flex-grow overflow-y-auto p-4 mt-40">
        <div className="text-center">
          <h2 className="text-4xl font-bold mt-8 mb-4">{translation.title}</h2>
          <p className="text-lg mb-16 max-w-2xl mx-auto">{translation.description}</p>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">{translation.key_elements}</h2>
        <div className="text-left max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-1">{translation.currency}</h3>
          <ul className="list-disc list-inside mb-4">
            {translation.currency_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-1">{translation.building_construction}</h3>
            <ul className="list-disc list-inside mb-4">
              {translation.building_details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          <h3 className="text-xl font-semibold mb-1">{translation.weekly_competitions}</h3>
          <ul className="list-disc list-inside mb-4">
            {translation.weekly_competitions_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-1">{translation.area_unlocking}</h3>
          <p className="mb-4">{translation.area_unlocking_details}</p>
          <h3 className="text-xl font-semibold mb-1">{translation.lucky_boxes}</h3>
          <ul className="list-disc list-inside mb-4">
            {translation.lucky_boxes_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-1">{translation.global_stats}</h3>
          <ul className="list-disc list-inside mb-4">
            {translation.global_stats_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-1">{translation.raids}</h3>
          <ul className="list-disc list-inside mb-4">
            {translation.raids_details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-1">{translation.summary_experience}</h3>
          <p>{translation.summary_experience_details}</p>
        </div>
      </div>
      <Footer language={currentLanguage} />
    </div>
  );
}