import { Header, Footer } from "@/components/ui";

export default function TermsService() {
  return (
    <div>
      <Header />
      <section className="text-center py-10 bg-white-100 mt-40">
        <h2 className="font-[Electrolize] text-4xl font-bold lg:mb-12">Términos de Servicio</h2>
        <div className="text-lg text-black-600 px-4 lg:px-0 text-left max-w-4xl mx-auto">
          <p className="text-xl"><strong>Fecha de entrada en vigor: 26/02/2025</strong></p>
          <p>Los presentes Términos de Servicio regulan la relación entre el usuario (“Usuario” o “tú”) y Ciudad de las Leyendas (“Nosotros” o “Nuestro”) con respecto al uso de la aplicación "Ciudad de las Leyendas" (“la Aplicación”), sus sitios web, servicios y contenido relacionado (“el Servicio”). Al acceder y utilizar el Servicio, el Usuario acepta cumplir con estos Términos.</p>
          
          <h3 className="text-xl font-bold mt-6 mb-6">1. Uso del Servicio</h3>
          <p>1.1. Para acceder y utilizar el Servicio, el Usuario debe ser mayor de edad según la legislación de su país o contar con el consentimiento de su tutor legal.</p>
          <p>1.2. La Aplicación convierte los pasos reales del Usuario en "Pasos de Oro", la divisa del juego. Estos pueden usarse para adquirir edificios, lucky boxes y mejoras dentro del juego.</p>
          
          <h3 className="text-xl font-bold mt-6 mb-6">2. Propiedad y Licencia</h3>
          <p>2.1. Todos los derechos sobre la Aplicación, el contenido, los diseños y elementos interactivos son propiedad exclusiva de Ciudad de las Leyendas.</p>
          
          <h3 className="text-xl font-bold mt-6 mb-6">3. Compras y Divisas Virtuales</h3>
          <p>3.1. Los "Pasos de Oro" no tienen valor fuera del juego y no pueden canjearse por dinero real.</p>
          <p>3.2. Ciertas compras dentro del juego pueden requerir dinero real. Todas las compras son finales y no reembolsables, salvo en los casos exigidos por la ley.</p>
          
          <h3 className="text-xl font-bold mt-6 mb-6">4. Conducta del Usuario</h3>
          <p>4.1. El Usuario se compromete a no usar la Aplicación para actividades ilegales o fraudulentas.</p>
          <p>4.2. No está permitido el uso de software de terceros, exploits o trampas para obtener ventajas en el juego.</p>
          
          <h3 className="text-xl font-bold mt-6 mb-6">5. Modificaciones del Servicio</h3>
          <p>5.1. Nos reservamos el derecho de modificar, suspender o descontinuar el Servicio o cualquier parte del mismo en cualquier momento y sin previo aviso.</p>
          
          <h3 className="text-xl font-bold mt-6 mb-6">6. Limitación de Responsabilidad</h3>
          <p>6.1. Ciudad de las Leyendas no se hace responsable por pérdidas o daños derivados del uso o imposibilidad de uso del Servicio.</p>
          
          <h3 className="text-xl font-bold mt-6 mb-6">7. Resolución de Disputas</h3>
          <p>7.1. Cualquier disputa entre el Usuario y Ciudad de las Leyendas se resolverá de manera amistosa. Si no se llega a un acuerdo, la controversia será resuelta por arbitraje en Jurisdicción Aplicable.</p>
          
          <p className="mt-6"><strong>Contacto:</strong> Para cualquier duda o consulta sobre estos términos, puedes contactarnos a través de ciudaddelasleyendas4@gmail.com.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}