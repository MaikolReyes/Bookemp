import { getSupabaseAdmin } from "./supabase.server";


export async function adminGetBooks() {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

export async function adminCreateBook(payload: unknown) {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
        .from("books")
        .insert(payload);

    if (error) throw error;
}

export async function adminUpdateBook(id: string, payload: unknown) {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
        .from("books")
        .update(payload)
        .eq("id", id);

    if (error) throw error;
}

export async function adminDeleteBook(id: string) {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
        .from("books")
        .delete()
        .eq("id", id);

    if (error) throw error;
}
