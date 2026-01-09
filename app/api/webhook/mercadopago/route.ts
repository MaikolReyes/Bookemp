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

        if (body.type === "payment") {
            const paymentId = body.data.id;

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

                const order = {
                    mp_payment_id: result.id,
                    status: result.status,
                    total: result.transaction_amount,
                    currency: result.currency_id,
                    payer_email: result.payer?.email ?? null,
                    items: result.additional_info?.items ?? [],
                };

                const { error } = await supabase
                    .from("orders")
                    .insert(order);

                if (error) {
                    console.error("❌ DB ERROR:", error);
                } else {
                    console.log("✅ ORDEN GUARDADA");
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
