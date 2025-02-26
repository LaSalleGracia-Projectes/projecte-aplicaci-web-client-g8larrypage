import { Header, Footer } from "@/components/ui";

export default function CookiesPolicy() {
    return (
        <div>
            <Header />
            <section className="text-center py-10 bg-white-100 mt-40">
            <h2 className="font-[Electrolize] text-4xl font-bold lg:mb-12">Política de Cookies</h2>
            <div className="text-lg text-black-600 px-4 lg:px-0 text-left max-w-4xl mx-auto space-y-6">
                <p className="text-xl"><strong>Fecha de entrada en vigor: 26/02/2025</strong></p>
                <h3 className="text-xl font-bold mt-6 mb-6">1. ¿Qué son las Cookies?</h3>
                <p>
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando usas <strong>Ciudad de las Leyendas</strong>. 
                    Estas permiten mejorar la experiencia de usuario, recordar preferencias y optimizar el rendimiento de la aplicación.
                </p>
                <h3 className="text-xl font-bold mt-6 mb-6">2. Tipos de Cookies que Utilizamos</h3>
                <ul className="list-disc list-inside">
                    <li>
                    <strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento del juego, como la autenticación y la seguridad.
                    </li>
                    <li>
                    <strong>Cookies de Rendimiento:</strong> Nos ayudan a entender cómo los usuarios interactúan con la app, mejorando su funcionamiento.
                    </li>
                    <li>
                    <strong>Cookies de Personalización:</strong> Guardan preferencias del usuario para ofrecer una experiencia adaptada.
                    </li>
                    <li>
                    <strong>Cookies de Publicidad:</strong> Pueden utilizarse para mostrar anuncios relevantes dentro de la plataforma.
                    </li>
                </ul>
                <h3 className="text-xl font-bold mt-6 mb-6">3. Gestión de Cookies</h3>
                <p>
                    Puedes aceptar, rechazar o eliminar cookies desde la configuración de tu navegador. 
                    Sin embargo, desactivar algunas cookies puede afectar el funcionamiento de ciertas características del juego.
                </p>
                <h3 className="text-xl font-bold mt-6 mb-6">4. Cookies de Terceros</h3>
                <p>
                    Algunas cookies pueden ser proporcionadas por servicios externos, como análisis de datos o publicidad.
                    No controlamos el uso que estos terceros hacen de las cookies, por lo que te recomendamos revisar sus políticas de privacidad.
                </p>
                <h3 className="text-xl font-bold mt-6 mb-6">5. Cambios en la Política de Cookies</h3>
                <p>
                    Podemos actualizar esta política en cualquier momento. Te notificaremos sobre cambios importantes dentro de la aplicación o en nuestra web.
                </p>
                <h3 className="text-xl font-bold mt-6 mb-6">6. Contacto</h3>
                <p>Para cualquier duda sobre nuestra política de cookies, puedes contactarnos en ciudaddelasleyendas4@gmail.com</p>
                </div>
            </section>
            <Footer />
        </div>
    );
};