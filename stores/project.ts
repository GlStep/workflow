import type { Project } from '~~/stores/types'
import { useWorkspaceStore } from '~~/stores/workspace'
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [] as Project[],
    currentProject: null as Project | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProjects() {
      this.loading = true
      this.error = null

      try {
        const projects = await $fetch<Project[]>('/api/project')
        this.projects = projects
      }
      catch (e: any) {
        this.error = e.message || 'Failed to fetch projects'
        console.error('Error fetching projects:', this.error)
      }
      finally {
        this.loading = false
      }
    },

    async fetchProject(id: string) {
      this.loading = true
      this.error = null

      try {
        const project = await $fetch<Project>(`/api/project/${id}`)
        this.currentProject = project
        return project
      }
      catch (e: any) {
        this.error = e.message || `Failed to fetch project ${id}`
        console.error(`Error fetching project ${id}: `, this.error)
        return null
      }
      finally {
        this.loading = false
      }
    },

    async fetchProjectsByWorkspace(workspaceId: string) {
      this.loading = true
      this.error = null

      try {
        const workspaceStore = useWorkspaceStore()
        const workspace = await workspaceStore.fetchWorkspace(workspaceId)

        if (!workspace) {
          this.error = `Workspace with ID ${workspaceId} not found`
          return false
        }

        this.projects = workspace.projects || []
        return this.projects.length > 0
      }
      catch (e: any) {
        this.error = e.message || `Failed to fetch projects for workspace ${workspaceId}`
        console.error(`Error fetching projects for workspace ${workspaceId}: `, this.error)
        return false
      }
      finally {
        this.loading = false
      }
    },

    setCurrentProject(project: Project) {
      this.currentProject = project
    },

    clearCurrentProject() {
      this.currentProject = null
    },
  },
  getters: {
    getProjectsByWorkspaceId: (state) => {
      return (workspaceId: string) => {
        return state.projects.filter(project => project.workspaceId === workspaceId)
      }
    },
    getProjectById: (state) => {
      return (id: string) => state.projects.find(project => project.id === id)
    },
  },
})
