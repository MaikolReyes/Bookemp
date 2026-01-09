import Link from "next/link";
import { adminGetBooks } from "@/app/lib/books.admin";

// 🔴 ESTO ES LO QUE FALTABA
export const dynamic = "force-dynamic";

type Book = {
    id: string;
    title: string;
    author: string;
    price: number;
    active: boolean;
};


export default async function AdminPage() {
    const books = await adminGetBooks();

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Libros</h1>
                <Link
                    href="/admin/nuevo"
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                    + Nuevo libro
                </Link>
            </div>

            <table className="w-full bg-white border">
                <thead>
                    <tr className="text-left">
                        <th className="p-3">Título</th>
                        <th>Autor</th>
                        <th>Precio</th>
                        <th>Activo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b: Book) => (
                        <tr key={b.id} className="border-t">
                            <td className="p-3">{b.title}</td>
                            <td>{b.author}</td>
                            <td>${b.price}</td>
                            <td>{b.active ? "✅" : "❌"}</td>
                            <td>
                                <Link
                                    href={`/admin/editar/${b.id}`}
                                    className="text-blue-600"
                                >
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
