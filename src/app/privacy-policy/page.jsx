import { Header, Footer } from "@/components/ui";

export default function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <section className="text-center py-10 bg-white-100 mt-40">
        <h2 className="font-[Electrolize] text-4xl font-bold lg:mb-12">
          Política de Privacidad
        </h2>
        <div className="text-lg text-black-600 px-4 lg:px-0 text-left max-w-4xl mx-auto space-y-6">
            <p className="text-xl"><strong>Fecha de entrada en vigor: 26/02/2025</strong></p>
            <h3 className="text-xl font-bold mt-6 mb-6">1. Información Recopilada</h3>
            <p>
                En <strong>Ciudad de las Leyendas</strong>, recopilamos ciertos datos de los usuarios
                con el propósito de mejorar la experiencia del juego. Estos datos incluyen:
            </p>
            <ul className="list-disc list-inside">
                <li>Paso registrados por el teléfono para convertirlos en "Pasos de Oro".</li>
                <li>Compras dentro de la aplicación, como Lucky Boxes o mejoras.</li>
                <li>Datos de actividad en el juego (estadísticas de construcción, competiciones, etc.).</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-6">2. Uso de Datos</h3>
            <p>
                Utilizamos los datos recopilados para:
            </p>
            <ul className="list-disc list-inside">
                <li>Personalizar recompensas y ofrecer una experiencia más inmersiva.</li>
                <li>Realizar análisis estadísticos para mejorar las funcionalidades del juego.</li>
                <li>Garantizar el correcto funcionamiento de la economía del juego.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-6">3. Seguridad</h3>
            <p>
                Implementamos medidas de seguridad para proteger la información personal de nuestros usuarios. 
                Sin embargo, el acceso no autorizado debido a negligencia del usuario no es responsabilidad de <strong>Ciudad de las Leyendas</strong>.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-6">4. Compartición de Datos</h3>
            <p>
                No compartimos datos personales con terceros sin el consentimiento del usuario, excepto cuando sea necesario para cumplir con obligaciones legales.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-6">5. Derechos del Usuario</h3>
            <p>
                Los jugadores pueden solicitar la eliminación de sus datos personales o modificar su información en cualquier momento a través de nuestro soporte en ciudaddelasleyendas4@gmail.com.
            </p>
            </div>
        </section>
        <Footer />
    </div>
  );
}
