import { create } from "zustand";

export interface CartItem {
    slug: string;
    title: string;
    author: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (slug: string) => void;
    clearCart: () => void;
    increaseQty: (slug: string) => void;
    decreaseQty: (slug: string) => void;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addItem: (item) =>
        set((state) => {
            const existing = state.items.find(
                (i) => i.slug === item.slug
            );

            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.slug === item.slug
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            }

            return {
                items: [...state.items, { ...item, quantity: 1 }],
            };
        }),

    removeItem: (slug) =>
        set((state) => ({
            items: state.items.filter((i) => i.slug !== slug),
        })),

    increaseQty: (slug) =>
        set((state) => ({
            items: state.items.map((i) =>
                i.slug === slug
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            ),
        })),

    decreaseQty: (slug) =>
        set((state) => ({
            items: state.items
                .map((i) =>
                    i.slug === slug
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                )
                .filter((i) => i.quantity > 0),
        })),

    clearCart: () => set({ items: [] }),

    totalPrice: () =>
        get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ),
}));
