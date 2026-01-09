import { getBookBySlug } from '@/app/lib/books.service';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import AddToCartButton from '@/app/components/cart/AddToCartButton';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BookDetailPage({ params }: Props) {
    const { slug } = await params;
    const book = await getBookBySlug(slug);

    if (!book) return notFound();

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* 🖼️ GALERÍA / IMAGEN */}
                <div className="flex justify-center">
                    <Image
                        src={book.image}
                        alt={book.title}
                        width={500}
                        height={600}
                        priority
                        className="rounded-md shadow-md"
                    />
                </div>

                {/* 📘 INFO DEL LIBRO */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {book.title}
                    </h1>

                    <p className="text-gray-500 mb-4">
                        {book.author}
                    </p>

                    {/* 💰 PRECIO */}
                    <div className="mb-4">
                        <p className="text-3xl font-extrabold text-black">
                            ${book.price.toLocaleString('es-AR')}
                        </p>

                        <p className="text-sm text-green-600 mt-1">
                            10% OFF pagando con transferencia o depósito
                        </p>

                        <p className="text-sm text-blue-600">
                            3 cuotas sin interés
                        </p>
                    </div>

                    {/* ⭐ RESEÑAS (mock por ahora) */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-yellow-400">★★★★★</span>
                        <span className="text-sm text-gray-600">
                            6 reseñas
                        </span>
                    </div>

                    {/* 🛒 CTA */}
                    <div className="mb-8">
                        <AddToCartButton
                            slug={book.slug}
                            title={book.title}
                            image={book.image}
                            author={book.author}
                            price={book.price}
                        />
                    </div>

                    {/* 📄 DESCRIPCIÓN */}
                    {book.description && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">
                                Descripción
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {book.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}


export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {

    const { slug } = await params; // ✅ OBLIGATORIO en Next 15

    const book = await getBookBySlug(slug);

    if (!book) {
        return {
            title: 'Libro no encontrado | Bookemp',
        };
    }

    return {
        title: `${book.title} | Bookemp`,
        description: book.description ?? `Comprá ${book.title} en Bookemp`,
        openGraph: {
            title: `${book.title} | Bookemp`,
            description: book.description ?? '',
            images: [
                {
                    url: book.image, // URL absoluta
                    width: 1200,
                    height: 630,
                    alt: book.title,
                },
            ],
        },
    };
}