import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { account, session, user, verification } from '~/db/schema/auth-schema'
import { db } from '~/server/utils/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: useRuntimeConfig().githubClientId as string,
      clientSecret: useRuntimeConfig().githubClientSecret as string,
    },
  },
})
