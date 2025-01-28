import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      select: () => ({
        from: () => ({
          where: () => ({
            limit: () => ({
              offset: () => Promise.resolve([]),
            }),
          }),
          limit: () => ({
            offset: () => Promise.resolve([]),
          }),
        }),
      }),
    };
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
