import { NextResponse } from "next/server";
import { adminCreateBook } from "@/app/lib/books.admin";

export async function POST(req: Request) {
    const body = await req.json();
    await adminCreateBook(body);
    return NextResponse.json({ ok: true });
}
