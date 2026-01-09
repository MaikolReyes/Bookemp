import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { CartItem } from "../../store/cart.store";

export async function POST(req: Request) {
    try {
        const token = process.env.MERCADOPAGO_ACCESS_TOKEN;

        if (!token) {
            throw new Error("MERCADOPAGO_ACCESS_TOKEN no definido");
        }

        const body: { items: CartItem[] } = await req.json();

        const client = new MercadoPagoConfig({ accessToken: token });
        const preference = new Preference(client);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await preference.create({
            body: {
                items: body.items.map((item) => ({
                    id: item.slug,
                    title: item.title,
                    quantity: Number(item.quantity),
                    unit_price: Number(item.price),
                    currency_id: "ARS",
                })),
                back_urls: {
                    success: "http://localhost:3000/pago-exitoso",
                    failure: "http://localhost:3000/pago-fallido",
                    pending: "http://localhost:3000/pago-pendiente",
                },
                notification_url: "http://localhost:3000/api/webhook/mercadopago", // ⭐
            },
        });


        // ✅ COMPATIBLE CON TODAS LAS VERSIONES
        const initPoint =
            result.init_point ??
            result.body?.init_point ??
            result.response?.init_point;

        if (!initPoint) {
            throw new Error("init_point no encontrado en respuesta de Mercado Pago");
        }

        return NextResponse.json({ init_point: initPoint });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("CHECKOUT ERROR REAL:", error);

        return NextResponse.json(
            { error: error.message ?? "Error interno checkout" },
            { status: 500 }
        );
    }
}
