'use client';

import React, { useState } from "react";

const languages = [
  { code: "en", label: "English (US)", flag: "/assets/img/flags/reino-unido.png" },
  { code: "es", label: "Español (ES)", flag: "/assets/img/flags/espana.png" },
  { code: "ca", label: "Català (CA)", flag: "/assets/img/flags/cataluna.png" },
];

export function Language() {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[1]); // Español como predeterminado

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const selectLanguage = (lang) => {
    setSelectedLang(lang);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown} 
        className="flex items-center gap-2 text-white hover:text-purple-500 transition-colors"
      >
        <img src={selectedLang.flag} alt={selectedLang.label} className="w-6 h-4 rounded" />
        {selectedLang.label}
      </button>

      {open && (
        <ul className="absolute top-10 left-0 w-40 bg-white text-black shadow-lg rounded-lg p-2">
          {languages.map((lang) => (
            <li 
              key={lang.code} 
              className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => selectLanguage(lang)}
            >
              <img src={lang.flag} alt={lang.label} className="w-6 h-4 rounded" />
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
