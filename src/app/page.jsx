import Image from "next/image";
import { Header, Footer } from "../components/ui";

export default function Home() {
  return (
    <div>

      <Header/>
      
      {/* Main Image */}
      <section className="w-full h-[60vh] relative">
        <Image src="/assets/img/preview.png" alt="Imagen Principal" layout="fill" objectFit="cover" />
      </section>
      
      {/* Download Section */}
      <section className="text-center py-10 bg-gray-100">
        <h2 className="text-2xl font-bold">DESCÁRGALO YA!</h2>
        <p>Descarga el juego en tu dispositivo y comienza a jugar</p>
        <Image src="/assets/img/anuncio-app.png" alt="Imagen juego" width={300} height={200} className="mx-auto" />
        <div className="mt-4">
          <button className="bg-yellow-400 px-6 py-2 text-lg font-bold rounded">Descargar</button>
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-10">
        <h2 className="text-2xl font-bold text-center">Noticias</h2>
        <div className="flex justify-center gap-4 flex-wrap mt-4">
          <Image src="/assets/img/noticia1.png" alt="Imagen1" width={300} height={200} className="rounded-lg" />
          <Image src="/assets/img/noticia2.png" alt="Imagen2" width={300} height={200} className="rounded-lg" />
        </div>
      </section>
      
      <Footer/>
    </div>
  );
}