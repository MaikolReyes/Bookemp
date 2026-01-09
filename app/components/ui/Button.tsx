// components/ui/Button.tsx
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: Props) {
    const baseStyles =
        "px-6 py-3 rounded font-medium transition disabled:opacity-50";

    const variants = {
        primary: "bg-orange-500 text-white hover:bg-orange-600",
        secondary: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
