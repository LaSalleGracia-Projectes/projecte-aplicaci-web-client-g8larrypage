'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Typography } from "@/components/Material-Components";
import { Language } from "./Language";
import { translations } from '@/lang/translations';
import { FaBars, FaTimes } from 'react-icons/fa';

export function NavList({ language, changeLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translation = translations[language] || translations['en'];

  // Cerrar el menú al redimensionar la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar el menú después de hacer clic
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Botón hamburguesa para móviles */}
      <button 
        className="lg:hidden ml-4 text-white focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      
      {/* Menú de navegación - versión desktop */}
      <ul className={`hidden lg:flex lg:flex-row lg:ml-14 lg:mt-0 lg:items-center lg:gap-6`}>
        <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
          <Link href="/" className="flex items-start hover:text-purple-500 transition-colors">
            {translation.home}
          </Link>
        </Typography>
        <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
          <Link href="/about-us" className="flex items-start hover:text-purple-500 transition-colors">
            {translation.about_us}
          </Link>
        </Typography>
        <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
          <Link href="/help" className="flex items-center hover:text-purple-500 transition-colors">
            {translation.help}
          </Link>
        </Typography>
        <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
          <Link href="/contact" className="flex items-center hover:text-purple-500 transition-colors">
            {translation.contact}
          </Link>
        </Typography>
        <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
          <span className="flex items-center hover:text-purple-500 transition-colors">
            <Language language={language} changeLanguage={changeLanguage} />
          </span>
        </Typography>
      </ul>
      
      {/* Menú de navegación - versión móvil */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-95" style={{top: '86px'}}>
          <ul className="flex flex-col items-center pt-6 gap-6">
            <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
              <Link href="/" onClick={handleMenuItemClick} className="flex items-start hover:text-purple-500 transition-colors">
                {translation.home}
              </Link>
            </Typography>
            <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
              <Link href="/about-us" onClick={handleMenuItemClick} className="flex items-start hover:text-purple-500 transition-colors">
                {translation.about_us}
              </Link>
            </Typography>
            <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
              <Link href="/help" onClick={handleMenuItemClick} className="flex items-center hover:text-purple-500 transition-colors">
                {translation.help}
              </Link>
            </Typography>
            <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
              <Link href="/contact" onClick={handleMenuItemClick} className="flex items-center hover:text-purple-500 transition-colors">
                {translation.contact}
              </Link>
            </Typography>
            <Typography as="li" variant="medium" color="white" className="p-1 font-[Electrolize]">
              <span className="flex items-center hover:text-purple-500 transition-colors">
                <Language language={language} changeLanguage={(lang) => {
                  changeLanguage(lang);
                  handleMenuItemClick();
                }} />
              </span>
            </Typography>
          </ul>
        </div>
      )}
    </div>
  );
}