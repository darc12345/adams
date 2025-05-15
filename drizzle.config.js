import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URI) {
    throw new Error('DATABASE_URI is not set in environment variables.');
}
export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URI,
    },
});
