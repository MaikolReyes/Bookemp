import Link from "next/link";
import Image from "next/image";

import AddToCartButton from "../cart/AddToCartButton";

interface Props {
    slug: string;
    title: string;
    author: string;
    price: number;
    image: string;
}

export default function BookCard({
    slug,
    title,
    author,
    price,
    image,
}: Props) {


    return (
        <div className="bg-white border rounded-lg p-4 hover:shadow transition border-gray-300">

            <Link href={`/libro/${slug}`}>
                <div className="relative bg-gray-100 rounded mb-4 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        width={500}
                        height={500}
                        className="w-full object-cover"
                    />
                </div>

                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">{author}</p>

                <p className="mt-2 font-bold text-orange-500">
                    ${price}
                </p>
            </Link>

            <div className="">
                <AddToCartButton
                    slug={slug}
                    title={title}
                    image={image}
                    author={author}
                    price={price}
                />
            </div>
        </div>
    );
}
