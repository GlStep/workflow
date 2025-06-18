import { defineStore } from 'pinia'

export interface Workspace {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    workspaces: [] as Workspace[],
    currentWorkspace: null as Workspace | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchWorkspaces() {
      this.loading = true
      this.error = null

      try {
        const workspaces = await $fetch<Workspace[]>('/api/workspace')
        this.workspaces = workspaces
      }
      catch (e: any) {
        this.error = e.message || 'Failed to fetch workspaces'
        console.error('Error fetching workspaces:', this.error)
      }
      finally {
        this.loading = false
      }
    },

    async fetchWorkspace(id: string) {
      this.loading = true
      this.error = null

      try {
        const workspace = await $fetch<Workspace>(`/api/workspace/${id}`)
        this.currentWorkspace = workspace
        return workspace
      }
      catch (e: any) {
        this.error = e.message || `Failed to fetch workspace ${id}`
        console.error(`Error fetching workspace ${id}: `, this.error)
        return null
      }
      finally {
        this.loading = false
      }
    },

    setCurrentWorkspace(workspace: Workspace) {
      this.currentWorkspace = workspace
    },

    clearCurrentWorkspace() {
      this.currentWorkspace = null
    },
  },
  getters: {
    getWorkspaceById: (state) => {
      return (id: string) => state.workspaces.find(workspace => workspace.id === id)
    },
  },
})
