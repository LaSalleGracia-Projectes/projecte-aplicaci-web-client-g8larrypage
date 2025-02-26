import { Header, Footer } from "@/components/ui";

export default function GamePolicy() {
    return (
        <div>
            <Header />
            <section className="text-center py-10 bg-white-100 mt-40">
            <h2 className="font-[Electrolize] text-4xl font-bold lg:mb-12">Política del Juego Limpio y Seguro</h2>
            <div className="text-lg text-black-600 px-4 lg:px-0 text-left max-w-4xl mx-auto space-y-6">
                <p className="text-xl"><strong>Fecha de entrada en vigor: 26/02/2025</strong></p>
                <h3 className="text-xl font-bold mt-6 mb-6">1. Código de Conducta</h3>
                <p>
                    En <strong>Ciudad de las Leyendas</strong>, promovemos un entorno de juego saludable y justo.
                    Para garantizar una experiencia equitativa, todos los jugadores deben respetar las siguientes reglas:
                </p>
                <ul className="list-disc list-inside">
                    <li>Está prohibido el uso de trampas, hacks, bots o cualquier software que manipule el juego.</li>
                    <li>No se permite explotar errores del sistema (bugs) para obtener ventajas injustas.</li>
                    <li>Se prohíbe cualquier forma de acoso, lenguaje ofensivo o comportamiento tóxico dentro de la comunidad.</li>
                </ul>
        
                <h3 className="text-xl font-bold mt-6 mb-6">2. Integridad en la Competencia</h3>
                <p>
                    Las competencias semanales, raids y enfrentamientos entre clanes deben jugarse de forma justa.
                    Cualquier intento de manipular los resultados con prácticas desleales resultará en sanciones.
                </p>
                <ul className="list-disc list-inside">
                    <li>No está permitido el uso de cuentas secundarias para obtener ventajas.</li>
                    <li>Se penalizará el intercambio ilegal de Pasos de Oro o la compra/venta de cuentas.</li>
                    <li>El fraude en competiciones conllevará la suspensión o eliminación de la cuenta.</li>
                </ul>
        
                <h3 className="text-xl font-bold mt-6 mb-6">3. Reporte de Conductas Inapropiadas</h3>
                <p>
                    Para mantener una comunidad sana, los jugadores pueden reportar comportamientos sospechosos o 
                    incumplimientos de esta política a nuestro equipo de soporte en ciudaddelasleyendas4@gmail.com
                </p>
                <ul className="list-disc list-inside">
                    <li>Las denuncias serán revisadas cuidadosamente antes de tomar medidas.</li>
                    <li>El abuso del sistema de reportes con falsas acusaciones puede llevar a sanciones.</li>
                </ul>
        
                <h3 className="text-xl font-bold mt-6 mb-6">4. Consecuencias del Incumplimiento</h3>
                <p>
                    El incumplimiento de estas normas puede resultar en advertencias, suspensiones temporales o permanentes,
                    dependiendo de la gravedad de la infracción.
                </p>
                <ul className="list-disc list-inside">
                    <li>Uso de hacks o trampas: <span className="text-red-600 font-bold">Baneo permanente</span></li>
                    <li>Acoso o lenguaje ofensivo: <span className="text-red-600 font-bold">Suspensión temporal o permanente</span></li>
                    <li>Explotación de bugs: <span className="text-red-600 font-bold">Advertencia y posible reversión de beneficios obtenidos</span></li>
                </ul>
        
                <h3 className="text-xl font-bold mt-6 mb-6">5. Compromiso de la Comunidad</h3>
                <p>
                    Todos los jugadores de <strong>Ciudad de las Leyendas</strong> deben comprometerse a jugar de manera justa,
                    respetar a otros jugadores y ayudar a construir una comunidad positiva.
                </p>
            </div>
            </section>
            <Footer />
        </div>
    );
}