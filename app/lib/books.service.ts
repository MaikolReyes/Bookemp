import { supabase } from "./supabase";


export async function getBooks() {
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
    const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('slug', slug)
        .eq('active', true)
        .maybeSingle(); // 👈 CLAVE

    if (error) {
        console.error('Error fetching book:', error.message);
        return null;
    }

    return data;
}


export async function getBooksByCategory(category: string) {
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