import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/helpers/supabaseClient";

export function Wrapper({ children }) {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                router.push('/login');
            }
        };
        checkSession();
    }, [router]);

    return <>{children}</>;
}