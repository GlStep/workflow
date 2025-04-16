import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema',
  out: './drizzle',
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL!.toString(),
  },
})
