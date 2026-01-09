// components/home/Categories.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faChartLine, faLightbulb, faSackDollar } from "@fortawesome/free-solid-svg-icons";

const categories = [
    {
        title: "Desarrollo Personal",
        description: "Desarrollá hábitos y mentalidad para crecer",
        icon: faLightbulb,
        slug: "desarrollo-personal",
    },
    {
        title: "Finanzas",
        description: "Libros para mejorar tu relación con el dinero",
        icon: faSackDollar,
        slug: "finanzas",
    },
    {
        title: "Emprendimiento",
        description: "Ideas, negocios y mentalidad emprendedora",
        icon: faChartLine,
        slug: "emprendimiento",
    },
    {
        title: "Hábitos",
        description: "Rutinas, enfoque y productividad diaria",
        icon: faBook,
        slug: "habitos",
    },
];

export default function Categories() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Título */}
                <h2 className="text-2xl font-bold text-center mb-10">
                    Descubrí tus próximos libros favoritos
                </h2>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 font-secondary">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/categorias/${category.slug}`}
                            className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
                        >
                            <FontAwesomeIcon icon={category.icon} className="text-5xl p-5 text-orange-400" />

                            <h3 className="font-semibold mb-2">{category.title}</h3>
                            <p className="text-sm text-gray-600">
                                {category.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
