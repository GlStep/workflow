import { authClient } from '#imports'

export const useUserStore = defineStore('user', {
  state: () => ({ name: '', email: '', image: '' }),
  actions: {
    async fetch() {
      const { data: session } = await authClient.getSession()

      this.name = session?.user.name || ''
      this.email = session?.user.email || ''
      this.image = session?.user.image || '' // TODO: handle image properly, replace with default image if not available
    },
  },
})
