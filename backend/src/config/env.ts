import dotenv from "dotenv";

dotenv.config({ quiet: true });

const trimEnv = (value?: string) => value?.trim();

export const ENV = {
    PORT : trimEnv(process.env.PORT),
    DATABASE_URL : trimEnv(process.env.DB_URL),
    NODE_ENV : trimEnv(process.env.NODE_ENV),
    FRONTEND_URL : trimEnv(process.env.FRONTEND_URL),
    CLERK_PUBLISHABLE_KEY : trimEnv(process.env.CLERK_PUBLISHABLE_KEY),
    CLERK_SECRET_KEY : trimEnv(process.env.CLERK_SECRET_KEY)

}
