import { eq } from 'drizzle-orm'
import { project, workspaceMembership } from '~/db/schema/workspace-schema'
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
    .select({
      project,
    })
    .from(project)
    .innerJoin(workspaceMembership, eq(workspaceMembership.workspaceId, project.workspaceId))
    .where(eq(workspaceMembership.userId, session.user.id))

  return projects.map(({ project }) => project)
})
