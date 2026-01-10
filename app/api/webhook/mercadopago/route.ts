import { NextResponse } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { getSupabaseAdmin } from "@/app/lib/supabaseAdmin";

interface MercadoPagoPayment {
    id: number;
    status: "approved" | "rejected" | "pending";
    transaction_amount: number;
    currency_id: string;
    payer?: {
        email?: string;
    };
    additional_info?: {
        items?: unknown[];
    };
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("🔔 WEBHOOK:", body);

        // ✅ IGNORAR TODO LO QUE NO SEA PAYMENT
        if (body.topic !== "payment") {
            return NextResponse.json({ ok: true });
        }

        const paymentId = body.resource;

        const client = new MercadoPagoConfig({
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
        });

        const payment = new Payment(client);

        const result = (await payment.get({
            id: paymentId,
        })) as MercadoPagoPayment;

        console.log("💰 PAYMENT INFO:", result);

        if (result.status === "approved") {
            const supabase = getSupabaseAdmin();

            // 1️⃣ GUARDAR ORDEN
            const order = {
                mp_payment_id: result.id,
                status: result.status,
                total: result.transaction_amount,
                currency: result.currency_id,
                payer_email: result.payer?.email ?? null,
                items: result.additional_info?.items ?? [],
            };

            const { error: orderError } = await supabase
                .from("orders")
                .insert(order);

            if (orderError) {
                console.error("❌ ERROR GUARDANDO ORDEN:", orderError);
            } else {
                console.log("✅ ORDEN GUARDADA");
            }

            // 2️⃣ DESCONTAR STOCK
            const items = result.additional_info?.items ?? [];

            for (const item of items) {
                const { id, quantity } = item as {
                    id: string;      // slug del libro
                    quantity: number;
                };

                const { error: stockError } = await supabase.rpc(
                    "decrement_stock",
                    {
                        book_slug: id,
                        qty: quantity,
                    }
                );

                if (stockError) {
                    console.error(
                        `❌ ERROR DESCONTANDO STOCK (${id})`,
                        stockError
                    );
                } else {
                    console.log(
                        `📦 STOCK DESCONTADO → ${id} (-${quantity})`
                    );
                }
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("❌ WEBHOOK ERROR:", error);
        return NextResponse.json(
            { error: "Webhook error" },
            { status: 500 }
        );
    }
}
