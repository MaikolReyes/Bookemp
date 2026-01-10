"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import BookCard from "../books/BookCard";
import { Book } from "@/types/book";

interface Props {
    books: Book[];
}

export default function BestSellersCarousel({ books }: Props) {
    if (books.length === 0) return null;

    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 4000 }}
            navigation
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
            }}
        >
            {books.map((book) => (
                <SwiperSlide key={book.id}>
                    <BookCard
                        slug={book.slug}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                        image={book.image}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
