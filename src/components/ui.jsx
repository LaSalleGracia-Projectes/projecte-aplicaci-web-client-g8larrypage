"use client";

import Image from 'next/image';
import { NavList } from '@/components/navbar';

export function Header() {
  return (
    <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/assets/img/logo-principal.png" alt="Logo Principal" width={100} height={100} />
        <NavList />
      </div>

      <div className="flex gap-6">
        <button><Image src="/assets/img/clan.png" alt="Clan" width={40} height={40} /></button>
        <button><Image src="/assets/img/tienda.png" alt="Tienda" width={40} height={40} /></button>
        <button><Image src="/assets/img/trofeo.png" alt="Ranking" width={40} height={40} /></button>
        <button><Image src="/assets/img/usuario.png" alt="Perfil" width={40} height={40} /></button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-white text-center py-6 mt-10">
      <div className="flex justify-between items-center mb-4 mx-10">
        <div className="flex gap-4">
          <a href="#"><Image src="/assets/img/youtube.png" alt="YouTube" width={30} height={30} /></a>
          <a href="#"><Image src="/assets/img/instagram.png" alt="Instagram" width={30} height={30} /></a>
          <a href="#"><Image src="/assets/img/twitter.png" alt="Twitter" width={30} height={30} /></a>
        </div>
        <a href="#"><Image src="/assets/img/googleplay.png" alt="Google Play" width={120} height={40} /></a>
      </div>
        
      <div className="flex justify-center gap-4 mt-4 text-sm">
        <a href="#">Condiciones de servicio</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Política de juego limpio y seguro</a>
        <a href="#">Administrar cookies</a>
      </div>
      <p className="text-gray-500 mt-4">&copy; 2024 Ciudad de leyendas. Todos los derechos reservados</p>
    </footer>
  );
}