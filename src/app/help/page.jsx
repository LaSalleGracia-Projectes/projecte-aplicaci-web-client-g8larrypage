'use client';

import { useState } from 'react';
import { Header, Footer } from "@/components/ui";
import { Card } from "@/components/material-components";
import { FaKey, FaEnvelope, FaUser, FaShieldAlt, FaShoppingCart, FaQrcode, FaFolderOpen, FaHandPaper } from "react-icons/fa";

export default function HelpPage() {
  const helpOptions = [
    { icon: <FaKey className="text-red-500 text-2xl" />, title: "Contraseña", description: "Descripción sobre la contraseña" },
    { icon: <FaEnvelope className="text-red-500 text-2xl" />, title: "Correo Electrónico", description: "Descripción sobre el correo electrónico" },
    { icon: <FaShieldAlt className="text-red-500 text-2xl" />, title: "Seguridad", description: "Descripción sobre la seguridad" },
    { icon: <FaShoppingCart className="text-red-500 text-2xl" />, title: "Pedidos", description: "Descripción sobre los pedidos" },
    { icon: <FaFolderOpen className="text-red-500 text-2xl" />, title: "Problemas", description: "Descripción sobre problemas" },
    { icon: <FaHandPaper className="text-red-500 text-2xl" />, title: "Historial de Bloqueos", description: "Descripción sobre el historial de bloqueos" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-60 mb-60">
        <h1 className="text-3xl font-bold mb-6">Gestionar Cuenta</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {helpOptions.map((option, index) => (
            <Card key={index} className="p-4 border shadow-lg rounded-lg flex flex-col items-start hover:bg-gray-100 hover:scale-110 transform transition duration-300 cursor-pointer">
              {option.icon}
              <h2 className="text-lg font-semibold mt-2">{option.title}</h2>
              <p className="text-sm text-gray-600">{option.description}</p>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}