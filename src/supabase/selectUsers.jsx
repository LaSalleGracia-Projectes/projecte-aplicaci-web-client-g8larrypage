import supabase from "@/helpers/supabaseClient";

export const selectUsers = async() => {
    const { data, error } = await supabase.from('Usuario').select();
    if (error) {
        console.error("ERROR", error);
        return [];
    }
    return data;
}