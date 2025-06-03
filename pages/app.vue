<script lang="ts" setup>
import { authClient } from '#imports'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '~/components/ui/breadcrumb'

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
      <SidebarInset>
        <header>
          <div>
            <SidebarTrigger />
            <Separator />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>test</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <ClientOnly>
          <button v-if="session" @click="signOut">
            Sign Out
          </button>
          <div>
            <pre>
              {{ session?.user }}
            </pre>
          </div>
        </ClientOnly>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<style>

</style>
