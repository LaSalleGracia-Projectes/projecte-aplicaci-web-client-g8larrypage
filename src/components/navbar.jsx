'use client';

import React from "react";
import {
  Typography,
} from "@material-tailwind/react";

export function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:ml-14 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="#" className="flex items-start hover:text-purple-500 transition-colors">
          Sobre nosotros
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="#" className="flex items-center hover:text-purple-500 transition-colors">
          Ayuda
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="p-1 font-[Electrolize]"
      >
        <a href="#" className="flex items-center hover:text-purple-500 transition-colors">
          Idioma
        </a>
      </Typography>
    </ul>
  );
}