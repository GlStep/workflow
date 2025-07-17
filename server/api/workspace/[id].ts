import { project, workspace, workspaceMembership } from '~~/db/schema/workspace-schema'
import { auth } from '~~/server/utils/auth'
import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be logged in to access this resource.',
    })
  }

  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Workspace ID is required.',
    })
  }

  const membership = await db
    .select()
    .from(workspaceMembership)
    .where(and(
      eq(workspaceMembership.workspaceId, id),
      eq(workspaceMembership.userId, session.user.id),
    ))
    .limit(1)

  if (membership.length === 0) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'You do not have permission to access this workspace.',
    })
  }

  const workspaceData = await db
    .select()
    .from(workspace)
    .where(eq(workspace.id, id))
    .limit(1)

  if (workspaceData.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: 'Workspace not found.',
    })
  }

  const projects = await db.select().from(project).where(eq(project.workspaceId, id))

  return {
    ...workspaceData[0],
    projects,
  }
})
