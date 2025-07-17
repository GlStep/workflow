import { workspace, workspaceMembership } from '~~/db/schema/workspace-schema'
import { auth } from '~~/server/utils/auth'
import { db } from '~~/server/utils/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be logged in to access this resource.',
    })
  }

  const memberships = await db
    .select({
      workspace,
      membership: workspaceMembership,
    })
    .from(workspaceMembership)
    .innerJoin(workspace, eq(workspace.id, workspaceMembership.workspaceId))
    .where(eq(workspaceMembership.userId, session.user.id))

  return memberships.map(({ workspace }) => workspace)
})
