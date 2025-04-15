import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '~/server/db/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: useRuntimeConfig().GITHUB_CLIENT_ID as string,
      clientSecret: useRuntimeConfig().GITHUB_CLIENT_SECRET as string,
    },
  },
})
