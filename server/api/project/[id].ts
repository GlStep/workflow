import { project, task, workspaceMembership } from '~~/db/schema/workspace-schema'
import { auth } from '~~/server/utils/auth'
import { db } from '~~/server/utils/db'
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
      message: 'Project ID is required.',
    })
  }

  const projectData = await db
    .select()
    .from(project)
    .where(eq(project.id, id))
    .limit(1)

  if (projectData.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: 'Project not found.',
    })
  }

  const membership = await db
    .select()
    .from(workspaceMembership)
    .where(and(
      eq(workspaceMembership.workspaceId, projectData[0]!.workspaceId),
      eq(workspaceMembership.userId, session.user.id),
    ))
    .limit(1)

  if (membership.length === 0) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'You do not have access to this project.',
    })
  }

  const tasks = await db.select().from(task).where(eq(task.projectId, id))

  return {
    project: projectData[0],
    tasks,
  }
})
