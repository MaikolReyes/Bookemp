"use client";
// components/layout/Header.tsx

import Link from "next/link";
import { useCartStore } from "../store/cart.store";
import CategoriasDropdown from './CategoriasDropdown';
// import Image from "next/image";

export default function Header() {

    const itemCount = useCartStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <header className="sticky top-0 z-50 bg-white border border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-orange-500">
                    {/* <Image
                        src="/logo.png"
                        alt="Bookemp Logo"
                        width={120}
                        height={40}
                    /> */}
                    <h2>Bookemp</h2>
                </Link>

                {/* Nav */}
                <nav className="hidden md:flex gap-6 text-sm font-secondary items-center">
                    <Link href="/">Inicio</Link>
                    <CategoriasDropdown />
                    <Link href="/ofertas">Ofertas</Link>
                    <Link href="/blog">Blog</Link>
                </nav>

                {/* Actions */}
                {/* Cart */}
                <Link href="/carrito" className="relative">
                    🛒
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}
