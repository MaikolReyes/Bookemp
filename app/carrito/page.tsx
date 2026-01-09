"use client";

import { useCartStore } from "../store/cart.store";
import Button from "../components/ui/Button";
import Image from "next/image";


export default function CartPage() {
    const { items, removeItem, increaseQty, decreaseQty, totalPrice } =
        useCartStore();

    const handleCheckout = async () => {
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
            });

            const text = await res.text();
            console.log("RAW RESPONSE:", text);

            const data = text ? JSON.parse(text) : null;

            if (!res.ok) {
                alert("Error en checkout");
                return;
            }

            if (!data || !data.init_point) {
                console.error("init_point no existe:", data);
                alert("No se pudo iniciar el pago");
                return;
            }

            window.location.href = data.init_point;

        } catch (error) {
            console.error("Checkout error:", error);
            alert("Error inesperado");
        }
    };


    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Tu carrito está vacío
                </h1>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-2xl font-bold mb-8">Tu carrito</h1>

            <div className="space-y-6">
                {items.map((item) => (
                    <div
                        key={item.slug}
                        className="flex justify-between items-center border-b pb-4"
                    >

                        <Image
                            src={item.image}
                            alt={item.title}
                            width={100}
                            height={150}
                        />
                        <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.author}</p>
                            <p className="font-bold">${item.price}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => decreaseQty(item.slug)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQty(item.slug)}>+</button>
                        </div>

                        <button
                            onClick={() => removeItem(item.slug)}
                            className="text-red-500 text-sm"
                        >
                            Quitar
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
                <p className="text-xl font-bold">
                    Total: ${totalPrice()}
                </p>

                <Button className="cursor-pointer" onClick={handleCheckout}>
                    Continuar con el pago
                </Button>

            </div>
        </div>
    );
}
