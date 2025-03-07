'use client';

import { Header, Footer } from "@/components/ui";
import { Card } from "@/components/Material-Components";
import { FaKey, FaEnvelope, FaUser, FaShieldAlt, FaShoppingCart, FaQrcode, FaFolderOpen, FaHandPaper } from "react-icons/fa";
import Link from "next/link";
import { translationsHelp } from "@/lang/translations";
import { useEffect, useState } from "react";
import supabase from "@/helpers/supabaseClient";

export default function HelpPage() {

  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const translation = translationsHelp[currentLanguage] || translationsHelp["es"];
  const changeLanguage = (newLanguage) => setCurrentLanguage( newLanguage);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      }
    };
    checkSession();
  }, []);
  
  const helpOptions = [
    { icon: <FaKey className="text-red-500 text-2xl" />, title: translation.password, description: translation.password_description, link: "/help/help-contrasena" },
    { icon: <FaEnvelope className="text-red-500 text-2xl" />, title: translation.email, description: translation.email_description, link: "/help/help-email" },
    { icon: <FaShieldAlt className="text-red-500 text-2xl" />, title: translation.security, description: translation.security_description, link: "/help/help-seguridad" },
    { icon: <FaShoppingCart className="text-red-500 text-2xl" />, title: translation.orders, description: translation.orders_description, link: "/help/help-pedidos" },
    { icon: <FaFolderOpen className="text-red-500 text-2xl" />, title: translation.issues, description: translation.issues_description, link: "/help/help-problemas" },
    { icon: <FaHandPaper className="text-red-500 text-2xl" />, title: translation.block_history, description: translation.block_history_description, link: "/help/help-bloqueos" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header language={currentLanguage} changeLanguage={changeLanguage} isLoggedIn={isLoggedIn} />
      <main className="container mx-auto px-4 py-8 mt-60 mb-60">
        <h1 className="text-3xl font-bold mb-6">{translation.manage_account}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {helpOptions.map((option, index) => (
            <Link key={index} href={option.link || "#"} passHref>
              <Card className="p-4 border shadow-lg rounded-lg flex flex-col items-start hover:bg-gray-100 hover:scale-110 transform transition duration-300 cursor-pointer">
                {option.icon}
                <h2 className="text-lg font-semibold mt-2">{option.title}</h2>
                <p className="text-sm text-gray-600">{option.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer language={currentLanguage}/>
    </div>
  );
}