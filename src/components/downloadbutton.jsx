'use client';

import React from "react";
import { Button } from "@/components/Material-Components";
import { translations } from '@/lang/translations';
 
export function ButtonColors({ language }) {
  return (
    <div className="flex w-max px-6 py-2 mx-auto gap-4 mt-10">
      <Button color="amber">{translations[language].download_button}</Button>
    </div>
  );
}