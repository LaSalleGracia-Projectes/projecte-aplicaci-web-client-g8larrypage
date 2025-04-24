'use client';

import supabase from '@/helpers/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { NavList } from '@/components/navbar';
import { ProfileMenu } from '@/components/ProfileMenu';
import { CopyRight } from './CopyrightFooter';
import { translations } from '@/lang/translations';

export function Header({ language, changeLanguage, isLoggedIn, onLogout }) {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) return;

      const userId = sessionData.session.user.id;

      const { data: userData, error: userError } = await supabase
        .from("Usuario")
        .select("avatar_url")
        .eq("id", userId)
        .single();

      if (userError) {
        console.error("Error fetching avatar URL:", userError);
        return;
      }

      setAvatarUrl(userData.avatar_url || "");
    };

    fetchAvatarUrl();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black text-white py-3 px-4 md:px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/assets/img/logo-principal.png" alt="Logo Principal" width={80} height={80} />
        </Link>
        <NavList language={language} changeLanguage={changeLanguage} />
      </div>

      <div className="flex gap-2 md:gap-4">
        {/* Botones siempre visibles, pero más pequeños en móvil */}
        <button>
          <Link href="/clan">
            <Image 
              src="/assets/img/clan.png" 
              alt="Clan" 
              width={40} 
              height={40}
              className="w-8 h-8 md:w-10 md:h-10" // Más pequeños en móvil
            />
          </Link>
        </button>
        <button>
          <Link href="/tienda">
            <Image 
              src="/assets/img/tienda.png" 
              alt="Tienda" 
              width={40} 
              height={40}
              className="w-8 h-8 md:w-10 md:h-10" // Más pequeños en móvil
            />
          </Link>
        </button>
        <button>
          <Link href="/ranking">
            <Image
              src="/assets/img/trofeo.png" 
              alt="Ranking" 
              width={40} 
              height={40}
              className="w-8 h-8 md:w-10 md:h-10" // Más pequeños en móvil
            />
          </Link>
        </button>
        {isLoggedIn ? (
          <ProfileMenu avatarUrl={avatarUrl} onLogout={onLogout} language={language}/>
        ) : (
          <button>
            <Link href="/register">
              <Image 
                src="/assets/img/usuario.png" 
                alt="Perfil" 
                width={40} 
                height={40}
                className="w-8 h-8 md:w-10 md:h-10" // Más pequeños en móvil
              />
            </Link>
          </button>
        )}
      </div>
    </header>
  );
}

export function Footer({ language }) {
  const translation = translations[language] || translations['es'];

  return (
    <footer className="bg-black text-white text-center py-6 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 mx-4 md:mx-10 gap-4">
        <div className="flex gap-4">
          <a href="#"><Image src="/assets/img/youtube.png" alt="YouTube" width={35} height={40} /></a>
          <a href="#"><Image src="/assets/img/instagram.png" alt="Instagram" width={30} height={30} /></a>
          <a href="#"><Image src="/assets/img/twitter.png" alt="Twitter" width={30} height={30} /></a>
        </div>
        <a href="#"><Image src="/assets/img/googleplay.png" alt="Google Play" width={120} height={40} /></a>
      </div>
        
      <div className="flex justify-center gap-4 mt-4 text-sm">
        <CopyRight language={language} />
      </div>
      <p className="text-gray-500 mt-4 px-4">&copy; 2025 {translation.copyright_text}</p>
    </footer>
  );
}