import { NextResponse } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

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


const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("🔔 WEBHOOK:", body);

        if (body.type === "payment") {
            const paymentId = body.data.id;

            const payment = new Payment(client);
            const result = (await payment.get({
                id: paymentId,
            })) as MercadoPagoPayment;

            if (result.status === "approved") {
                const order = {
                    mp_payment_id: result.id,
                    status: result.status,
                    total: result.transaction_amount,
                    currency: result.currency_id,
                    payer_email: result.payer?.email ?? null,
                    items: result.additional_info?.items ?? [],
                };

                await supabaseAdmin.from("orders").insert(order);
            }


            console.log("💰 PAYMENT INFO:", result);

            if (result.status === "approved") {
                const order = {
                    mp_payment_id: result.id,
                    status: result.status,
                    total: result.transaction_amount,
                    currency: result.currency_id,
                    payer_email: result.payer?.email ?? null,
                    items: result.additional_info?.items ?? [],
                };

                const { error } = await supabaseAdmin
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
        return NextResponse.json({ error: "Webhook error" }, { status: 500 });
    }
}
