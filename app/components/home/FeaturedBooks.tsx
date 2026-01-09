// components/home/FeaturedBooks.tsx
import { getBooks } from "@/app/lib/books.service";
import BookGrid from "../books/BookGrid";

export const dynamic = "force-dynamic";

export default async function FeaturedBooks() {
    
    const books = await getBooks();

    console.log("Fetched books:", books);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-6">Más vendidos</h2>

            <BookGrid books={books} />
        </section>
    );
}
