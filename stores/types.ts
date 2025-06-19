export interface Workspace {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  projects?: Project[]
}

export interface Project {
  id: string
  name: string
  description?: string
  workspaceId: string
  createdAt: string
  updatedAt: string
  tasks?: Task[]
}

export interface Task {
  id: string
  name: string
  description?: string
  status: string
  projectId: string
  assigneeId?: string
  createdAt: string
  updatedAt: string
}
