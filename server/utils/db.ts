import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: useRuntimeConfig().databaseUrl as string,
})

export const db = drizzle({ client: pool })
