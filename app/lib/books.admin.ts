import { supabaseAdmin } from "./supabase.server";

export async function adminGetBooks() {
    const { data, error } = await supabaseAdmin
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

export async function adminCreateBook(payload: any) {
    const { error } = await supabaseAdmin.from("books").insert(payload);
    if (error) throw error;
}

export async function adminUpdateBook(id: string, payload: any) {
    const { error } = await supabaseAdmin
        .from("books")
        .update(payload)
        .eq("id", id);
    if (error) throw error;
}

export async function adminDeleteBook(id: string) {
    const { error } = await supabaseAdmin
        .from("books")
        .delete()
        .eq("id", id);
    if (error) throw error;
}
