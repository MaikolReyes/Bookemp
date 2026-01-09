'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function CategoriasDropdown() {
    const [openMobile, setOpenMobile] = useState(false);

    return (
        <div
            className="relative group"
            onMouseEnter={() => setOpenMobile(false)} // evita conflicto hover/mobile
        >
            {/* Botón */}
            <button
                onClick={() => setOpenMobile(!openMobile)}
                className="flex items-center gap-2 hover:opacity-80 transition-all duration-200"
            >
                Categorías
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-xs transition-transform duration-200 group-hover:rotate-180"
                />
            </button>

            {/* Dropdown */}
            <div
                className={`
          absolute top-full left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg overflow-hidden z-50
          transition-all duration-200
          opacity-0 invisible translate-y-2
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
          md:block
          ${openMobile ? 'opacity-100 visible translate-y-0' : ''}
        `}
            >
                <Link
                    href="/categorias/desarrollo-personal"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setOpenMobile(false)}
                >
                    Desarrollo personal
                </Link>

                <Link
                    href="/categorias/finanzas"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setOpenMobile(false)}
                >
                    Finanzas
                </Link>

                <Link
                    href="/categorias/emprendimiento"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setOpenMobile(false)}
                >
                    Emprendimiento
                </Link>

                <Link
                    href="/categorias/habitos"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setOpenMobile(false)}
                >
                    Hábitos
                </Link>
            </div>
        </div>
    );
}
