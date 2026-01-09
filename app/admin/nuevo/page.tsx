"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewBookPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        author: "",
        slug: "",
        price: 0,
        category: "",
        image: "",
        active: true,
    });

    async function submit() {
        await fetch("/api/admin/books", {
            method: "POST",
            body: JSON.stringify(form),
        });

        router.push("/admin");
    }

    return (
        <div className="max-w-xl">
            <h1 className="text-xl font-bold mb-4">Nuevo libro</h1>

            <input placeholder="Título" onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Autor" onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <input placeholder="Slug" onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <input placeholder="Precio" type="number" onChange={(e) => setForm({ ...form, price: +e.target.value })} />
            <input placeholder="Categoría" onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input placeholder="URL Imagen" onChange={(e) => setForm({ ...form, image: e.target.value })} />

            <button
                onClick={submit}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
            >
                Guardar
            </button>
        </div>
    );
}
