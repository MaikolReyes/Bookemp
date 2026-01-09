// components/home/Hero.tsx
import Link from "next/link";


export default function Hero() {


    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
                <div className="font-secondary">
                    <h1 className="text-4xl font-bold mb-4 text-gray-600">
                        Libros que transforman tu forma de pensar
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Desarrollo personal, finanzas y mentalidad para crecer todos los días.
                    </p>

                    <div className="flex gap-4 font-secondary">
                        <Link
                            href="/categorias"
                            className="bg-orange-500 text-white px-6 py-3 rounded"
                        >
                            Explorar libros
                        </Link>
                        <Link
                            href="/ofertas"
                            className="border px-6 py-3 rounded border-gray-300"
                        >
                            Ver ofertas
                        </Link>
                    </div>
                </div>

                {/* Imagen placeholder */}
                <div className="h-64 bg-gray-100 rounded-lg" />
            </div>
        </section>
    );
}
