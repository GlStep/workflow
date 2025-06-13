import { and, eq } from 'drizzle-orm'
import { project, workspace, workspaceMembership } from '~/db/schema/workspace-schema'
import { auth } from '~/server/utils/auth'
import { db } from '~/server/utils/db'

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

  // Need to use innerJoin to select projects that belong to the workspace
  const projects = await db
    .select()
    .from(project)
    .where(and(eq(project.workspaceId, workspace.id), eq(workspaceMembership.userId, session.user.id)))
})
