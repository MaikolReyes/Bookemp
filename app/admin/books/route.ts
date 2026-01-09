import { getSupabaseAdmin } from "@/app/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
        .from("books")
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
