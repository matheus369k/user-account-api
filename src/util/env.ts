import z from 'zod';

const envSchema = z.object({
	JWT_SECRET_KEY: z.string(),
	DATABASE_URL: z.string().url(),
	PORT: z.coerce.number().optional().default(3000),
	FRONT_END_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);
