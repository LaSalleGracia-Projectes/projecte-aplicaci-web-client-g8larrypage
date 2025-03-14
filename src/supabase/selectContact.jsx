import supabase from "@/helpers/supabaseClient";

export const selectContact = async () => {
    const { data, error } = await supabase.from('Contacto').select();
    if (error) {
        console.error("ERROR", error);
        return [];
    }
    return data;
};