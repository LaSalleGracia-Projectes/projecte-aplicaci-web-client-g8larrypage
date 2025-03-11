'use client';

import React from "react";
import { Typography } from "@/components/Material-Components";
import { Language } from "./Language";
import { translations } from '@/lang/translations';

export function NavList({ language, changeLanguage }) {
  const translation = translations[language] || translations['en'];

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:ml-14 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="/about-us" className="flex items-start hover:text-purple-500 transition-colors">
          {translation.about_us}
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="/help" className="flex items-center hover:text-purple-500 transition-colors">
          {translation.help}
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="/contact" className="flex items-center hover:text-purple-500 transition-colors">
          {translation.contact}
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a className="flex items-center hover:text-purple-500 transition-colors">
          <Language language={language} changeLanguage={changeLanguage} />
        </a>
      </Typography>
    </ul>
  );
}