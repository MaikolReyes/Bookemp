import { redirect } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // PROTECCIÓN SIMPLE (mejorable luego con auth)
    if (process.env.NODE_ENV === "production") {
        // acá luego metemos auth Supabase
    }

    return (
        <section className="min-h-screen bg-gray-50">
            <header className="bg-white border-b px-6 py-4 font-bold">
                Panel Admin · Bookemp
            </header>
            <main className="p-6">{children}</main>
        </section>
    );
}
