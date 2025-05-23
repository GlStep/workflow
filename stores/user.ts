import { authClient } from '#imports'

export const useUserStore = defineStore('user', {
  state: () => ({ name: '' }),
  actions: {
    async fetch() {
      const { data: session } = await authClient.getSession()

      this.name = session?.user.name || ''
    },
  },
})
