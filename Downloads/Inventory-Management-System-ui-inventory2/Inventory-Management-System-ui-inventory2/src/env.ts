import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		POSTGRES_URL: z.string().min(1),
		POSTGRES_USER: z.string().min(1),
		POSTGRES_HOST: z.string().min(1),
		SUPABASE_JWT_SECRET: z.string().min(1),
		POSTGRES_PRISMA_URL: z.string().min(1),
		POSTGRES_PASSWORD: z.string().min(1),
		POSTGRES_DATABASE: z.string().min(1),
		SUPABASE_URL: z.string().min(1),
		SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
		POSTGRES_URL_NON_POOLING: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
		NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	},
});
