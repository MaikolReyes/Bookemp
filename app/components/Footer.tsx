// components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">

                {/* Marca */}
                <div>
                    <h3 className="text-xl font-bold text-orange-500 mb-3">
                        Bookemp
                    </h3>
                    <p className="text-sm text-gray-600">
                        Libros de desarrollo personal, finanzas y mentalidad para crecer todos los días.
                    </p>
                </div>

                {/* Categorías */}
                <div>
                    <h4 className="font-semibold mb-3">Categorías</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                            <Link href="/categorias/desarrollo-personal">
                                Desarrollo personal
                            </Link>
                        </li>
                        <li>
                            <Link href="/categorias/finanzas">Finanzas</Link>
                        </li>
                        <li>
                            <Link href="/categorias/emprendimiento">Emprendimiento</Link>
                        </li>
                        <li>
                            <Link href="/categorias/habitos">Hábitos</Link>
                        </li>
                    </ul>
                </div>

                {/* Ayuda */}
                <div>
                    <h4 className="font-semibold mb-3">Ayuda</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                            <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
                        </li>
                        <li>
                            <Link href="/contacto">Contacto</Link>
                        </li>
                        <li>
                            <Link href="/envios">Envíos</Link>
                        </li>
                        <li>
                            <Link href="/medios-de-pago">Medios de pago</Link>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="font-semibold mb-3">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                            <Link href="/terminos-y-condiciones">
                                Términos y condiciones
                            </Link>
                        </li>
                        <li>
                            <Link href="/politica-de-privacidad">
                                Política de privacidad
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <span>© {new Date().getFullYear()} Bookemp. Todos los derechos reservados.</span>

                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>🚚 Envíos a todo el país</span>
                        <span>🔐 Pago seguro</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
