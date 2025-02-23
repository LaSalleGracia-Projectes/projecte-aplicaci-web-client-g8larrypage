'use client';

import { useState } from 'react';
import { Header, Footer } from "@/components/ui";
import { translations } from '@/lang/translations';

export default function AboutUs({ language }) {
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header language={currentLanguage} changeLanguage={changeLanguage} />
      <div className="flex-grow overflow-y-auto p-4 mt-40">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">⚔️ Ciudad de las leyendas ⚔️</h2>
          <p className="text-lg mb-16 max-w-2xl mx-auto">
            "Ciudad de las Leyendas" es una aplicación multiplataforma que combina la gamificación de hábitos saludables con la construcción de una ciudad virtual. Cada usuario tiene su propia ciudad, y cada paso que dan en la vida real se convierte en la divisa del juego, llamada "Pasos de Oro". Los usuarios pueden gastar sus Pasos para construir edificios y comprar lucky boxes además de participar en competencias semanales y enfrentar a otros grupos.
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">🌟 Elementos clave y características</h2>
        <div className="text-left max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-1">🏃 Divisas de pasos</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Los pasos registrados por el teléfono del usuario se convierten en "Pasos de Oro", la divisa del juego. Los Pasos se pueden acumular y gastar en el mercado virtual para adquirir edificios, lucky boxes con premios al azar, o mejoras para la ciudad. Los edificios generan ventajas estratégicas que pueden ayudar en competiciones y en el desarrollo de la ciudad.</li>
            <li>Algunos edificios, como los de alta gama, son más caros pero ofrecen beneficios especiales, como un multiplicador de pasos (por ejemplo, 1.5x) durante una hora a la semana. Este multiplicador puede usarse en momentos estratégicos para ganar más divisas.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-1">🛠️ Construcción y Mejoras de Edificios</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Cada edificio tiene un rol específico (como producir recursos o dar bonus a ciertas estadísticas) y dos atributos principales: Vida y Daño. Estos atributos influyen en las competencias semanales entre ciudades.</li>
            <li>Ejemplos de edificios:
              <ul className="list-disc list-inside ml-4">
                <li>Torre de Fuerza: Incrementa el poder de ataque de la ciudad.</li>
                <li>Templo de Resistencia: Aumenta la defensa general.</li>
              </ul>
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-1">🏆 Competencias Semanales de Grupos</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Los jugadores pueden unirse a clanes con sus amigos y participar en competencias semanales, donde los clanes se enfrentan entre sí en "batallas de clanes".</li>
            <li>Cada clan suma el poder de ataque y defensa de los edificios de sus integrantes, y el grupo con el total más alto de puntos de ataque y defensa gana la batalla semanal. Los clanes que estén en el top del ranking reciben grandes recompensas, como lucky boxes exclusivas.</li>
            <li>Estos enfrentamientos fomentan la colaboración y el fortalecimiento estratégico de los edificios, además de mantener a los jugadores activos.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-1">🧩 Desbloqueo de Áreas y construcciones</h3>
          <p className="mb-4">Las villas empiezan todas con un tamaño determinado y limitado el cual se podrá ampliar (ejemplo 5x5) y al cumplir x pasos se irá expandiendo la villa permitiendo construir más edificios, los edificios construidos no se podrán destruir haciendo el el jugador construye los edificios de manera más eficiente y forzandolo a cumplir los objetivos de pasos para poder ampliar la villa (ej Al cumplir un total de 1.000.000 pasos la aldea se amplía a 5x7).</p>
          <h3 className="text-xl font-semibold mb-1">💸 Tienda de Lucky Boxes y Potenciadores</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Los jugadores pueden usar sus Pasos para comprar lucky boxes, que contienen ítems aleatorios como skins, potenciadores o estructuras.</li>
            <li>Solo algunas estructuras épicas se pueden conseguir en lucky boxes que solo obtendrás quedando en el top 3 del ranking de las batallas en clanes.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-1">🥇 Estadísticas y Clasificación Global</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Desde la página web, los usuarios pueden ver sus estadísticas personales y las de otros jugadores, incluyendo logros en hábitos, número total de pasos, rachas de actividad, y rendimiento en las competencias semanales.</li>
            <li>Las clasificaciones globales incluyen categorías como "Mayor Número de Pasos Semanales", "Mejor Ciudad en Defensa" o "Ciudad con Más Edificios Especiales". Esto incentiva la competencia entre usuarios, motivándolos a mejorar sus hábitos y su ciudad.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-1">🏹 Raids</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Una vez cada semana se harán raids donde los usuarios tendrán de completar una ruta ese día y al completarla recibirán una lootbox o alguna recompensa.</li>
            <li>También se harán raids mensuales para los diferentes grupos/clanes donde los miembros tendrán de hacer esas raids donde les darán recompensas dependiendo de cómo queden en el ranking.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-1">📢 Resumen de la experiencia</h3>
          <p>"Ciudad de los Héroes" convierte los hábitos saludables en un juego social donde cada paso cuenta para construir y fortalecer una ciudad virtual. Los jugadores compiten en equipo cada semana, fortaleciendo sus ciudades con edificios, lucky boxes, y estrategias para ganar recompensas. Además, pueden disfrutar del avance en un mapa de aventuras y personalizar su ciudad mientras desarrollan hábitos saludables para todo el mundo.</p>
        </div>
      </div>
      <Footer language={currentLanguage} />
    </div>
  );
}