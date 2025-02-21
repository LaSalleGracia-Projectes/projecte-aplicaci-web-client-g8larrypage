/** @type {import('next').NextConfig} */
import 'dotenv/config';

const nextConfig = { 
    env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
},};

export default nextConfig;
