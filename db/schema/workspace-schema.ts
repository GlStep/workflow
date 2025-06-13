import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const workspace = pgTable('workspace', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  ownerId: text('owner_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const workspaceMembership = pgTable('workspace_membership', {
  id: uuid('id').defaultRandom().primaryKey(),
  workspaceId: uuid('workspace_id').references(() => workspace.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
  role: text('role').notNull().default('member'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const project = pgTable('project', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  workspaceId: uuid('workspace_id').references(() => workspace.id, { onDelete: 'cascade' }).notNull(),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const task = pgTable('task', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  projectId: uuid('project_id').references(() => project.id, { onDelete: 'cascade' }).notNull(),
  status: text('status').notNull().default('todo'),
  priority: text('priority').notNull().default('medium'),
  assigneeId: text('assignee_id').references(() => user.id),
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
