"use client";

import { useEffect } from "react";
import { useCartStore } from "@/app/store/cart.store";
import Link from "next/link";

export default function CompraExitosaPage() {
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="max-w-3xl mx-auto py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">¡Compra realizada! 🎉</h1>
            <p className="text-gray-600 mb-6">
                Gracias por tu compra. Te enviamos un correo con el comprobante.
            </p>

            <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
