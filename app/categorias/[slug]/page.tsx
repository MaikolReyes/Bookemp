import { notFound } from "next/navigation";
// import BookGrid from "@/components/books/BookGrid";
import { getBooksByCategory } from "@/app/lib/books.service";
import BookGrid from "@/app/components/books/BookGrid";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;

    const books = await getBooksByCategory(slug);

    if (!books || books.length === 0) {
        return notFound();
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-8 capitalize">
                {slug.replace("-", " ")}
            </h1>

            <BookGrid books={books} />
        </section>
    );
}

import { Metadata } from "next";

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { slug } = await params;

    return {
        title: `${slug.replace("-", " ")} | Bookemp`,
        description: `Libros de ${slug.replace("-", " ")} en Bookemp`,
    };
}
