'use client';

import React from "react";
import { Typography } from "@/components/material-components"; 
import { translations } from '@/lang/translations';

export function CopyRight({ language }) {
  const translation = translations[language] || translations['en'];

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:ml-14 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="/terms-service" className="flex items-start hover:text-purple-500 transition-colors">
          {translation.conditions_service}
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="/privacy-policy" className="flex items-center hover:text-purple-500 transition-colors">
          {translation.privacy_policy}
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="/game-policy" className="flex items-center hover:text-purple-500 transition-colors">
          {translation.game_policy}
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="/cookies-policy" className="flex items-center hover:text-purple-500 transition-colors">
          {translation.cookies_admin}
        </a>
      </Typography>
    </ul>
  );
}
