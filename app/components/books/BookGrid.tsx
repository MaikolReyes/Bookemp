// components/books/BookGrid.tsx
import BookCard from "./BookCard";

interface Book {
    slug: string;
    title: string;
    author: string;
    price: number;
    image: string;
}

interface Props {
    books: Book[];
}

export default function BookGrid({ books }: Props) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
                <BookCard key={book.slug} {...book} />
            ))}
        </div>
    );
}
