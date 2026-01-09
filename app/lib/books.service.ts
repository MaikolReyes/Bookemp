import { getSupabase } from "./supabase";


export async function getBooks() {
    const supabase = getSupabase();

    const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching books:", error);
        return [];
    }

    return data;
}

export async function getBookBySlug(slug: string) {
    const supabase = getSupabase();

    const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("slug", slug)
        .eq("active", true)
        .maybeSingle();

    if (error) {
        console.error("Error fetching book:", error.message);
        return null;
    }

    return data;
}

export async function getBooksByCategory(category: string) {
    const supabase = getSupabase();

    const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("active", true)
        .eq("category", category)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching category books:", error);
        return [];
    }

    return data;
}
