"use client";

import { useCartStore } from "@/app/store/cart.store";
import Button from "../ui/Button";

interface Props {
    slug: string;
    title: string;
    image: string;
    author: string;
    price: number;
}

export default function AddToCartButton(props: Props) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={() => addItem(props)}
        >
            Agregar al carrito
        </Button>
    );
}
