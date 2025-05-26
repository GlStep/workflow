<script lang="ts" setup>
import { authClient } from '#imports'

definePageMeta({
  middleware: ['auth'],
})

const user = useUserStore()
await callOnce(user.fetch)

async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        navigateTo('/auth/sign-in')
      },
    },
  })
}

const { data: session } = await authClient.getSession()
</script>

<!-- List of stuff, which needs to be done for the application -->
<!-- TODO: create a sidebar, just a first and simple version (will be more complex later) -->
<!-- TODO: create schema, which fits has user information, such as workspaces,groups, etc. -->
<!-- TODO: extend the sidebar with the added information -->

<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <RouterView />
      </main>
    </SidebarProvider>
    App
    <button v-if="session" @click="signOut">
      Sign Out
    </button>
    <div>
      <ClientOnly>
        <pre>
          {{ session?.user }}
        </pre>
      </ClientOnly>
    </div>
  </div>
</template>

<style>

</style>
