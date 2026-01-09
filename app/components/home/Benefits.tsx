import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// components/home/Benefits.tsx
export default function Benefits() {
    const benefits = [
        { icon: faLightbulb, text: "Envíos a todo el país" },
        { icon: faLock, text: "Pago seguro Mercado Pago" },
        { icon: faBox, text: "Libros originales" },
        { icon: faStar, text: "Atención personalizada" },
    ];

    return (
        <section className="bg-white border-t border-b border-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {benefits.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <FontAwesomeIcon icon={item.icon} className="text-3xl" />
                        <p className="text-sm text-gray-700 font-secondary">{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
