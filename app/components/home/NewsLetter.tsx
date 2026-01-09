// components/home/Newsletter.tsx
export default function Newsletter() {
    return (
        <section className="">
            <div className=" bg-linear-to-r from-orange-500 to-orange-600 rounded-xl p-10 md:p-14 flex flex-col items-center justify-between gap-8 text-white">

                {/* Texto */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">
                        Sumate a la comunidad Bookemp
                    </h2>
                    <p className="text-orange-100">
                        Recibí recomendaciones y ofertas exclusivas.
                    </p>
                </div>

                {/* Form */}
                <form className="flex w-full md:w-auto gap-3">
                    <input
                        type="email"
                        placeholder="Ingresá tu email"
                        className="px-4 py-3 rounded text-gray-900 w-full md:w-72"
                    />
                    <button
                        type="submit"
                        className="bg-white text-orange-600 font-semibold px-6 py-3 rounded"
                    >
                        Suscribirme
                    </button>
                </form>
            </div>
        </section>
    );
}
