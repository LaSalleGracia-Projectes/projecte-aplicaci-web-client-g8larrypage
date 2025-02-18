import Image from "next/image";
import { Header, Footer } from "../components/ui";
import { ButtonColors } from "@/components/downloadbutton";

export default function Home() {
  return (
    <div>

      <Header/>
      
      {/* Main Image */}
      <section className="w-full h-[60vh] relative">
        <Image src="/assets/img/preview.png" alt="Imagen Principal" layout="fill" objectFit="cover" />
      </section>
      
      {/* Download Section */}
      <section className="text-center py-10 bg-white-100">
        <h2 className="font-[Electrolize] text-2xl font-bold lg:mb-5">DESCÁRGALO YA!</h2>
        <p className="lg:mb-10">Descarga el juego en tu dispositivo y comienza a jugar</p>
        <Image src="/assets/img/anuncio-app.png" alt="Imagen juego" width={400} height={300} className="mx-auto" />
        <ButtonColors />
      </section>
      
      {/* News Section */}
      <section className="py-10">
        <h2 className="text-2xl font-bold text-center mb-12">NOTICIAS</h2>
        <div className="flex justify-center gap-20 flex-wrap">
          <div>
            <Image src="/assets/img/noticia1.png" alt="Imagen1" width={500} height={500} className="rounded-lg" />
            <p className="mt-6 ml-10 text-sm font-bold text-black-700">Última actualización del juego con nuevas funciones y mejoras.</p>
          </div>
          <div>
            <Image src="/assets/img/noticia2.png" alt="Imagen2" width={500} height={500} className="rounded-lg" />
            <p className="mt-6 ml-10 text-sm font-bold text-black-700">Evento especial disponible por tiempo limitado. ¡No te lo pierdas!</p>
          </div>
        </div>
      </section>
      
      <Footer/>
    </div>
  );
}