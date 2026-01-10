import { getBestSellers } from "@/app/lib/books.service";
import BestSellersCarousel from "./BestSellersCarousel";


export default async function FeaturedBooks() {
    const books = await getBestSellers();

    if (books.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-6">
                🔥 Más vendidos
            </h2>

            <BestSellersCarousel books={books} />
        </section>
    );
}
