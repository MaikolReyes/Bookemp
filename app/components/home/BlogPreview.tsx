// components/home/BlogPreview.tsx
import Link from "next/link";

const posts = [
    {
        title: "10 libros de finanzas personales que tenés que leer",
        slug: "libros-finanzas-personales",
    },
    {
        title: "Cómo crear el hábito de la lectura en 21 días",
        slug: "habito-de-la-lectura",
    },
    {
        title: "Los mejores libros para emprendedores en 2024",
        slug: "libros-emprendedores-2024",
    },
];

export default function BlogPreview() {
    return (
        <section className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6">
                Aprendé antes de comprar
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition"
                    >
                        <div className="h-40 bg-gray-100" />
                        <div className="p-4">
                            <h3 className="font-semibold text-sm">
                                {post.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link
                    href="/blog"
                    className="text-orange-500 font-medium inline-flex items-center gap-2"
                >
                    Ver blog completo →
                </Link>
            </div>
        </section>
    );
}
